
/**
 * ACE GUARD DEPLOYMENT VERSION: 2025.05.22.BUILD_001
 * 010-2276-0258 / Kakao: _jDrEG / Portfolio 06 Updated
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Instagram, 
  Youtube, 
  ChevronDown,
  X,
  Settings,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  Layout,
  Type
} from 'lucide-react';

// --- Types ---
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
    { title: "01. 국제 정상회의 (APEC)", location: "제주 / APEC", desc: "본행사, SOM1, SOM2, SOM3", img: "https://i.ifh.cc/o7J6Qd.jpg", year: "국가급 '보안'의 정수", images: ["https://i.ifh.cc/o7J6Qd.jpg", "https://i.ifh.cc/ZYRFfT.jpg", "https://i.ifh.cc/238LvD.jpg"], imageDetails: ["본행사", "SOM1", "SOM2"] },
    { title: "02. 지역 축제 및 페스티벌", location: "전국 각지", desc: "노원탈축제 / 안산거리축제 / 광명페스티벌 등", img: "https://i.ifh.cc/k05okF.jpg", year: "대규모 인파 관리 시스템", images: ["https://i.ifh.cc/k05okF.jpg", "https://i.ifh.cc/x2PzJd.jpg"], imageDetails: ["현장 통제", "안전 가이드"] },
    { title: "03. 콘서트 & 월드투어", location: "SEOUL / GLOBAL", desc: "에일리 / 팬텀싱어 / 부활 / 트롯맨", img: "https://i.ifh.cc/YRS8vd.jpg", year: "아티스트 밀착 의전", images: ["https://i.ifh.cc/YRS8vd.jpg", "https://i.ifh.cc/GBANQ3.jpg"], imageDetails: ["콘서트 보안", "출입 통제"] },
    { title: "04. 스포츠 & 대형 이벤트", location: "SPORTS / EVENT", desc: "수원스타필드 / 신한동해오픈 / LPGA", img: "https://i.ifh.cc/Whlht7.jpg", year: "스포츠 특화 경호 로직", images: ["https://i.ifh.cc/Whlht7.jpg", "https://i.ifh.cc/soT5cC.jpg"], imageDetails: ["대회 보안", "VIP 케어"] },
    { title: "05. 기업 V.I.P 프로토콜", location: "CORPORATE", desc: "한진칼 / LG / MBN Y 포럼", img: "https://i.ifh.cc/naq5nM.jpg", year: "기업의 품격 유지", images: ["https://i.ifh.cc/naq5nM.jpg", "https://i.ifh.cc/wHZw2R.jpg"], imageDetails: ["주주총회", "포럼 보안"] },
    { title: "06. 프라이빗 신변보호", location: "PRIVATE", desc: "1:1 전담 서비스 / 시설보안 / 법정동행", img: "https://i.ifh.cc/8m0dBb.jpg", year: "개인의 일상을 지키는 수호", images: ["https://i.ifh.cc/8m0dBb.jpg", "https://i.ifh.cc/S5MpBt.jpg", "https://i.ifh.cc/5Nf2lq.jpg"], imageDetails: ["1:1 의전", "신변 보호", "법정 경호"] }
  ],
  credits: [
    { year: "2025", items: ["경주 APEC 보안 총괄", "가수 송가인 팬미팅", "LG전자 주주총회"] },
    { year: "2024", items: ["파리올림픽 양궁팀 축하 만찬", "아이폰16 런칭 파티"] },
    { year: "2018", items: ["평창 동계올림픽 보안 총괄", "IOC 위원 의전"] }
  ]
};

const AdminDashboard = ({ data, onSave, onClose }: { data: SiteData, onSave: (newData: SiteData) => void, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'credits' | 'settings'>('portfolio');
  const [localData, setLocalData] = useState<SiteData>(data);
  const handleSave = () => { onSave(localData); alert('저장되었습니다.'); };

  return (
    <div className="fixed inset-0 z-[2000] bg-black flex flex-col font-sans overflow-hidden">
      <header className="border-b border-white/10 p-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#D4AF37]">ACE GUARD ADMIN</h1>
        <div className="flex gap-4">
          <button onClick={handleSave} className="bg-[#D4AF37] text-black px-6 py-2 rounded font-bold flex items-center gap-2"><Save size={18}/> SAVE</button>
          <button onClick={onClose} className="text-white/40"><X size={32}/></button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 border-r border-white/10 p-4 space-y-2">
           <button onClick={() => setActiveTab('portfolio')} className={`w-full text-left p-3 rounded ${activeTab === 'portfolio' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40'}`}>실적 관리</button>
           <button onClick={() => setActiveTab('credits')} className={`w-full text-left p-3 rounded ${activeTab === 'credits' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40'}`}>히스토리</button>
           <button onClick={() => setActiveTab('settings')} className={`w-full text-left p-3 rounded ${activeTab === 'settings' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-white/40'}`}>정보 설정</button>
        </nav>
        <main className="flex-1 p-8 overflow-y-auto bg-neutral-900/30">
           {activeTab === 'settings' && (
             <div className="max-w-xl space-y-4">
               <label className="text-white/40 block text-xs">상담 번호</label>
               <input value={localData.contact.emergencyPhone} onChange={e => setLocalData({...localData, contact: {...localData.contact, emergencyPhone: e.target.value}})} className="w-full bg-black border border-white/10 p-3 text-white rounded outline-none"/>
             </div>
           )}
           {activeTab === 'portfolio' && (
             <div className="grid grid-cols-2 gap-6">
               {localData.cases.map((c, i) => (
                 <div key={i} className="bg-black p-4 border border-white/10 rounded">
                   <input value={c.title} onChange={e => {
                     const next = [...localData.cases]; next[i].title = e.target.value; setLocalData({...localData, cases: next});
                   }} className="bg-neutral-900 p-2 text-white w-full rounded mb-2" />
                   <textarea value={c.desc} onChange={e => {
                     const next = [...localData.cases]; next[i].desc = e.target.value; setLocalData({...localData, cases: next});
                   }} className="bg-neutral-900 p-2 text-white w-full rounded h-20" />
                 </div>
               ))}
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<SiteData>(INITIAL_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aceguard_site_data');
      if (saved) setData(JSON.parse(saved));
    } catch (e) { console.error("Data Load Error", e); }
  }, []);

  const handleSave = (newData: SiteData) => {
    setData(newData);
    localStorage.setItem('aceguard_site_data', JSON.stringify(newData));
  };

  return (
    <div className="min-h-screen">
      {isAdmin && <AdminDashboard data={data} onSave={handleSave} onClose={() => setIsAdmin(false)} />}
      {isAuth && (
        <div className="fixed inset-0 z-[2100] bg-black/95 flex items-center justify-center p-4">
           <div className="bg-neutral-900 p-10 border border-[#D4AF37]/30 rounded-lg max-w-sm w-full text-center">
              <h3 className="text-2xl font-cinzel text-gold-gradient mb-8">ADMIN AUTH</h3>
              <input autoFocus type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="PASSWORD" className="w-full bg-black border border-white/10 p-4 text-white rounded mb-6 outline-none focus:border-[#D4AF37]"/>
              <div className="flex gap-4">
                <button onClick={() => setIsAuth(false)} className="flex-1 text-white/40">CLOSE</button>
                <button onClick={() => { if(pw==='admin1234') { setIsAdmin(true); setIsAuth(false); setPw(''); } else { alert('Incorrect'); } }} className="flex-1 bg-[#D4AF37] text-black font-bold py-4 rounded">LOGIN</button>
              </div>
           </div>
        </div>
      )}

      <nav className="fixed top-0 w-full z-[100] px-8 py-10 bg-gradient-to-b from-black/90 to-transparent flex justify-between items-center">
        <h1 className="text-2xl font-cinzel text-gold-gradient tracking-widest font-black">ACE GUARD</h1>
      </nav>

      <section className="relative h-screen w-full bg-black">
        <div className="video-container">
          <iframe src="https://www.youtube.com/embed/Q8J32GSUdn4?autoplay=1&mute=1&loop=1&playlist=Q8J32GSUdn4&controls=0&modestbranding=1&enablejsapi=1" frameBorder="0" allow="autoplay; encrypted-media" className="w-full h-full scale-105"></iframe>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#00050D]"></div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-[#D4AF37]">
          <ChevronDown size={40} />
        </div>
      </section>

      <section className="py-32 px-4 bg-[#00050D]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cinzel text-white mb-20 border-l-4 border-[#D4AF37] pl-8">주요 수행 실적</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.cases.map((item, idx) => (
              <div key={idx} onClick={() => setActiveIdx(idx)} className="group relative aspect-[4/5] bg-neutral-900 cursor-pointer overflow-hidden border border-white/5 shadow-2xl">
                <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:grayscale-0 grayscale transition-all duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-[#D4AF37] font-bold text-sm tracking-widest">{item.year}</span>
                  <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeIdx !== null && (
        <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
           <button onClick={() => setActiveIdx(null)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={48} /></button>
           <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 w-full aspect-video md:aspect-square bg-neutral-900 overflow-hidden border border-white/10">
                 <img src={data.cases[activeIdx].img} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h3 className="text-4xl font-bold text-[#D4AF37] mb-6">{data.cases[activeIdx].title}</h3>
                 <p className="text-xl text-white/70 leading-relaxed whitespace-pre-line">{data.cases[activeIdx].desc}</p>
              </div>
           </div>
        </div>
      )}

      <section className="py-40 bg-black h-[800px] overflow-hidden relative flex flex-col items-center border-y border-[#D4AF37]/10">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
          <div className="animate-scroll-up flex flex-col items-center w-full">
              {[...data.credits, ...data.credits, ...data.credits].map((group, idx) => (
                  <div key={idx} className="mb-32 text-center">
                      <h3 className="text-4xl font-cinzel text-[#D4AF37] mb-12 tracking-[0.3em]">{group.year}</h3>
                      {group.items.map((item, i) => <p key={i} className="text-2xl md:text-3xl text-white/80 font-light mb-6 tracking-wide">{item}</p>)}
                  </div>
              ))}
          </div>
      </section>

      <section className="py-32 px-4 bg-[#00050D]">
        <div className="max-w-4xl mx-auto bg-white/5 p-12 md:p-20 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <h2 className="text-4xl font-cinzel text-white text-center mb-16">CONSULTATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
             <div className="text-center md:text-left">
                <p className="text-white/40 text-sm mb-2">REPRESENTATIVE</p>
                <p className="text-3xl text-white font-bold">{data.contact.mainPhone}</p>
             </div>
             <div className="text-center md:text-left">
                <p className="text-white/40 text-sm mb-2">24/7 EMERGENCY</p>
                <p className="text-3xl text-gold-gradient font-bold">{data.contact.emergencyPhone}</p>
             </div>
          </div>
          <div className="space-y-6">
             <input type="text" className="w-full bg-black/40 border border-white/10 p-5 text-white outline-none focus:border-[#D4AF37] transition-all" placeholder="의뢰인 성함" />
             <textarea className="w-full bg-black/40 border border-white/10 p-5 text-white h-40 outline-none focus:border-[#D4AF37] transition-all" placeholder="문의 내용을 입력하세요"></textarea>
             <button onClick={() => window.location.href = `sms:${data.contact.emergencyPhone}`} className="w-full py-6 bg-gradient-to-r from-[#D4AF37] to-[#BF9B30] text-black font-black text-xl tracking-widest hover:brightness-110 transition-all uppercase">메시지 즉시 발송</button>
          </div>
        </div>
      </section>

      <footer className="py-20 px-8 bg-black border-t border-white/10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
               <div className="flex items-center gap-6 mb-6 justify-center md:justify-start">
                  <h2 className="text-3xl font-cinzel text-gold-gradient font-black">ACE GUARD</h2>
                  <button onClick={() => setIsAuth(true)} className="text-white/5 hover:text-[#D4AF37] transition-colors"><Settings size={18}/></button>
               </div>
               <p className="text-white/30 text-xs leading-loose">대표: {data.contact.owner} | 사업자번호: {data.contact.businessReg} | 본사: {data.contact.address}<br/>© 2025 ACE GUARD PREMIUM SECURITY. ALL RIGHTS RESERVED.</p>
            </div>
            <div className="flex gap-10">
               <a href="https://www.instagram.com/ace._.guard" className="text-white/20 hover:text-[#D4AF37] transition-all hover:scale-125"><Instagram size={32}/></a>
               <a href="https://www.youtube.com/channel/UCEYQhbuqHRtzSl-l-NKhF2Q" className="text-white/20 hover:text-[#D4AF37] transition-all hover:scale-125"><Youtube size={32}/></a>
            </div>
         </div>
      </footer>

      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-6">
        <button onClick={() => window.location.href = `sms:${data.contact.emergencyPhone}`} className="bg-[#D4AF37] text-black w-16 h-16 rounded-full shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><Phone size={28}/></button>
        <button onClick={() => window.open('https://pf.kakao.com/_jDrEG', '_blank')} className="bg-[#FEE500] text-black w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><MessageSquare size={28} fill="currentColor"/></button>
      </div>
    </div>
  );
}
