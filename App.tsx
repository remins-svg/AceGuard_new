
import React, { useState, useEffect, useMemo } from 'react';
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
      images: ["https://i.ifh.cc/o7J6Qd.jpg", "https://i.ifh.cc/ZYRFfT.jpg", "https://i.ifh.cc/238LvD.jpg", "https://i.ifh.cc/B4KT9V.jpg"],
      imageDetails: ["본행사", "SOM1", "SOM2", "SOM3"]
    },
    { 
      title: "02. 지역 축제 및 문화 페스티벌", 
      location: "노원 / 안산 / 광명 / 전주 / 괴산 / 국악 / 과천",
      desc: "노원탈축제 / 안산거리축제 / 광명페스티벌 / 전주가맥축제 / 괴산축제 / 국악 축제 / 과천축제", 
      img: "https://i.ifh.cc/k05okF.jpg",
      year: "대규모 인파 관리와 공공 안전 시스템",
      images: ["https://i.ifh.cc/k05okF.jpg", "https://i.ifh.cc/x2PzJd.jpg", "https://i.ifh.cc/LRyCPB.jpg", "https://i.ifh.cc/6n1xxW.jpg", "https://i.ifh.cc/xv3b9F.jpg", "https://i.ifh.cc/ZomYzl.jpg", "https://i.ifh.cc/Zy95Cb.jpg"],
      imageDetails: ["노원탈축제", "안산거리축제", "광명페스티벌", "전주가맥축제", "괴산축제", "국악 축제", "과천축제"]
    },
    { 
      title: "03. 콘서트 & 월드투어", 
      location: "SEOUL / WORLD TOUR",
      desc: "에일리 / 팬텀싱어 / 부활 / 불타는 트롯맨", 
      img: "https://i.ifh.cc/YRS8vd.jpg",
      year: "역동적인 현장감과 아티스트 밀착 신변보호",
      images: ["https://i.ifh.cc/YRS8vd.jpg", "https://i.ifh.cc/GBANQ3.jpg", "https://i.ifh.cc/SCjkZO.jpg", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070"],
      imageDetails: ["에일리", "팬텀싱어", "부활", "불타는 트롯맨"]
    },
    { 
      title: "04. 스포츠 & 팬미팅 & 행사경호", 
      location: "SPORTS / EVENT / EXCLUSIVE",
      desc: "수원스타필드오프닝 / 신한동해오픈 골프대회 / 전국노래자랑 / 송가인 팬미팅 / LPGA 선수권대회 / 인천포럼 / 평창올림픽 / 스포츠행사경호 / 새마을금고 열린음악회", 
      img: "https://i.ifh.cc/Whlht7.jpg",
      year: "VIP 의전과 스포츠 특화 경호 로직 노출",
      images: ["https://i.ifh.cc/Whlht7.jpg", "https://i.ifh.cc/soT5cC.jpg", "https://i.ifh.cc/W8TAf9.jpg", "https://i.ifh.cc/GB18QW.jpg", "https://i.ifh.cc/R8G6Cr.jpg", "https://i.ifh.cc/G88KlB.jpg", "https://i.ifh.cc/9QtxF9.jpg", "https://i.ifh.cc/lHTTmk.jpg", "https://i.ifh.cc/yaVd1H.jpg"],
      imageDetails: ["수원스타필드오프닝", "신한동해오픈 골프대회", "전국노래자랑", "송가인 팬미팅", "LPGA 선수권대회", "인천포럼", "평창올림픽", "스포츠행사경호", "새마을금고 열린음악회"]
    },
    { 
      title: "05. 기업 V.I.P 프로토콜", 
      location: "KICCOF / Hanjin Kal / LG / MBN",
      desc: "KICCOF 행사 / 한진칼 주주총회 / LG 주주총회 / 전시장 및 박람회 / MBN Y 포럼 / 와인페스타 / 주주총회", 
      img: "https://i.ifh.cc/naq5nM.jpg",
      year: "기업의 품격과 기밀 유지를 위한 철저한 보안",
      images: ["https://i.ifh.cc/naq5nM.jpg", "https://i.ifh.cc/wHZw2R.jpg", "https://i.ifh.cc/A7P7yL.jpg", "https://i.ifh.cc/twHVjF.jpg", "https://i.ifh.cc/AL61Gy.png", "https://i.ifh.cc/Os4kQk.jpg", "https://i.ifh.cc/DdZgpQ.jpg"],
      imageDetails: ["KICCOF 행사", "한진칼 주주총회", "LG 주주총회", "전시장 및 박람회", "MBN Y 포럼", "와인페스타", "주주총회"]
    },
    { 
      title: "06. 프라이빗 신변보호", 
      location: "PRIVATE / 1:1",
      desc: "1:1 전담 신변보호 서비스 / 시설보안 / 법정동행", 
      img: "https://i.ifh.cc/8m0dBb.jpg",
      year: "개인의 일상을 지키는 '용의 시선'과 고요한 수호",
      images: ["https://i.ifh.cc/8m0dBb.jpg", "https://i.ifh.cc/S5MpBt.jpg", "https://i.ifh.cc/5Nf2lq.jpg"],
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
      <header className="bg-black border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black">
            <Settings size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">ACE GUARD <span className="text-[#D4AF37] font-light">ADMIN PANEL</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#D4AF37] text-black px-5 py-2 rounded-md font-bold hover:brightness-110 transition-all text-sm">
            <Save size={18} /> 저장하기
          </button>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X size={28} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 bg-black border-r border-white/10 flex flex-col p-4 gap-2">
          <button onClick={() => setActiveTab('portfolio')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'portfolio' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
            <Layout size={20} /> 실적 관리
          </button>
          <button onClick={() => setActiveTab('credits')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'credits' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
            <ExternalLink size={20} /> 히스토리 관리
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
            <Type size={20} /> 기본 정보 관리
          </button>
          <button onClick={() => setActiveTab('seo')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'seo' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
            <Search size={20} /> 검색엔진(SEO)
          </button>
        </nav>

        <main className="flex-1 overflow-y-auto bg-[#0a0f1d] p-8">
          {activeTab === 'portfolio' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">수행 실적 관리</h2>
                  <p className="text-white/40 text-sm">랜딩페이지의 '주요 수행 실적' 섹션에 노출되는 데이터를 편집합니다.</p>
                </div>
                <button onClick={addCase} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded flex items-center gap-2 border border-white/5 transition-all">
                  <Plus size={18} /> 실적 추가
                </button>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {localData.cases.map((c, i) => (
                  <div key={i} className="bg-black/40 border border-white/10 rounded-xl overflow-hidden p-6 relative group">
                    <button onClick={() => deleteCase(i)} className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-1">
                        <div className="aspect-square bg-neutral-900 rounded-lg overflow-hidden border border-white/10 relative">
                          <img src={c.img} className="w-full h-full object-cover" alt="" />
                        </div>
                        <input type="text" value={c.img} onChange={(e) => updateCase(i, 'img', e.target.value)} className="w-full mt-3 bg-neutral-900 border border-white/10 p-2 text-[10px] text-white/40 rounded focus:outline-none focus:border-[#D4AF37]" placeholder="메인 이미지 URL" />
                      </div>
                      <div className="col-span-2 space-y-4">
                        <div>
                          <label className="block text-white/30 text-[10px] uppercase font-bold mb-1">제목</label>
                          <input type="text" value={c.title} onChange={(e) => updateCase(i, 'title', e.target.value)} className="w-full bg-neutral-900 border border-white/10 p-2 text-white rounded focus:outline-none focus:border-[#D4AF37]" />
                        </div>
                        <div>
                          <label className="block text-white/30 text-[10px] uppercase font-bold mb-1">한줄 요약</label>
                          <input type="text" value={c.year} onChange={(e) => updateCase(i, 'year', e.target.value)} className="w-full bg-neutral-900 border border-white/10 p-2 text-white rounded focus:outline-none focus:border-[#D4AF37]" />
                        </div>
                        <div>
                          <label className="block text-white/30 text-[10px] uppercase font-bold mb-1">세부 리스트</label>
                          <textarea value={c.desc} onChange={(e) => updateCase(i, 'desc', e.target.value)} className="w-full bg-neutral-900 border border-white/10 p-2 text-white rounded h-20 text-sm focus:outline-none focus:border-[#D4AF37]" />
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
               <h2 className="text-2xl font-bold text-white mb-6">히스토리 관리</h2>
               <div className="space-y-6">
                 {localData.credits.map((group, i) => (
                   <div key={i} className="bg-black/40 border border-white/10 p-6 rounded-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <input type="text" value={group.year} onChange={(e) => {
                          const next = [...localData.credits];
                          next[i].year = e.target.value;
                          setLocalData({...localData, credits: next});
                        }} className="bg-neutral-900 border border-white/10 p-2 text-white w-24 font-bold rounded focus:border-[#D4AF37] outline-none" />
                      </div>
                      <textarea value={group.items.join('\n')} onChange={(e) => {
                        const next = [...localData.credits];
                        next[i].items = e.target.value.split('\n');
                        setLocalData({...localData, credits: next});
                      }} className="w-full h-40 bg-neutral-900 border border-white/10 p-4 text-white rounded focus:border-[#D4AF37] outline-none leading-relaxed" />
                   </div>
                 ))}
               </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-white mb-8">기본 정보 설정</h2>
              <div className="space-y-6 bg-black/40 p-8 border border-white/10 rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/40 text-xs mb-2">대표 전화</label>
                    <input type="text" value={localData.contact.mainPhone} onChange={(e) => setLocalData({...localData, contact: {...localData.contact, mainPhone: e.target.value}})} className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">긴급 상담</label>
                    <input type="text" value={localData.contact.emergencyPhone} onChange={(e) => setLocalData({...localData, contact: {...localData.contact, emergencyPhone: e.target.value}})} className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                   <div>
                    <label className="block text-white/40 text-xs mb-2">사업자 번호</label>
                    <input type="text" value={localData.contact.businessReg} onChange={(e) => setLocalData({...localData, contact: {...localData.contact, businessReg: e.target.value}})} className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">대표자명</label>
                    <input type="text" value={localData.contact.owner} onChange={(e) => setLocalData({...localData, contact: {...localData.contact, owner: e.target.value}})} className="w-full bg-neutral-900 border border-white/10 p-3 text-white rounded outline-none focus:border-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// --- Sub-components (Website) ---

const VideoSection = () => (
  <section className="relative h-screen w-full overflow-hidden bg-black">
    <div className="video-container">
      <iframe src="https://www.youtube.com/embed/Q8J32GSUdn4?autoplay=1&mute=1&loop=1&playlist=Q8J32GSUdn4&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen className="w-full h-full scale-105"></iframe>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#00050D]"></div>
    </div>
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-white/60 text-xs tracking-wider uppercase font-light">더 보기</span>
      <ChevronDown className="text-[#D4AF37] w-8 h-8" strokeWidth={1.5} />
    </div>
  </section>
);

const PortfolioSection = ({ cases }: { cases: PortfolioCase[] }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentCase = useMemo(() => activeProjectIndex !== null ? cases[activeProjectIndex] : null, [activeProjectIndex, cases]);

  return (
    <section className="py-24 px-4 bg-[#00050D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16">
                <span className="text-[#D4AF37] tracking-widest text-sm uppercase">Elite Track Record</span>
                <h2 className="text-4xl md:text-5xl font-cinzel text-white mt-4">주요 수행 실적</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cases.map((item, idx) => (
                    <div key={idx} onClick={() => { setActiveProjectIndex(idx); setActiveImageIndex(0); }} className="group relative overflow-hidden aspect-video bg-neutral-900 border border-white/5 cursor-pointer">
                        <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <span className="text-[#D4AF37] font-bold mb-2 block">{item.year}</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {currentCase && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
                <button onClick={() => setActiveProjectIndex(null)} className="absolute top-8 right-8 text-white/60 hover:text-white"><X size={40} /></button>
                <div className="w-full max-w-6xl px-4 flex flex-col items-center">
                    <div className="w-full aspect-video md:aspect-[21/9] bg-neutral-900 overflow-hidden border border-white/10">
                        <img src={currentCase.images[activeImageIndex]} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="mt-8 text-center">
                        <h3 className="text-3xl font-black text-white">{currentCase.title}</h3>
                        <p className="text-white/40 mt-2">{currentCase.imageDetails?.[activeImageIndex] || currentCase.desc}</p>
                    </div>
                    <div className="mt-8 flex gap-4 overflow-x-auto max-w-full px-4 scrollbar-hide">
                        {currentCase.images.map((img, i) => (
                            <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-16 h-16 flex-shrink-0 border-2 ${activeImageIndex === i ? 'border-[#D4AF37]' : 'border-white/10 opacity-50'}`}>
                                <img src={img} className="w-full h-full object-cover" alt="" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </section>
  );
};

const EndingCredits = ({ credits }: { credits: CreditItem[] }) => (
  <section className="py-32 bg-black border-y border-[#D4AF37]/20 relative h-[700px] overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="mb-12 text-center z-20">
          <h2 className="text-2xl font-cinzel text-gold-gradient tracking-widest uppercase">Trust of Global Enterprises</h2>
      </div>
      <div className="relative w-full overflow-hidden flex-1">
          <div className="animate-scroll-up flex flex-col items-center">
              {[...credits, ...credits].map((group, idx) => (
                  <div key={idx} className="mb-24 text-center">
                      <h3 className="text-3xl font-cinzel text-[#D4AF37] mb-8 font-bold">{group.year}</h3>
                      <div className="space-y-4">
                          {group.items.map((item, i) => (
                              <p key={i} className="text-xl md:text-2xl text-white/80 font-light">{item}</p>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      </div>
  </section>
);

const ContactForm = ({ contact }: { contact: SiteData['contact'] }) => (
  <section className="py-24 px-4 bg-[#00050D]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
              <span className="text-[#D4AF37] tracking-widest text-sm uppercase">Direct Consultation</span>
              <h2 className="text-4xl md:text-5xl font-cinzel text-white mt-4 mb-8">상담문의</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded text-[#D4AF37]"><Phone size={24} /></div>
                      <div><p className="text-white/40 text-sm">대표전화</p><p className="text-2xl text-white font-bold">{contact.mainPhone}</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded text-[#D4AF37]"><MessageSquare size={24} /></div>
                      <div><p className="text-white/40 text-sm">긴급상담</p><p className="text-2xl text-gold-gradient font-bold">{contact.emergencyPhone}</p></div>
                  </div>
              </div>
          </div>
          <div className="lg:w-1/2">
              <form className="bg-white/5 p-8 border border-white/10 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6">
                      <input type="text" className="bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#D4AF37]" placeholder="성함" />
                      <input type="tel" className="bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#D4AF37]" placeholder="연락처" />
                  </div>
                  <textarea className="bg-black/40 border border-white/10 px-4 py-3 text-white h-40 outline-none focus:border-[#D4AF37]" placeholder="의뢰내용"></textarea>
                  <button type="button" onClick={() => window.location.href = `sms:${contact.emergencyPhone}`} className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#FFFACD] to-[#BF9B30] text-black font-black uppercase">문자 보내기</button>
              </form>
          </div>
      </div>
  </section>
);

const Footer = ({ contact, onAdminOpen }: { contact: SiteData['contact'], onAdminOpen: () => void }) => (
  <footer className="py-12 px-4 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
              <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                <h2 className="font-cinzel text-2xl font-bold text-gold-gradient">ACE GUARD</h2>
                <button onClick={onAdminOpen} className="text-white/10 hover:text-[#D4AF37]"><Settings size={14} /></button>
              </div>
              <div className="text-white/40 text-[11px] leading-relaxed">
                  <p>(주)에이스가드 | 대표 : {contact.owner} | 사업자번호 : {contact.businessReg}</p>
                  <p>주소 : {contact.address} | 사무소 : {contact.office}</p>
                  <p>Copyright 2025 ACE GUARD. All Rights Reserved.</p>
              </div>
          </div>
          <div className="flex gap-6">
              <a href="https://www.instagram.com/ace._.guard" className="text-white/40 hover:text-[#D4AF37]"><Instagram /></a>
              <a href="https://www.youtube.com/channel/UCEYQhbuqHRtzSl-l-NKhF2Q" className="text-white/40 hover:text-[#D4AF37]"><Youtube /></a>
          </div>
      </div>
  </footer>
);

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(INITIAL_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('aceguard_site_data');
    if (saved) {
      try { setSiteData(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveSiteData = (newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem('aceguard_site_data', JSON.stringify(newData));
  };

  return (
    <div className="min-h-screen">
      {isAdminOpen && <AdminDashboard data={siteData} onSave={saveSiteData} onClose={() => setIsAdminOpen(false)} />}
      {isAuthOpen && (
        <div className="fixed inset-0 z-[2100] bg-black/90 flex items-center justify-center p-4">
           <div className="bg-neutral-900 p-8 rounded-2xl w-full max-w-sm border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">관리자 로그인</h3>
              <input autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-black border border-white/10 rounded p-3 text-white mb-4" />
              <div className="flex gap-3">
                <button onClick={() => setIsAuthOpen(false)} className="flex-1 text-white/40">취소</button>
                <button onClick={() => { if(password === 'admin1234') { setIsAdminOpen(true); setIsAuthOpen(false); } else { alert('오류'); } }} className="flex-1 bg-[#D4AF37] text-black font-bold py-3 rounded">접속</button>
              </div>
           </div>
        </div>
      )}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="font-cinzel text-xl md:text-2xl font-black text-gold-gradient tracking-widest">ACE GUARD</div>
      </nav>
      <VideoSection />
      <PortfolioSection cases={siteData.cases} />
      <EndingCredits credits={siteData.credits} />
      <ContactForm contact={siteData.contact} />
      <Footer contact={siteData.contact} onAdminOpen={() => setIsAuthOpen(true)} />
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <button onClick={() => window.location.href = `sms:${siteData.contact.emergencyPhone}`} className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-3 rounded-full font-bold shadow-lg shadow-[#D4AF37]/20 hover:scale-105 transition-transform group">
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">문자 상담</span><Phone size={20} />
        </button>
        <button onClick={() => window.open('https://pf.kakao.com/_jDrEG', '_blank')} className="flex items-center gap-2 bg-[#FEE500] text-black px-4 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform group">
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">카톡 상담</span><MessageSquare size={20} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
