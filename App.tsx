import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Instagram, 
  Youtube, 
  ChevronLeft,
  ChevronRight, 
  ChevronDown,
  ShieldCheck, 
  Users, 
  Lock, 
  Award,
  X,
  Globe,
  Settings,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  Search,
  Layout,
  Type
} from 'lucide-react';

// --- Types & Initial Data ---

interface PortfolioCase {
  title: string;
  location: string;
  desc: string;
  img: string;
  year: string;
  images: string[];
  imageDetails: string[];
}

interface CreditItem {
  year: string;
  items: string[];
}

interface SiteData {
  seo: {
    title: string;
    description: string;
  };
  contact: {
    mainPhone: string;
    emergencyPhone: string;
    email: string;
    address: string;
    office: string;
    businessReg: string;
    owner: string;
  };
  cases: PortfolioCase[];
  credits: CreditItem[];
}

const INITIAL_DATA: SiteData = {
  seo: {
    title: "Ace Guard | 대한민국 1% 프리미엄 보안",
    description: "대한민국 1%를 위한 프리미엄 보안의 기준. 수년간의 현장 경험과 체계적인 교육 시스템을 통해 최상의 의전 서비스를 약속드립니다."
  },
  contact: {
    mainPhone: "02-3018-9400",
    emergencyPhone: "010-2276-0258",
    email: "ssaura98@naver.com",
    address: "경기도 양평군 서종면 도장리 45-2",
    office: "서울특별시 용산구 효창원로 155",
    businessReg: "884-81-00576",
    owner: "이현석"
  },
  cases: [
    { 
      title: "01. 국제 정상회의 (APEC)", 
      location: "제주 / APEC",
      desc: "본행사, SOM1, SOM2, SOM3", 
      img: "https://i.ifh.cc/o7J6Qd.jpg",
      year: "국가급 '보안'의 정수와 글로벌 프로토콜",
      images: [
        "https://i.ifh.cc/o7J6Qd.jpg",
        "https://i.ifh.cc/ZYRFfT.jpg",
        "https://i.ifh.cc/238LvD.jpg",
        "https://i.ifh.cc/B4KT9V.jpg"
      ],
      imageDetails: ["본행사", "SOM1", "SOM2", "SOM3"]
    },
    { 
      title: "02. 지역 축제 및 문화 페스티벌", 
      location: "노원 / 안산 / 광명 / 전주 / 괴산 / 국악 / 과천",
      desc: "노원탈축제 / 안산거리축제 / 광명페스티벌 / 전주가맥축제 / 괴산축제 / 국악 축제 / 과천축제", 
      img: "https://i.ifh.cc/k05okF.jpg",
      year: "대규모 인파 관리와 공공 안전 시스템",
      images: [
        "https://i.ifh.cc/k05okF.jpg",
        "https://i.ifh.cc/x2PzJd.jpg",
        "https://i.ifh.cc/LRyCPB.jpg",
        "https://i.ifh.cc/6n1xxW.jpg",
        "https://i.ifh.cc/xv3b9F.jpg",
        "https://i.ifh.cc/ZomYzl.jpg",
        "https://i.ifh.cc/Zy95Cb.jpg"
      ],
      imageDetails: ["노원탈축제", "안산거리축제", "광명페스티벌", "전주가맥축제", "괴산축제", "국악 축제", "과천축제"]
    },
    { 
      title: "03. 콘서트 & 월드투어", 
      location: "SEOUL / WORLD TOUR",
      desc: "에일리 / 팬텀싱어 / 부활 / 불타는 트롯맨", 
      img: "https://i.ifh.cc/YRS8vd.jpg",
      year: "역동적인 현장감과 아티스트 밀착 신변보호",
      images: [
        "https://i.ifh.cc/YRS8vd.jpg",
        "https://i.ifh.cc/GBANQ3.jpg",
        "https://i.ifh.cc/SCjkZO.jpg",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070"
      ],
      imageDetails: ["에일리", "팬텀싱어", "부활", "불타는 트롯맨"]
    },
    { 
      title: "04. 스포츠 & 팬미팅 & 행사경호", 
      location: "SPORTS / EVENT / EXCLUSIVE",
      desc: "수원스타필드오프닝 / 신한동해오픈 골프대회 / 전국노래자랑 / 송가인 팬미팅 / LPGA 선수권대회 / 인천포럼 / 평창올림픽 / 스포츠행사경호 / 새마을금고 열린음악회", 
      img: "https://i.ifh.cc/Whlht7.jpg",
      year: "VIP 의전과 스포츠 특화 경호 로직 노출",
      images: [
        "https://i.ifh.cc/Whlht7.jpg",
        "https://i.ifh.cc/soT5cC.jpg",
        "https://i.ifh.cc/W8TAf9.jpg",
        "https://i.ifh.cc/GB18QW.jpg",
        "https://i.ifh.cc/R8G6Cr.jpg",
        "https://i.ifh.cc/G88KlB.jpg",
        "https://i.ifh.cc/9QtxF9.jpg",
        "https://i.ifh.cc/lHTTmk.jpg",
        "https://i.ifh.cc/yaVd1H.jpg"
      ],
      imageDetails: [
        "수원스타필드오프닝",
        "신한동해오픈 골프대회", 
        "전국노래자랑", 
        "송가인 팬미팅", 
        "LPGA 선수권대회", 
        "인천포럼", 
        "평창올림픽", 
        "스포츠행사경호", 
        "새마을금고 열린음악회"
      ]
    },
    { 
      title: "05. 기업 V.I.P 프로토콜", 
      location: "KICCOF / Hanjin Kal / LG / MBN",
      desc: "KICCOF 행사 / 한진칼 주주총회 / LG 주주총회 / 전시장 및 박람회 / MBN Y 포럼 / 와인페스타 / 주주총회", 
      img: "https://i.ifh.cc/naq5nM.jpg",
      year: "기업의 품격과 기밀 유지를 위한 철저한 보안",
      images: [
        "https://i.ifh.cc/naq5nM.jpg",
        "https://i.ifh.cc/wHZw2R.jpg",
        "https://i.ifh.cc/A7P7yL.jpg",
        "https://i.ifh.cc/twHVjF.jpg",
        "https://i.ifh.cc/AL61Gy.png",
        "https://i.ifh.cc/Os4kQk.jpg",
        "https://i.ifh.cc/DdZgpQ.jpg"
      ],
      imageDetails: [
        "KICCOF 행사",
        "한진칼 주주총회",
        "LG 주주총회",
        "전시장 및 박람회",
        "MBN Y 포럼",
        "와인페스타",
        "주주총회"
      ]
    },
    { 
      title: "06. 프라이빗 신변보호", 
      location: "PRIVATE / 1:1",
      desc: "1:1 전담 신변보호 서비스 / 시설보안 / 법정동행", 
      img: "https://i.ifh.cc/8m0dBb.jpg",
      year: "개인의 일상을 지키는 '용의 시선'과 고요한 수호",
      images: [
        "https://i.ifh.cc/8m0dBb.jpg",
        "https://i.ifh.cc/S5MpBt.jpg",
        "https://i.ifh.cc/5Nf2lq.jpg"
      ],
      imageDetails: ["1:1 전담 신변보호 서비스", "시설보안", "법정동행"]
    }
  ],
  credits: [
    { year: "2025", items: ["경주 APEC 보안 총괄", "혼다 코리아 신차 런칭쇼", "가수 송가인 전국투어 팬미팅", "LG전자 정기주주총회", "한진칼 정기주주총회"] },
    { year: "2024", items: ["한국영화평론가협회상 시상식", "프라다 111주년 기념 익스클루시브 파티", "파리올림픽 양궁팀 금메달 축하 만찬", "아이폰16 국내 런칭 프라이빗 파티", "샤넬 뷰티 팝업스토어 보안"] },
    { year: "2023", items: ["로보월드(ROBOWORLD) 전시 보안", "팬텀싱어4 전국투어 콘서트", "걸그룹 에스파(aespa) 공항 의전 경호", "배우 이도현 CF 촬영 현장 통제", "삼성 갤럭시 언팩 서울 세이프티"] },
    { year: "2022", items: ["BTS 잠실 주경기장 콘서트 VIP 안전팀장", "넷플릭스 오리지널 드라마 촬영 보안", "스와치그룹 하이엔드 시큐리티 전시", "지스타(G-STAR) 메인 부스 안전 관리"] },
    { year: "2018", items: ["평창 동계올림픽 전 구역 보안 총괄", "평창 올림픽 프레스센터 안전 질서 유지", "국제올림픽위원회(IOC) 위원 의전"] }
  ]
};

// --- Admin Dashboard Component ---

const AdminDashboard = ({ data, onSave, onClose }: { data: SiteData, onSave: (newData: SiteData) => void, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'credits' | 'settings' | 'seo'>('portfolio');
  const [localData, setLocalData] = useState<SiteData>(data);

  const handleSave = () => {
    onSave(localData);
    alert('설정이 저장되었습니다.');
  };

  const updateCase = (idx: number, field: keyof PortfolioCase, value: any) => {
    const nextCases = [...localData.cases];
    nextCases[idx] = { ...nextCases[idx], [field]: value };
    setLocalData({ ...localData, cases: nextCases });
  };

  const addCase = () => {
    const newCase: PortfolioCase = {
      title: "신규 프로젝트",
      location: "장소 정보",
      desc: "설명 텍스트",
      img: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2112",
      year: "요약 문구",
      images: ["https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2112"],
      imageDetails: ["상세 설명"]
    };
    setLocalData({ ...localData, cases: [...localData.cases, newCase] });
  };

  const deleteCase = (idx: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const nextCases = localData.cases.filter((_, i) => i !== idx);
      setLocalData({ ...localData, cases: nextCases });
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-[#020617] flex flex-col font-sans">
      {/* Admin Header */}
      <header className="bg-black border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black">
            <Settings size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">ACE GUARD <span className="text-[#D4AF37] font-light">ADMIN PANEL</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#D4AF37] text-black px-5 py-2 rounded-md font-bold hover:brightness-110 transition-all text-sm"
          >
            <Save size={18} /> 저장하기
          </button>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X size={28} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-black border-r border-white/10 flex flex-col p-4 gap-2">
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'portfolio' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <Layout size={20} /> 실적 관리
          </button>
          <button 
            onClick={() => setActiveTab('credits')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'credits' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <ExternalLink size={20} /> 히스토리 관리
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <Type size={20} /> 기본 정보 관리
          </button>
          <button 
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'seo' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <Search size={20} /> 검색엔진(SEO)
          </button>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0a0f1d] p-8">
          {activeTab === 'portfolio' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">수행 실적 관리</h2>
                  <p className="text-white/40 text-sm">랜딩페이지의 '주요 수행 실적' 섹션에 노출되는 데이터를 편집합니다.</p>
                </div>
                <button 
                  onClick={addCase}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded flex items-center gap-2 border border-white/5 transition-all"
                >
                  <Plus size={18} /> 실적 추가
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {localData.cases.map((c, i) => (
                  <div key={i} className="bg-black/40 border border-white/10 rounded-xl overflow-hidden p-6 relative group">
                    <button 
                      onClick={() => deleteCase(i)}
                      className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-1">
                        <div className="aspect-square bg-neutral-900 rounded-lg overflow-hidden border border-white/10 relative">
                          <img src={c.img} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <ImageIcon size={24} className="text-white" />
                          </div>
                        </div>
                        <input 
                          type="text" 
                          value={c.img} 
                          onChange={(e) => updateCase(i, 'img', e.target.value)}
                          className="w-full mt-3 bg-neutral-900 border border-white/10 p-2 text-[10px] text-white/40 rounded focus:outline-none focus:border-[#D4AF37]"
                          placeholder="메인 이미지 URL"
                        />
                      </div>
                      
                      <div className="col-span-2 space-y-4">
                        <div>
                          <label className="block text-white/30 text-[10px] uppercase font-bold mb-1">제목</label>
                          <input 
                            type="text" 
                            value={c.title} 
                            onChange={(e) => updateCase(i, 'title', e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 p-2 text-white rounded focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="block text-white/30 text-[10px] uppercase font-bold mb-1">한줄 요약 (메달 아이콘 아래)</label>
                          <input 
                            type="text" 
                            value={c.year} 
                            onChange={(e) => updateCase(i, 'year', e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 p-2 text-white rounded focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="block text-white/30 text-[10px] uppercase font-bold mb-1">세부 리스트 (콤마 구분)</label>
                          <textarea 
                            value={c.desc} 
                            onChange={(e) => updateCase(i, 'desc', e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 p-2 text-white rounded h-20 text-sm focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="max-w-4xl animate-in slide-in-from-bottom-4 duration-400">
               <h2 className="text-2xl font-bold text-white mb-6">히스토리(엔딩 크레딧) 관리</h2>
               <div className="space-y-6">
                 {localData.credits.map((group, i) => (
                   <div key={i} className="bg-black/40 border border-white/10 p-6 rounded-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <input 
                          type="text" 
                          value={group.year} 
                          onChange={(e) => {
                            const next = [...localData.credits];
                            next[i].year = e.target.value;
                            setLocalData({...localData, credits: next});
                          }}
                          className="bg-neutral-900 border border-white/10 p-2 text-white w-24 font-bold rounded focus:border-[#D4AF37] outline-none"
                        />
                        <span className="text-white/20">|</span>
                        <p className="text-white/40 text-xs">해당 연도의 주요 실적 리스트입니다. (줄바꿈으로 구분)</p>
                      </div>
                      <textarea 
                        value={group.items.join('\n')}
                        onChange={(e) => {
                          const next = [...localData.credits];
                          next[i].items = e.target.value.split('\n');
                          setLocalData({...localData, credits: next});
                        }}
                        className="w-full h-40 bg-neutral-900 border border-white/10 p-4 text-white rounded focus:border-[#D4AF37] outline-none leading-relaxed"
                      />
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-white mb-8">기본 정보 및 연락처 설정</h2>
              <div className="space-y-6 bg-black/40 p-8 border border-white/10 rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/40 text-xs mb-2">대표 전화</label>
                    <input 
                      type="text" 
                      value={localData.contact.mainPhone} 
                      onChange={(e) => setLocalData({...localData, contact: {...localData.contact, mainPhone: e.target.value}})}
                      className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">긴급/야간 상담</label>
                    <input 
                      type="text" 
                      value={localData.contact.emergencyPhone} 
                      onChange={(e) => setLocalData({...localData, contact: {...localData.contact, emergencyPhone: e.target.value}})}
                      className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/40 text-xs mb-2">이메일</label>
                  <input 
                    type="text" 
                    value={localData.contact.email} 
                    onChange={(e) => setLocalData({...localData, contact: {...localData.contact, email: e.target.value}})}
                    className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs mb-2">본사 주소</label>
                  <input 
                    type="text" 
                    value={localData.contact.address} 
                    onChange={(e) => setLocalData({...localData, contact: {...localData.contact, address: e.target.value}})}
                    className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs mb-2">사무소 주소</label>
                  <input 
                    type="text" 
                    value={localData.contact.office} 
                    onChange={(e) => setLocalData({...localData, contact: {...localData.contact, office: e.target.value}})}
                    className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                   <div>
                    <label className="block text-white/40 text-xs mb-2">사업자 번호</label>
                    <input 
                      type="text" 
                      value={localData.contact.businessReg} 
                      onChange={(e) => setLocalData({...localData, contact: {...localData.contact, businessReg: e.target.value}})}
                      className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">대표자명</label>
                    <input 
                      type="text" 
                      value={localData.contact.owner} 
                      onChange={(e) => setLocalData({...localData, contact: {...localData.contact, owner: e.target.value}})}
                      className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="max-w-2xl animate-in zoom-in-95 duration-300">
               <h2 className="text-2xl font-bold text-white mb-8">검색엔진 최적화 (SEO) 설정</h2>
               <div className="bg-black/40 p-8 border border-white/10 rounded-xl space-y-6">
                  <div>
                    <label className="block text-white/40 text-xs mb-2">웹사이트 제목 (Title Tag)</label>
                    <input 
                      type="text" 
                      value={localData.seo.title} 
                      onChange={(e) => setLocalData({...localData, seo: {...localData.seo, title: e.target.value}})}
                      className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                    />
                    <p className="mt-2 text-[10px] text-white/20 italic">브라우저 탭에 표시되는 제목이며 구글 검색 결과의 헤드라인이 됩니다.</p>
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">메타 설명 (Meta Description)</label>
                    <textarea 
                      value={localData.seo.description} 
                      onChange={(e) => setLocalData({...localData, seo: {...localData.seo, description: e.target.value}})}
                      className="w-full h-32 bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]"
                    />
                    <p className="mt-2 text-[10px] text-white/20 italic">검색 결과에서 제목 아래 표시되는 웹사이트 요약문입니다.</p>
                  </div>
               </div>

               <div className="mt-12 bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl flex gap-4">
                  <Globe className="text-blue-400 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-blue-400 font-bold text-sm mb-1">SEO 팁</h4>
                    <p className="text-white/60 text-xs leading-relaxed">
                      '프리미엄 경호', '개인 신변보호', '기업 주주총회 보안'과 같은 핵심 키워드를 제목과 설명에 자연스럽게 포함하면 검색 순위 노출에 유리합니다.
                    </p>
                  </div>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// --- Sub-components (Main Website) ---

const VideoSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="video-container">
        <iframe 
          src="https://www.youtube.com/embed/Q8J32GSUdn4?autoplay=1&mute=1&loop=1&playlist=Q8J32GSUdn4&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1" 
          frameBorder="0" 
          allow="autoplay; encrypted-media" 
          allowFullScreen
          className="w-full h-full scale-105"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#00050D]"></div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/60 text-xs tracking-wider uppercase font-light">더 보기</span>
        <ChevronDown className="text-[#D4AF37] w-8 h-8" strokeWidth={1.5} />
      </div>
    </section>
  );
};

const ReputationSection = () => {
  return (
    <section className="py-32 px-4 bg-[#00050D] text-center border-b border-white/5">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] font-cinzel mb-8 block uppercase">
          SUPREME REPUTATION
        </span>
        <h2 className="text-4xl md:text-6xl font-cinzel leading-tight mb-8">
          <span className="text-white">대한민국 </span>
          <span className="text-white font-black italic">1%</span>
          <span className="text-white">를 위한</span><br />
          <span className="text-gold-gradient gold-glow font-bold">프리미엄 보안의 기준</span>
        </h2>
        <div className="w-16 h-[1px] bg-[#D4AF37]/40 mx-auto mb-10"></div>
        <div className="space-y-4">
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
            에이스가드는 단순한 안전을 넘어 고객의 품격까지 생각합니다.
          </p>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            수년간의 현장 경험과 체계적인 교육 시스템을 통해 최상의 의전 서비스를 약속드립니다.
          </p>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = ({ cases }: { cases: PortfolioCase[] }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpenModal = (idx: number) => {
    setActiveProjectIndex(idx);
    setActiveImageIndex(0);
  };

  const handleNextProject = () => {
    if (activeProjectIndex === null) return;
    setActiveProjectIndex((prev) => (prev! + 1) % cases.length);
    setActiveImageIndex(0);
  };

  const handlePrevProject = () => {
    if (activeProjectIndex === null) return;
    setActiveProjectIndex((prev) => (prev! - 1 + cases.length) % cases.length);
    setActiveImageIndex(0);
  };

  return (
    <section className="py-24 px-4 bg-[#00050D] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16">
                <span className="text-[#D4AF37] tracking-widest text-sm uppercase">Elite Track Record</span>
                <h2 className="text-4xl md:text-5xl font-cinzel text-white mt-4">주요 수행 실적</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cases.map((item, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => handleOpenModal(idx)}
                        className="group relative overflow-hidden aspect-video bg-neutral-900 border border-white/5 cursor-pointer"
                    >
                        <img 
                            src={item.img} 
                            alt={item.title} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <span className="text-[#D4AF37] font-bold mb-2 block">{item.year}</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/60 text-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 line-clamp-2">
                                {item.desc}
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 p-8">
                             <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-white/40 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors">
                                <ChevronRight />
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {activeProjectIndex !== null && (
            <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
                <div 
                    className="absolute inset-0 opacity-20 blur-3xl scale-110 transition-all duration-700"
                    style={{ backgroundImage: `url(${cases[activeProjectIndex].images[activeImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>

                <button 
                    onClick={() => setActiveProjectIndex(null)}
                    className="absolute top-8 right-8 z-[1010] text-white/60 hover:text-white transition-colors"
                >
                    <X size={40} strokeWidth={1.5} />
                </button>

                <button 
                    onClick={handlePrevProject}
                    className="absolute left-4 md:left-12 z-[1010] w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all bg-black/20"
                >
                    <ChevronLeft size={32} />
                </button>
                <button 
                    onClick={handleNextProject}
                    className="absolute right-4 md:right-12 z-[1010] w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all bg-black/20"
                >
                    <ChevronRight size={32} />
                </button>

                <div className="relative z-[1010] w-full max-w-6xl px-4 flex flex-col items-center">
                    <div className="w-full aspect-video md:aspect-[21/9] bg-neutral-900 overflow-hidden border border-white/10 shadow-2xl">
                        <img 
                            src={cases[activeProjectIndex].images[activeImageIndex]} 
                            alt="Project Focus" 
                            className="w-full h-full object-cover animate-in zoom-in-95 duration-500"
                        />
                    </div>

                    <div className="mt-10 text-center space-y-3">
                        <p className="text-[#D4AF37] text-sm font-cinzel tracking-widest uppercase">
                            {cases[activeProjectIndex].year}
                        </p>
                        <h3 className="text-3xl md:text-4xl font-black text-white">
                            {cases[activeProjectIndex].title}
                        </h3>
                        <p className="text-white/40 text-sm font-light">
                            {cases[activeProjectIndex].imageDetails?.[activeImageIndex] || cases[activeProjectIndex].desc}
                        </p>
                    </div>

                    <div className="mt-10 flex gap-4 overflow-x-auto max-w-full px-6 py-4 scrollbar-hide">
                        {cases[activeProjectIndex].images.map((img, i) => (
                            <button 
                                key={i}
                                onClick={() => setActiveImageIndex(i)}
                                className={`w-16 h-16 flex-shrink-0 cursor-pointer border-2 transition-all duration-300 relative group focus:outline-none overflow-visible
                                    ${activeImageIndex === i ? 'border-[#D4AF37]' : 'border-white/10 grayscale hover:grayscale-0'}
                                `}
                            >
                                <div className="w-full h-full relative">
                                    <img src={img} className="w-full h-full object-cover block" />
                                    {activeImageIndex !== i && (
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </section>
  );
};

const EndingCredits = ({ credits }: { credits: CreditItem[] }) => {
  const fullCredits = [...credits, ...credits];

  return (
    <section className="py-32 bg-black border-y border-[#D4AF37]/20 relative h-[700px] overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        
        <div className="mb-12 text-center z-20">
            <h2 className="text-2xl font-cinzel text-gold-gradient tracking-widest gold-glow uppercase">Trust of Global Enterprises</h2>
            <p className="text-white/40 text-xs tracking-widest mt-2 italic">Honoring our partnership with world-class leaders</p>
        </div>

        <div className="relative w-full overflow-hidden flex-1">
            <div className="animate-scroll-up flex flex-col items-center">
                {fullCredits.map((group, idx) => (
                    <div key={idx} className="mb-24 text-center">
                        <h3 className="text-3xl font-cinzel text-[#D4AF37] mb-8 font-bold">{group.year}</h3>
                        <div className="space-y-4">
                            {group.items.map((item, i) => (
                                <p key={i} className="text-xl md:text-2xl text-white/80 font-light hover:text-white transition-colors">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

const ContactForm = ({ contact }: { contact: SiteData['contact'] }) => {
  const serviceRates = [
    {
      title: "신변보호-데이트폭력, 스토킹, 안심동행, 법정동행 등",
      desc: "",
      price: "300,000 원"
    },
    {
      title: "각종 행사경호 8시간",
      desc: "투입인원과 기간에 따라 협의-숙식은 의뢰인측에서 제공을 원칙으로 합니다.",
      price: "250,000 원"
    },
    {
      title: "분쟁경호 8시간",
      desc: "투입인원과 기간에 따라 협의-숙식은 의뢰인측에서 제공을 원칙으로 합니다.",
      price: "250,000 원"
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#00050D]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-stretch">
            <div className="lg:w-1/2 flex flex-col">
                <div className="mb-8">
                    <span className="text-[#D4AF37] tracking-widest text-sm uppercase">Direct Consultation</span>
                    <h2 className="text-4xl md:text-5xl font-cinzel text-white mt-4 mb-8">상담문의</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-[38px]">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded-sm text-[#D4AF37]">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-white/40 text-sm">대표전화</p>
                                <p className="text-2xl text-white font-bold">{contact.mainPhone}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded-sm text-[#D4AF37]">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <p className="text-white/40 text-sm">긴급상담</p>
                                <p className="text-2xl text-white font-bold text-gold-gradient">{contact.emergencyPhone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    <h3 className="text-[#D4AF37] font-bold text-xl mb-4 tracking-wider">서비스 가격 안내</h3>
                    {serviceRates.map((rate, idx) => (
                        <div key={idx} className="bg-black border border-white/10 p-4 flex flex-col gap-1 relative">
                            <div className="flex justify-between items-start gap-4">
                                <h4 className="text-white font-bold text-lg leading-snug flex-1">{rate.title}</h4>
                                <span className="text-[#D4AF37] font-bold text-xl whitespace-nowrap">{rate.price}</span>
                            </div>
                            {rate.desc && (
                                <p className="text-white/40 text-[11px] mt-1 leading-relaxed">
                                    {rate.desc}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:w-1/2 flex flex-col">
                <form className="h-full bg-white/5 p-8 border border-white/10 flex flex-col">
                    <div className="space-y-6 flex-1 flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/60 text-sm mb-2">성함 (필수)</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="성함을 입력해 주세요" />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-2">연락처 (필수)</label>
                                <input type="tel" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="010-0000-0000" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/60 text-sm mb-2">행사일시</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="예: 2025-05-20 14:00" />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-2">행사장소</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="예: 서울 강남구 OO호텔" />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label className="block text-white/60 text-sm mb-2">의뢰내용</label>
                            <textarea className="flex-1 w-full bg-black/40 border border-white/10 px-4 py-3 text-white min-h-[155px] focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="의뢰 내용(이벤트, 개인경호, 수행 등)을 기재해 주세요."></textarea>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => window.location.href = 'sms:010-2276-0258'}
                        className="w-full py-4 mt-6 bg-gradient-to-r from-[#D4AF37] via-[#FFFACD] to-[#BF9B30] text-black font-black tracking-[0.2em] hover:brightness-110 transition-all uppercase"
                    >
                        문자 보내기
                    </button>
                </form>
            </div>
        </div>
    </section>
  );
};

const Footer = ({ contact, onAdminOpen }: { contact: SiteData['contact'], onAdminOpen: () => void }) => {
  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                  <h2 className="font-cinzel text-2xl font-bold text-gold-gradient">ACE GUARD</h2>
                  <button onClick={onAdminOpen} className="text-white/10 hover:text-[#D4AF37] transition-colors">
                    <Settings size={14} />
                  </button>
                </div>
                <div className="text-white/40 text-[11px] leading-relaxed max-w-2xl space-y-1">
                    <p>(주)에이스가드 | 대표 : {contact.owner} | 사업자등록번호 : {contact.businessReg} | 통신판매업신고번호: 제 2022-경기양평-0030 호</p>
                    <p>본사 - {contact.address} | 사무소 - {contact.office}</p>
                    <p>전화번호 : {contact.mainPhone} | 이메일 : {contact.email}</p>
                    <p className="pt-2">Copyright 2025 ACE GUARD Security Service. All Rights Reserved.</p>
                </div>
            </div>
            
            <div className="flex gap-6">
                <a href="https://www.instagram.com/ace._.guard" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                    <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/channel/UCEYQhbuqHRtzSl-l-NKhF2Q" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                    <Youtube size={20} />
                </a>
                <a href="https://m.blog.naver.com/aceguard17?tab=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                    <Globe size={20} />
                </a>
            </div>
        </div>
    </footer>
  );
};

const FeaturesGrid = () => {
    const features = [
        { icon: ShieldCheck, title: "완벽한 보안", desc: "어떠한 상황에서도 고객의 안전을 1순위로 보장합니다." },
        { icon: Users, title: "엄격한 선발", desc: "전원 무도 유단자 및 특수부대 출신의 정예요원 투입" },
        { icon: Lock, title: "비밀 보장", desc: "고객의 사생활과 기업의 기밀을 철저히 보호합니다." },
        { icon: Award, title: "최상의 의전", desc: "단순 경호를 넘어 품격 있는 의전 서비스를 제공합니다." }
    ];

    return (
        <section className="py-24 bg-[#010816]">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((f, i) => (
                    <div key={i} className="p-8 bg-black/40 border border-white/5 hover:border-[#D4AF37]/50 transition-all group">
                        <f.icon className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" size={40} />
                        <h4 className="text-xl font-bold text-white mb-4">{f.title}</h4>
                        <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- Main App ---

function App() {
  const [siteData, setSiteData] = useState<SiteData>(INITIAL_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [password, setPassword] = useState('');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('aceguard_site_data');
    if (saved) {
      try {
        setSiteData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved site data", e);
      }
    }
  }, []);

  // Update SEO Title dynamically
  useEffect(() => {
    document.title = siteData.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', siteData.seo.description);
  }, [siteData]);

  const saveSiteData = (newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem('aceguard_site_data', JSON.stringify(newData));
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') {
      setIsAdminOpen(true);
      setIsAuthOpen(false);
      setPassword('');
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Admin Dash Container */}
      {isAdminOpen && (
        <AdminDashboard 
          data={siteData} 
          onSave={saveSiteData} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

      {/* Admin Auth Modal */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-[2100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
           <form onSubmit={handleAdminAuth} className="bg-neutral-900 border border-white/10 p-8 rounded-2xl w-full max-w-sm">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black mb-4">
                  <Lock size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">관리자 로그인</h3>
                <p className="text-white/40 text-sm mt-1">대시보드 접속을 위해 암호를 입력하세요.</p>
              </div>
              <input 
                autoFocus
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mb-4 outline-none focus:border-[#D4AF37]"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsAuthOpen(false)} className="flex-1 py-3 text-white/60 hover:text-white transition-colors">취소</button>
                <button type="submit" className="flex-1 bg-[#D4AF37] text-black font-bold rounded-lg py-3 hover:brightness-110">접속</button>
              </div>
           </form>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <div className="font-cinzel text-xl md:text-2xl font-black text-gold-gradient tracking-[0.3em]">
            ACE GUARD
        </div>
      </nav>

      {/* Sections */}
      <VideoSection />
      <PortfolioSection cases={siteData.cases} />
      <EndingCredits credits={siteData.credits} />
      <ReputationSection />
      <FeaturesGrid />
      <ContactForm contact={siteData.contact} />
      <Footer contact={siteData.contact} onAdminOpen={() => setIsAuthOpen(true)} />

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <button 
            onClick={() => window.location.href = 'sms:010-2276-0258'}
            className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-3 rounded-full font-bold shadow-lg shadow-[#D4AF37]/20 hover:scale-105 transition-transform group"
        >
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">문자 상담</span>
            <Phone size={20} />
        </button>
        <button 
            onClick={() => window.open('https://pf.kakao.com/_jDrEG', '_blank')}
            className="flex items-center gap-2 bg-[#FEE500] text-black px-4 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform group"
        >
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">카톡 상담</span>
            <MessageSquare size={20} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}

export default App;