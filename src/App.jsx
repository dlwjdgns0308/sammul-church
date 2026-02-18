import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Mail, Clock, Calendar, 
  Users, BookOpen, Heart, ChevronRight, Youtube, 
  Baby, Sun, Music, Coffee, Car, Camera, Star, Quote, ArrowRight, ChevronDown
} from 'lucide-react';

// --- Global Styles ---
const GlobalStyles = () => (
  <style>{`
    /* Noto Sans KR만 가져오기 (300:Light, 400:Regular, 500:Medium, 700:Bold, 900:Black) */
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
    
    body {
      font-family: 'Noto Sans KR', sans-serif;
      word-break: keep-all;
      background-color: #fff;
      overflow-x: hidden;
      color: #111;
    }
    
    /* 폰트 통일 */
    .font-sans-kr {
      font-family: 'Noto Sans KR', sans-serif;
      letter-spacing: -0.02em;
    }
    
    .font-serif-kr {
      font-family: 'Noto Sans KR', sans-serif; /* 요청대로 고딕 통일 */
      letter-spacing: -0.03em;
    }
    
    .fade-in {
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* 드롭다운 메뉴 스타일 */
    .dropdown-menu {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease-in-out;
    }
    
    .group:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  `}</style>
);

// --- Full Width Image Component ---
const FullWidthImage = ({ src, alt, caption }) => {
  const [error, setError] = useState(false);
  return (
    <div className="w-full mb-12 fade-in">
      <img 
        src={error ? `https://placehold.co/1920x1080/e2e8f0/64748b?text=${encodeURIComponent(alt)}` : src}
        alt={alt}
        className="w-full h-auto object-cover block"
        style={{ minHeight: '300px', maxHeight: '90vh' }}
        onError={() => setError(true)}
      />
      {caption && (
        <div className="bg-gray-50 py-3 text-center border-b border-gray-100">
          <p className="text-gray-600 text-sm font-sans-kr px-4 font-bold">{caption}</p>
        </div>
      )}
    </div>
  );
};

// --- Page Header ---
const PageHeader = ({ title, subtitle, image }) => (
  <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-gray-900">
    <img 
      src={image} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover opacity-60"
      onError={(e) => { e.target.src = `https://placehold.co/1920x1080/333/999?text=${subtitle}`; }}
    />
    <div className="relative z-10 text-center text-white px-4 fade-in">
      <span className="block text-blue-300 font-bold tracking-[0.2em] text-sm md:text-base mb-3 uppercase font-sans-kr">{subtitle}</span>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg font-sans-kr">{title}</h1>
    </div>
  </div>
);

// --- Menu Data Structure ---
const MENU_STRUCTURE = {
  home: { label: '홈', sub: [] },
  about: { 
    label: '교회소개', 
    sub: [
      { id: 'history', label: '교회역사' },
      { id: 'pastor', label: '담임목사' },
      { id: 'vision', label: '비전' },
      { id: 'people', label: '섬기는이' },
      { id: 'recommend', label: '추천사' }
    ]
  },
  worship: { label: '예배안내', sub: [] },
  community: { 
    label: '공동체', 
    sub: [
      { id: 'village', label: '마을' },
      { id: 'ranch', label: '목장' },
      { id: 'groups', label: '부서(다음세대)' },
      { id: 'gallery', label: '행사 갤러리' }
    ] 
  },
  training: { label: '양육과 훈련', sub: [] },
  location: { label: '오시는 길', sub: [] }
};

// --- Navigation Component ---
const Navigation = ({ activeMain, onNavigate, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 h-20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center cursor-pointer gap-3" onClick={() => onNavigate('home')}>
          {/* 대한예수교장로회 로고 이미지 (logo.png) */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="/images/logo.jpg" 
              alt="교회 로고" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none'; // 이미지가 없으면 숨김
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 tracking-[0.2em] font-sans-kr font-bold">대한예수교장로회</span>
            <span className="text-xl font-bold text-gray-900 tracking-tight font-sans-kr">의정부 샘물교회</span>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8 h-full">
          {Object.entries(MENU_STRUCTURE).map(([key, value]) => (
            <div key={key} className="relative group h-full flex items-center">
              <button
                onClick={() => onNavigate(key)}
                className={`px-4 py-2 text-sm font-bold transition-all duration-300 flex items-center gap-1 font-sans-kr ${
                  activeMain === key ? 'text-blue-900' : 'text-gray-500 group-hover:text-blue-900'
                }`}
              >
                {value.label}
                {value.sub.length > 0 && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
              </button>
              
              {/* Dropdown Content */}
              {value.sub.length > 0 && (
                <div className="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl rounded-b-xl border-t-2 border-blue-900 z-50 overflow-hidden">
                  <div className="py-2">
                    {value.sub.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(key, subItem.id);
                        }}
                        className="block w-full text-left px-6 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-900 font-sans-kr transition-colors"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t absolute w-full shadow-xl z-50 max-h-[80vh] overflow-y-auto">
          {Object.entries(MENU_STRUCTURE).map(([key, value]) => (
            <div key={key} className="border-b border-gray-50">
              <button
                onClick={() => {
                  if (value.sub.length === 0) {
                    onNavigate(key);
                    setMobileMenuOpen(false);
                  }
                }}
                className={`w-full text-left px-6 py-4 font-bold font-sans-kr flex justify-between items-center ${
                  activeMain === key ? 'text-blue-900 bg-blue-50' : 'text-gray-900'
                }`}
              >
                {value.label}
              </button>
              {value.sub.length > 0 && (
                <div className="bg-gray-50">
                  {value.sub.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        onNavigate(key, subItem.id);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-10 py-3 text-sm text-gray-600 border-l-4 border-transparent hover:border-blue-600 hover:text-blue-900 font-sans-kr"
                    >
                      - {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="bg-gray-900 text-white py-16 font-sans-kr">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 border-b border-gray-800 pb-12 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">의정부 샘물교회</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            말씀이 샘솟는 교회, 성도의 어머니 같은 교회.<br/>
            하나님의 사랑으로 세상을 섬기는 공동체입니다.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <Mail size={16} className="mr-2" /> zzchan@naver.com
          </div>
        </div>
        <div className="text-sm text-gray-400 space-y-2">
          <p><strong className="text-white">본당:</strong> 경기도 의정부시 용민로 122번길 49</p>
          <p><strong className="text-white">비전센터:</strong> 경기도 의정부시 용현로 158 한영빌딩 4층</p>
          <div className="pt-4">
             <a href="https://www.youtube.com/@2000sammul" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white transition">
               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white"><Youtube size={16} /></div>
               Youtube 채널 바로가기
             </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Uijeongbu Sammul Church. All rights reserved.
      </div>
    </div>
  </footer>
);

// ================= PAGES =================

// 1. HOME
const HomeContent = ({ onNavigate }) => (
  <div className="bg-white fade-in">
    <div className="relative h-[90vh] w-full overflow-hidden bg-black">
      <img src="/images/main_banner.jpg" alt="Main Banner" className="absolute inset-0 w-full h-full object-cover opacity-80" 
           onError={(e) => { e.target.src = 'https://placehold.co/1920x1080/222/fff?text=Main+Banner'; }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/30">
        <span className="text-blue-300 font-bold tracking-[0.3em] text-sm md:text-base mb-6 animate-pulse font-sans-kr">WELCOME TO</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight font-sans-kr">
          말씀이 샘솟는<br/>샘물교회
        </h1>
        <p className="text-gray-200 text-xl md:text-2xl font-light mb-12 font-sans-kr">"교회는 성도의 어머니입니다"</p>
        <div className="flex flex-col md:flex-row gap-4 font-sans-kr">
          <button onClick={() => onNavigate('worship')} className="bg-white text-blue-900 px-10 py-5 font-bold text-base tracking-widest hover:bg-gray-100 transition shadow-lg">예배시간 안내</button>
          <button onClick={() => onNavigate('location')} className="border-2 border-white text-white px-10 py-5 font-bold text-base tracking-widest hover:bg-white hover:text-blue-900 transition">오시는 길</button>
        </div>
      </div>
    </div>
    
    <div className="w-full bg-blue-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white text-blue-900 p-3 rounded-full"><Youtube size={24} /></div>
          <div><span className="block text-blue-300 text-xs font-bold mb-1 font-sans-kr">LATEST SERMON</span><h2 className="text-xl font-bold font-sans-kr">금주 주일 설교 말씀</h2></div>
        </div>
        <a href="https://www.youtube.com/@2000sammul" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold border-b border-transparent hover:border-white transition pb-1 font-sans-kr">영상 보러가기 <ArrowRight size={16} /></a>
      </div>
    </div>
  </div>
);

// 2. ABOUT
const AboutContent = ({ subPage }) => {
  const renderSubPage = () => {
    switch(subPage) {
      case 'history':
        return (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
             <div className="mb-24 text-center max-w-3xl mx-auto">
               <h2 className="text-3xl font-bold mb-6 font-sans-kr">샘물교회의 역사</h2>
               <p className="text-gray-600 leading-relaxed font-sans-kr">
                 1994년 첫 삽을 뜬 이후, 하나님께서 샘물교회를 어떻게 인도하셨는지 그 은혜의 발자취를 소개합니다.
               </p>
             </div>
             {/* 1994 */}
             <div className="mb-24">
               <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                 <div className="md:w-1/3">
                   <span className="text-5xl font-bold text-gray-200 block mb-2 font-sans-kr">1994</span>
                   <h3 className="text-2xl font-bold font-sans-kr">교회 부지 매입</h3>
                 </div>
                 <div className="md:w-2/3">
                   <p className="text-gray-600 text-lg font-sans-kr">1994년 4월 교회 부지를 매입하며 믿음의 첫 삽을 떴습니다.</p>
                 </div>
               </div>
               <FullWidthImage src="/images/history_1994.jpg" alt="첫삽" caption="1994년 4월 교회 부지 매입 및 첫 삽" />
             </div>
             {/* 2000 */}
             <div className="mb-24">
               <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                 <div className="md:w-1/3">
                   <span className="text-5xl font-bold text-gray-200 block mb-2 font-sans-kr">2000</span>
                   <h3 className="text-2xl font-bold font-sans-kr">교회 개척 및 입당</h3>
                 </div>
                 <div className="md:w-2/3 space-y-4">
                   <p className="text-gray-600 text-lg font-sans-kr">
                     샘물교회는 2000년 1월 8일 <strong>故손경헌 목사님</strong>이 경기도 의정부시 민락동 699-6 에 개척하여 세우신 교회(대한 예수교 장로회 합동)입니다.
                   </p>
                   <div className="bg-gray-50 p-6 border-l-4 border-blue-900 italic text-gray-700 font-sans-kr">
                     "교회가 교회답게 교회 모습을 드러내기 위해서는 피로 사신 교회로서 그 생명을 드러내는 것입니다.
                     하나님이 저에게 허락하신 양들을 단 한 사람이 되었든 백 명이든 천명이 되었든 허락한 만큼 바른 양심을 따라 목회하기를 원합니다."
                   </div>
                   <p className="text-gray-600 font-sans-kr">
                     손경헌 목사님은 말씀, 가정, 이웃, 어린이를 소중히 하는 교회의 4가지 비전을 가지고 교회를 세워가셨고, 
                     그 비전은 샘물교회의 영적인 기초가 되었습니다.
                   </p>
                   <ul className="list-disc pl-5 text-gray-600 font-sans-kr">
                     <li><strong>말씀:</strong> 교회를 세우는 뿌리와 기초</li>
                     <li><strong>가정과 이웃:</strong> 가정과 이웃을 소중히 여기고 섬김으로 신앙과 삶이 일치됨</li>
                     <li><strong>어린이:</strong> 아이들에게 심기어진 복음은 평생토록 열매를 맺음</li>
                   </ul>
                 </div>
               </div>
               <FullWidthImage src="/images/history_2000.jpg" alt="입당예배" caption="2000년 1월 8일 입당예배" />
             </div>
             {/* Growth */}
             <div className="mb-24 bg-gray-50 py-16 px-4 -mx-4 md:-mx-8 lg:-mx-16">
               <h3 className="text-3xl font-bold text-center mb-8 font-sans-kr">은혜 가운데 성장</h3>
               <p className="text-center text-gray-600 mb-12 font-sans-kr">개척된 교회는 은혜 가운데 건강하게 성장하였습니다.</p>
               <div className="max-w-5xl mx-auto space-y-16">
                   <div>
                       <FullWidthImage src="/images/history_growth_kids_1.jpg" alt="주일학교1" caption="주일학교 활동" />
                       <FullWidthImage src="/images/history_growth_kids_2.jpg" alt="주일학교2" />
                   </div>
                   <div>
                       <FullWidthImage src="/images/history_growth_youth_1.jpg" alt="청소년부1" caption="청소년부 활동" />
                       <FullWidthImage src="/images/history_growth_youth_2.jpg" alt="청소년부2" />
                       <FullWidthImage src="/images/history_growth_youth_3.jpg" alt="청소년부3" />
                   </div>
                   <div>
                       <FullWidthImage src="/images/history_growth_young_1.jpg" alt="청년부1" caption="청년부 활동" />
                       <FullWidthImage src="/images/history_growth_young_2.jpg" alt="청년부2" />
                   </div>
                   <div>
                       <FullWidthImage src="/images/history_growth_women_1.jpg" alt="여전도회1" caption="여전도회 활동" />
                       <FullWidthImage src="/images/history_growth_women_2.jpg" alt="여전도회2" />
                   </div>
                   <div>
                       <FullWidthImage src="/images/history_growth_men_1.jpg" alt="남전도회1" caption="남전도회 활동" />
                       <FullWidthImage src="/images/history_growth_men_2.jpg" alt="남전도회2" />
                   </div>
                   <div>
                       <FullWidthImage src="/images/history_growth_ordination_1.jpg" alt="임직식1" caption="임직식" />
                       <FullWidthImage src="/images/history_growth_ordination_2.jpg" alt="임직식2" />
                   </div>
                   <div>
                       <FullWidthImage src="/images/history_growth_all.jpg" alt="전체사진" caption="전교인 전체사진" />
                   </div>
               </div>
             </div>
             {/* 2022 */}
             <div className="mb-24">
               <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                  <div className="md:w-1/3">
                    <span className="text-5xl font-bold text-gray-300 block mb-2 font-sans-kr">2022</span>
                    <h3 className="text-2xl font-bold font-sans-kr">1대 목사 소천</h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-600 text-lg mb-4 font-sans-kr">
                      손경헌 목사님은 개척하신 이후 하나님께서 맡기신 사명을 21년 동안 잘 감당하시고 2022년 4월 1일 병환으로 소천하셨습니다.
                    </p>
                    <a href="https://www.youtube.com/watch?v=RR10KcR7V6A" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline font-sans-kr">▶ 추모 영상 보기</a>
                  </div>
               </div>
               <FullWidthImage src="/images/history_rev_son.jpg" alt="손경헌 목사님" />
             </div>
             {/* 2023 */}
             <div className="mb-24">
               <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                 <div className="md:w-1/3">
                   <span className="text-5xl font-bold text-gray-200 block mb-2 font-sans-kr">2023</span>
                   <h3 className="text-2xl font-bold font-sans-kr">2대 목사청빙</h3>
                 </div>
                 <div className="md:w-2/3">
                   <p className="text-gray-600 text-lg font-sans-kr">
                     1대 목사님의 소천 이후, 샘물교회 성도들은 2대 목사님을 청빙 하기 위해 기도하며 하나님의 인도하심을 구했습니다.
                     2022년 12월 안양석수교회에서 사역하던 김찬이 목사를 2대 담임목사로 청빙합니다.
                   </p>
                   <p className="text-gray-600 text-lg font-sans-kr mt-4">
                     2023년 1월부터 김찬이 목사님이 2대 담임목사로 사역을 시작하셨습니다. 
                     김찬이 목사님은 선대목사님(故 손경헌)의 목회철학을 이어받아 말씀 중심으로 사역을 시작하였고, 
                     23년 연말 샘물교회 4대 제자 비전인 
                     <strong> 1) 경건한 예배자 2) 주님의 몸 된 공동체 3) 쓰임 받는 일꾼 4) 복음 전도자</strong> 를 선포하였습니다.
                   </p>
                 </div>
               </div>
               <div className="space-y-4">
                 <FullWidthImage src="/images/history_new_pastor_1.jpg" alt="청빙1" caption="2대 목사 취임 감사예배" />
                 <FullWidthImage src="/images/history_new_pastor_2.jpg" alt="청빙2" />
                 <FullWidthImage src="/images/history_new_pastor_3.jpg" alt="청빙3" />
                 <FullWidthImage src="/images/history_new_pastor_4.jpg" alt="청빙4" />
               </div>
             </div>
             {/* 2025 */}
             <div>
               <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                 <div className="md:w-1/3">
                   <span className="text-5xl font-bold text-gray-200 block mb-2 font-sans-kr">2025</span>
                   <h3 className="text-2xl font-bold font-sans-kr">비전센터 완공</h3>
                 </div>
                 <div className="md:w-2/3">
                   <p className="text-gray-600 text-lg font-sans-kr">
                     25년 9월에는 샘물교회 미래와 다음세대를 위해 필요한 새로운 공간인 비전센터를 마련하게 됩니다. 
                     샘물교회는 비전센터를 통해 새롭게 일하실 하나님 기대하며 믿음을 달려가고 있습니다.
                   </p>
                 </div>
               </div>
               <FullWidthImage src="/images/vision_center_2025.jpg" alt="비전센터 완공" />
             </div>
          </div>
        );
      case 'pastor':
        return (
          <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-sans-kr">담임목사 소개</h2>
              <p className="text-xl font-bold text-blue-900 font-sans-kr">김찬이 목사</p>
              <p className="text-gray-500 mt-2 font-sans-kr">총신대학원 신학석사 (M.Div) / 일반대학원 조직신학 석사 (Th.M)</p>
            </div>
            <FullWidthImage src="/images/pastor_profile.jpg" alt="김찬이 목사님" caption="김찬이 담임목사" />
            <div className="prose prose-lg text-gray-700 leading-loose max-w-none text-justify space-y-12 font-sans-kr">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 font-sans-kr">어린 시절과 회심</h3>
                <p>
                  저는 1978년 울산에서 태어났습니다. 부모님께서는 저에게 빛날 찬(燦)에 두 이(貳)자를 써서 이름을 지으셨습니다. 
                  저는 6살 때 형님 친구의 전도로 부산 가야제일교회에서 신앙생활을 하였지만 오래가지 못하고 초2 때 교회를 떠났습니다. 
                  그러다가 청소년 시절을 보내면서 저는 인생이 허무하게 느껴졌고 삶의 의미를 찾을 수가 없었습니다. 
                  고통스러운 방황 끝에 저는 본능적으로 어릴 때 다녔던 교회로 고1 때 돌아왔습니다. 
                  그리고 고3이 되던 1996년 어느 겨울, 가야제일교회 청소년부 실에서 기도 중에, 하나님을 인격적으로 뜨겁게 만났습니다. 
                  인생의 방황이 끝나는 순간이었습니다.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 font-sans-kr">영적 방황과 신학 수업</h3>
                <p>
                  저는 하나님을 인격적으로 뜨겁게 만났지만, 체계적인 신앙생활을 교육받은 적이 없었습니다. 
                  인생의 방황이 끝난 저를 기다리고 있던 것은, 축복 된 신앙생활이 아니라 영적인 방황이었습니다. 
                  그때 저를 영적으로 방황하게 만들었던 질문은 
                </p>
                <ul className="list-decimal pl-5 bg-gray-50 p-6 rounded-lg my-4">
                  <li>하나님을 체험적으로 만났는데 이후, 어떻게 그 만남을 지속할 것인가?</li>
                  <li>사람이 태어날 때부터 죄인으로 태어났다면 죄를 지는 것은 어쩔 수 없는 것인데, 왜 죄에 대해 심판을 받아야 하는가?</li>
                  <li>한번 받은 구원은 흔들리지 않는가?</li>
                </ul>
                <p>
                  다른 크리스찬들이 쉽게 넘어가는 것 같은 이 문제들이 저에게는 풀리지 않는 수학 난제(難題)처럼 다가왔습니다. 
                  답을 주실 것 같은 분들에게 물어보았지만, 속 시원하게 가르쳐 주는 이가 없었습니다. 
                  그래서 혼자 고민할 수밖에 없었습니다. 그때 신앙의 방황은 청소년 시절 예수님을 모를 때 인생의 방황보다 더 힘들었습니다. 
                  저는 깊은 영적 침체를 경험하였습니다. 그러나 저는 그 방황의 끝에서 복음을 깨닫게 되었고 신앙생활의 원리도 깨닫게 되었습니다. 
                  신앙의 방황이 끝나는 순간이었습니다.
                </p>
                <p className="mt-4">
                  신앙생활에 방황이 끝나자, 하고 싶은 일이 있었습니다. 바로 목회자가 되는 것이었습니다. 
                  하지만 바로 신학교로 가지는 않았습니다. ‘목회자가 되어야 한다’는 내적인 부르심은 있었지만, ‘목회자가 될만한 자질이 있는가?’라는 외적 확신이 없었기 때문입니다. 
                  저는 외적 확신을 기대하며 가야제일 교회 청년부 회장직을 섬겼습니다. 저와 청년부 임원들은 오직 기도로 하나님을 전적으로 의지하는 사역을 하였습니다. 
                  그 시간을 통해 저는 하나님께서 함께 하시는 사역이 어떤 것인지 깨달았고 사역의 열매를 경험했습니다. 
                  세월이 지났지만, 그때의 깨달음과 경험은 지금의 사역을 이끌어가는 중요한 원리가 되었습니다.
                </p>
                <p className="mt-4">
                  목회자로 내적, 외적 부르심을 확인한 저는 2008년 총신대학원에 입학하여 신학 공부(M.Div, 목회학석사)를 하였습니다. 
                  총신 신대원 과정은 축복의 시간이었습니다. 3년의 공부 시간은 꿀송이를 먹는 것과 같은 즐거운 시간이었습니다. 
                  신학공부를 통해 저의 체험적인 신앙이, 말씀에 기반을 둔 신앙으로 성장할 수 있었습니다. 
                  신학을 하면서 새롭게 깨닫고 놀라게 된 것이 있었습니다. 바로 개혁주의 신학의 깊이와 넓이였습니다. 
                  저는 개혁주의 신학 안에 성도들을 영적으로 부유하고 영광스럽게 만드는 영적 광맥이 있음을 깨달았습니다. 
                  저는 제가 방황하던 시절에 깨달은 복음을 역사적이고 정통적인 개혁주의 교리 안에서 더욱 체계적으로 이해하게 되었습니다. 
                  복음이 더욱 깊이 깨달아지자 하나님의 사랑의 깊이와 넓이를 경험하게 되었습니다. 복음의 영광과 능력이 무엇인지도 알게 되었습니다.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 font-sans-kr">소명과 비전</h3>
                <p>
                  이후 하나님께서 이 복음을 체계적으로 가르치는 사역에 대한 비전을 주셨습니다. 
                  그러면서 <strong>이 시대 한국교회에 가장 필요한 사역이 다시 하나님의 말씀을 바로 읽고 공부하고 묵상하는 것</strong>임을 깨닫게 하셨습니다. 
                  그리고 그 깨달음은 저의 사명이자 비전이 되었습니다.
                </p>
                <p>
                  저는 이 비전을 실현하기 위해 학업이 더 필요함을 깨닫고 2019년 총신대학원 일반대학원에서 조직식학(Th.M, 신학석사)공부를 하였습니다. 
                  조직신학을 전문적으로 공부하면서 지식적으로 학적으로 더 성장하는 은혜와 축복을 경험했습니다. 
                  이때부터 직접 교재를 만들어 성도들에게 교리를 직접 가르치기 시작했고 풍성한 은혜를 경험하였습니다.
                </p>
                <p>
                  안양 석수교회에서 복음과 말씀을 가르치면서 하나님의 주신 비전으로 마음이 채워지고 있을 때, 
                  하나님께서는 2023년 말씀 중심의 화목하고 따듯한 샘물교회로 저를 인도하셨습니다. 
                  그리고 지금은 샘물교회 성도들과 함께 이 말씀 사역의 비전을 향해 함께 달려가고 있습니다. 
                  가족으로는 부인 정은미 사모와 찬송, 지유, 예솔 세 딸과 함께 행복하게 살고 있습니다.
                </p>
              </div>
            </div>
          </div>
        );
      case 'vision':
        return (
          <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
            <div className="mb-24">
              <span className="text-blue-600 font-bold tracking-widest block mb-4 text-center font-sans-kr">CORE VALUE 01</span>
              <h2 className="text-4xl font-bold text-center mb-8 font-sans-kr">4대 제자 비전</h2>
              <div className="prose prose-lg text-gray-700 mx-auto text-center mb-12 font-sans-kr">
                <p>
                  저는 신학대학원을 다니던 2008년 서울 주사랑교회 청년부 사역을 시작으로, 본격적인 교회사역을 시작하였습니다. 
                  이후에도 청년부 부서 사역을 하다가, 2015년 안양석수교회에서 장년 사역을 8년 동안 지속하였습니다. 
                  부교역자 사역을 하면서 기도하며 고민하며 배워갔던 것이 있습니다.
                </p>
                <div className="bg-gray-100 p-6 rounded-lg text-left my-6 space-y-2 text-sm">
                   <p>a. 교회는 어떻게 성도를 보호하고 교육하고 성장시켜야 하는가?</p>
                   <p>b. 교회는 성도에게 어떤 공동체가 되어야 하는가?</p>
                   <p>c. 목회자는 성도와 어떤 관계를 맺어야 하는가?</p>
                   <p>d. 목회자는 성도를 어떻게 도와야 하는가?</p>
                </div>
                <p>
                  이러한 고민 들은 통해 깨닫게 된 중요한 사실은 칼빈이 했던 말 <strong>“교회는 성도의 어머니다.”</strong>라는 말과 일맥상통합니다. 이 깨달음을 글로 적어봅니다.
                </p>
                <div className="bg-blue-50 p-8 rounded-lg my-6 text-left">
                  <h4 className="text-xl font-bold mb-4 font-sans-kr">교회는 성도의 어머니</h4>
                  <p>
                    아이가 어머니 없이 자랄 수 없듯이, 
                    성도는 혼자서는 성장하는 신앙생활을 할 수가 없습니다. 
                    우리가 어머니를 통해 태어나고 
                    사랑과 보호 가운데 자라듯이 
                    성도는 좋은 교회에 뿌리를 내리고, 
                    목회자의 기도를 받고 성도들과 교제하며 자라야 합니다. 
                    우리가 어머니가 해주는 밥을 먹고 자라듯이 
                    성도는 목회자가 전해주는 말씀을 듣고 배워야 합니다. 
                    어른이 된 자녀가 어머니를 보호하고 섬기듯이  
                    장성한 성도는 교회를 사랑하고 섬깁니다.
                  </p>
                </div>
                <p>결국, 아이가 어머니의 사랑과 교육을 통해 성장하듯이 성도는 교회라는 공동체를 통해 예수님의 제자로 세워져야 합니다, 이러한 깨달음을 바탕으로 23년 연말 샘물교회 4대 제자 비전을 선포하였습니다.</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {['경건한 예배자', '주님의 몸 된 공동체', '쓰임 받는 일꾼', '복음 전도자'].map((v, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow border-t-4 border-blue-900 text-center">
                    <span className="text-3xl font-black text-gray-100 block mb-2 font-sans-kr">0{i+1}</span>
                    <span className="text-lg font-bold text-gray-800 font-sans-kr">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 text-white p-12 rounded-2xl">
              <span className="text-blue-300 font-bold tracking-widest block mb-4 font-sans-kr">CORE VALUE 02</span>
              <h2 className="text-3xl font-bold mb-8 font-sans-kr">4대 교회 비전</h2>
              <div className="grid md:grid-cols-1 gap-8">
                <div className="prose prose-invert text-gray-300 font-sans-kr">
                  <p>
                    하나님은 신학을 통해 복음을 깊이 이해하고, 사역을 통해 성도와 교회에 대한 눈이 조금씩 열리도록 인도해주셨습니다. 
                    그때 즈음에 저의 눈에 새롭게 들어온 영역이 있습니다. 바로 한국교회사와 믿음의 선조들입니다.
                  </p>
                  <ul className="list-none pl-0 space-y-6 my-6">
                    <li className="bg-white/10 p-6 rounded-lg">
                      <strong className="block text-white mb-2 text-xl font-sans-kr">신사참배와 주기철 목사님</strong>
                      주기철 목사님과 오정모사모님, 평양산정현교회, 순교한 아들 주영진 전도사님과 김덕성 사모님, 북한에 살아 있을 것으로 추정되는 손자 주수현에 대한 이야기는 지금도 생각만 하면 가슴이 뜨거워지는 역사입니다.
                      <br/>
                      <a href="https://www.youtube.com/live/JldEPid7VnU?si=fkdNBMNmXKGpd189" target="_blank" rel="noreferrer" className="text-blue-300 text-sm mt-2 inline-block hover:underline">▶ 주기철 목사님에 대한 설교 보기</a>
                    </li>
                    <li className="bg-white/10 p-6 rounded-lg">
                      <strong className="block text-white mb-2 text-xl font-sans-kr">6.25와 손양원 목사님</strong>
                      아들 동인,동일을 죽인 김재선을 아들을 삼고 6.25때 공산당이 오는 것을 알고도 나환자촌 애양원을 떠나지 않으면서 순교한 이야기! 
                      “그리스도교는 잘 사는 것이 목표인 종교가 아니라 잘 죽는 것이 목표인 종교”라는 목사님의 말씀은 하나님 앞에 나의 삶을 멈추고 돌아보게 하는 역사였습니다.
                      <br/>
                      <a href="https://www.youtube.com/live/0O29xmcS1eE?si=2JTo6HX4VQjR-kcR" target="_blank" rel="noreferrer" className="text-blue-300 text-sm mt-2 inline-block hover:underline">▶ 손양원 목사님에 대한 설교 보기</a>
                    </li>
                  </ul>
                  <p>
                    믿음의 선배들이 하나님과 함께 써 내려간 아름다운 역사를 추적해보니, 조선에 자신의 인생을 아낌없이 드린 선교사님들의 삶이 보이기 시작했습니다. 
                    우리가 잘 아는 언더우드, 사무엘 모펫 선교사님뿐만 아니라, 짧은 시간 선교사로 살고 하나님께 부름을 받았지만, 
                    ”나에게 천개의 생명이 있다면 다 조선을 위해 드리겠다.” 고 고백한 루비 켄드릭으로부터, 
                    전라도 작은 섬까지 가서 교회를 세우다가 순교한 오웬 선교사에서, 
                    당시 조선인도 돌을 던지고 외면한 버려진 나환자를 말에 태우고 자신은 걸어갔던 포사이드 선교사까지 
                    그분들의 삶은 다니엘12:3절의 말씀과 같이 영원토록 빛나고 있었습니다.
                  </p>
                  <p>
                    조선 시대 처음 복음이 들어온 시점부터, 한국교회 부흥의 시기였던 70년대를 지나, 현대 대한민국에 이르기까지 기독교 역사를 공부해보면 한 가지 의문이 듭니다. 
                    ‘하나님은 왜 이 민족을 이렇게 사랑하실까?’ 이 질문을 생각하면 우리 민족이 하나님께 받은 사랑에 응답해야 할 사명이 있음을 깨닫게 됩니다. 
                    그리고 이 사명을 이루기 위해 한국교회에 주신 비전이 있음을 깨닫게 됩니다.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 border-t border-gray-700 pt-6">
                  {['민족 복음화', '통일 한국', '선교 한국', '거룩한 대한민국'].map((v, i) => (
                    <div key={i} className="flex items-center text-lg font-bold font-sans-kr">
                      <div className="w-2 h-2 bg-blue-500 mr-3"></div>{v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'people':
        return (
          <div className="max-w-5xl mx-auto px-4 py-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-16 font-sans-kr">섬기는 분들</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
               {[{ role: '담임목사', name: '김찬이', sub: 'zzchan@naver.com' }, { role: '시무장로', name: '이범세' }, { role: '전도사 (청소년부)', name: '김지선' }, { role: '간사 (청년부)', name: '김성민, 손하영' }].map((p, i) => (
                 <div key={i} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                   <Users size={32} className="mx-auto mb-4 text-gray-400" />
                   <p className="text-blue-600 text-xs font-bold mb-2 font-sans-kr">{p.role}</p>
                   <h4 className="text-xl font-bold font-sans-kr">{p.name}</h4>
                   {p.sub && <p className="text-xs text-gray-500 mt-2 font-sans-kr">{p.sub}</p>}
                 </div>
               ))}
            </div>
            <div className="mt-16">
              <FullWidthImage src="/images/history_growth_all.jpg" alt="전교인" caption="전교인 단체사진" />
            </div>
          </div>
        );
      case 'recommend':
        return (
          <div className="max-w-4xl mx-auto px-4 py-16 grid gap-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8 font-sans-kr">추천사</h2>
            {[
              { name: "김찬곤 목사", role: "안양석수교회", sub: "(총회세계선교회(GMS), 교회갱신협의회 증경이사장)", text: "할렐루야! 오랜 시간 동안 함께 동역했던 김찬이 목사님이 샘물교회에 담임목사로 섬기게 됨을 기쁘고 감사하게 생각합니다. 김찬이 목사님은 2014년부터 안양 석수교회에서 부목사로 섬기며 저와 함께 동역하면서 훈련받은 준비된 목회자입니다. 열정적이고 도전적이며 교회와 성도를 사랑하며, 특별히 성경 말씀을 바르고 분명하게 잘 가르치는 목회자입니다. 하나님께서 그동안 잘 훈련 시키셨다가 이제 샘물교회 담임목사로 세우셨는데 그동안 함께하신 것처럼 샘물교회에서도 은혜와 축복으로 함께 하실 줄 믿습니다. 또 샘물교회 성도들이 목사님과 함께 지역을 살리고 많은 영혼을 구원하고 하나님 나라 확장에 크게 쓰임 받으시길 기도하고 축복합니다.", link: "https://www.youtube.com/watch?v=aQEMx7bfCtw" },
              { name: "이규현 목사", role: "은혜의 동산교회", sub: "(은혜의동산기독교학교 이사장, CTCK 이사)", text: "영상 첨부" },
              { name: "김광이 목사", role: "기쁨의 동산교회", text: "김찬이 목사님을 샘물교회 위임목사로 인도하신 하나님께 감사드립니다. 김찬이 목사님은 저와 함께 오랫동안 함께 연합사역을 하면서 동역한 목사님이십니다. 옆에서 본 김찬이 목사님은 충성스럽고 열정적이며 또 지속해서 연구하고 노력하는 목사님입니다. 이러한 목사님을 하나님께서는 늘 새롭게 사용하시는 모습을 옆에서 보았습니다. 그래서 앞으로의 사역도 기대가 됩니다. 금번에 하나님의 놀라운 섭리로 김찬이 목사님이 의정부 지역에 샘물교회로 인도하셨습니다. 하나님께서 목사님과 샘물교회를 축복하셔서 교회를 더욱 건강하고 든든하게 세워주시고 축복하실 줄 믿습니다." },
              { name: "김경수 목사", role: "주 사랑교회", text: "영상링크" }
            ].map((rec, i) => (
              <div key={i} className="bg-white p-10 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <Quote className="text-blue-100 w-10 h-10 flex-shrink-0" />
                  <div>
                    <h4 className="text-2xl font-bold font-sans-kr">{rec.name}</h4>
                    <p className="text-sm text-blue-600 font-bold font-sans-kr">{rec.role}</p>
                  </div>
                </div>
                {rec.sub && <p className="text-xs text-gray-500 mb-4 font-sans-kr">{rec.sub}</p>}
                
                {rec.text.includes("영상") ? (
                  <div className="bg-gray-100 w-full h-48 flex items-center justify-center text-gray-400 rounded-lg font-sans-kr">[ {rec.text} ]</div>
                ) : (
                  <p className="text-gray-700 leading-relaxed font-sans-kr">{rec.text}</p>
                )}
                
                {rec.link && <a href={rec.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center text-blue-600 underline font-sans-kr font-bold text-sm"><Youtube size={16} className="mr-2"/> 위임 권면 영상 보기</a>}
              </div>
            ))}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white font-sans-kr">
      <PageHeader title="교회 소개" subtitle="ABOUT US" image="/images/history_2000.jpg" />
      {/* 서브 페이지 콘텐츠 렌더링 */}
      {renderSubPage()}
    </div>
  );
};

// 3. WORSHIP (Single Page)
const WorshipContent = () => (
  <div className="bg-white font-sans-kr fade-in">
    <PageHeader title="예배 안내" subtitle="WORSHIP" image="/images/worship_sunday.jpg" />
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6 font-sans-kr">예배 안내</h2>
        <a href="https://www.youtube.com/@2000sammul" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline font-sans-kr">▶ 온라인 예배 바로가기 (YouTube)</a>
      </div>
      
      <div className="space-y-16">
         <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 font-sans-kr">주일예배</h3>
            <p className="text-lg mb-2 font-sans-kr">1부예배: 주일 오전 9시 (비전센터)</p>
            <p className="text-lg mb-2 font-sans-kr">2부예배: 주일 오전 11시 (본당 3층)</p>
            <p className="text-lg mb-2 font-sans-kr">청소년부 예배: 주일 오전 11시 (비전센터)</p>
            <p className="text-lg mb-2 font-sans-kr">초등부 예배: 주일 오전 11시 (1층)</p>
            <p className="text-lg mb-6 font-sans-kr">유치부 예배: 주일 오전 11시 (1층)</p>
            <FullWidthImage src="/images/worship_sunday.jpg" alt="주일예배" />
         </div>
         <div className="text-center border-t border-gray-200 pt-16">
            <h3 className="text-2xl font-bold mb-4 font-sans-kr">수요예배</h3>
            <p className="text-lg font-sans-kr">수요일 오전 11시 (비전센터)</p>
         </div>
         <div className="text-center border-t border-gray-200 pt-16">
            <h3 className="text-2xl font-bold mb-4 font-sans-kr">금요기도회</h3>
            <p className="text-lg font-sans-kr">금요일 오후 8시 30분 (본당 3층)</p>
         </div>
         <div className="text-center border-t border-gray-200 pt-16">
            <h3 className="text-2xl font-bold mb-4 font-sans-kr">새벽예배</h3>
            <p className="text-lg font-sans-kr">화-금 오전 5시 30분 (본당 1층)</p>
         </div>
      </div>
    </div>
  </div>
);

// 4. COMMUNITY (Sub-pages)
const CommunityContent = ({ subPage }) => {
  const renderSubPage = () => {
    switch(subPage) {
      case 'village':
        return (
          <div className="max-w-5xl mx-auto px-4 py-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8 font-sans-kr">마을</h2>
            <div className="prose prose-lg text-gray-700 mx-auto text-center mb-16 font-sans-kr">
              <p>
                예전에는 한 마을에 이웃으로 살던 사람들과 함께 삶을 공유하는 공동체 문화가 있었습니다. 하지만 지금은 한아파트 옆 동에 누가 사는지 모르는 개인주의 시대를 살고 있습니다. 교회에서도 많은 사람이 모여도 실제적인 교제를 나누는 사람들은 소수일 때가 많습니다. 샘물교회의 마을은 30~50명 정도가 모이는 공동체로서 함께 신앙생활 하며 서로 돌아보고 삶을 공유하는 실질적인 공동체입니다.
              </p>
            </div>
            {/* 마을 전체 사진 2장 */}
            <FullWidthImage src="/images/village_all_1.jpg" alt="마을 전체모임1" caption="마을 전체 모임" />
            <FullWidthImage src="/images/village_all_2.jpg" alt="마을 전체모임2" />
            
            <div className="mt-24 space-y-16">
               <div>
                  <h4 className="text-2xl font-bold text-center mb-6 font-sans-kr">은혜마을</h4>
                  <FullWidthImage src="/images/village_grace.jpg" alt="은혜마을" />
               </div>
               <div>
                  <h4 className="text-2xl font-bold text-center mb-6 font-sans-kr">샘물마을</h4>
                  <FullWidthImage src="/images/village_sammul.jpg" alt="샘물마을" />
               </div>
               <div>
                  <h4 className="text-2xl font-bold text-center mb-6 font-sans-kr">부부마을</h4>
                  <FullWidthImage src="/images/village_couple.jpg" alt="부부마을" />
               </div>
            </div>
          </div>
        );
      case 'ranch':
        return (
          <div className="max-w-4xl mx-auto px-4 py-32 text-center animate-fade-in">
            <Users size={64} className="mx-auto text-blue-900 mb-8" />
            <h2 className="text-4xl font-bold mb-8 font-sans-kr">목장</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-sans-kr">
              우리 교회 가장 작은 공동체로 예배 후 함께 소그룹을 모임을 통해 말씀과 삶을 나눕니다.
            </p>
          </div>
        );
      case 'groups':
        return (
          <div className="max-w-5xl mx-auto px-4 py-16 animate-fade-in">
            <div className="mb-32">
               <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4 font-sans-kr">청년</h3>
                  <p className="text-gray-500 font-sans-kr">소그룹 모임: 주일 오후 1시 30분, 청년 양육반: 주일 오후 3시</p>
               </div>
               <FullWidthImage src="/images/community_young_1.jpg" alt="청년부1" caption="청년부 활동" />
               <FullWidthImage src="/images/community_young_2.jpg" alt="청년부2" />
            </div>
            <div className="mb-32">
               <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4 font-sans-kr">청소년</h3>
                  <p className="text-gray-500 font-sans-kr">청소년부 예배 주일 오전 11시 비전센터</p>
               </div>
               <FullWidthImage src="/images/community_youth.jpg" alt="청소년부" />
            </div>
            <div>
               <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4 font-sans-kr">주일학교</h3>
                  <p className="text-gray-500 font-sans-kr">주일학교 예배 주일 오전 11시 본당 1층</p>
               </div>
               <FullWidthImage src="/images/community_kids.jpg" alt="주일학교" />
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="max-w-5xl mx-auto px-4 py-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-16 font-sans-kr">행사사진</h2>
            <div className="space-y-24">
              <div>
                <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-900 pl-4 font-sans-kr">학습세례식</h3>
                <FullWidthImage src="/images/event_baptism_1.jpg" alt="세례1" />
                <FullWidthImage src="/images/event_baptism_2.jpg" alt="세례2" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-900 pl-4 font-sans-kr">25년 추수감사 성경퀴즈대회</h3>
                <FullWidthImage src="/images/event_quiz_all_1.jpg" alt="퀴즈전체1" />
                <FullWidthImage src="/images/event_quiz_all_2.jpg" alt="퀴즈전체2" />
                <FullWidthImage src="/images/event_quiz_1st.jpg" alt="1등" caption="1등: 은혜마을(남)" />
                <FullWidthImage src="/images/event_quiz_2nd.jpg" alt="2등" caption="2등: 은혜마을(여)" />
                <FullWidthImage src="/images/event_quiz_3rd.jpg" alt="3등" caption="3등: 샘물마을(여)" />
                <FullWidthImage src="/images/event_quiz_golden.jpg" alt="골든벨" caption="개인 골든벨 우승자" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-900 pl-4 font-sans-kr">11월 비전센터 완공</h3>
                <FullWidthImage src="/images/vision_seminar_1.jpg" alt="세미나1" caption="세미나실" />
                <FullWidthImage src="/images/vision_seminar_2.jpg" alt="세미나2" />
                <FullWidthImage src="/images/vision_seminar_3.jpg" alt="세미나3" />
                <FullWidthImage src="/images/vision_lobby.jpg" alt="로비" caption="카페 로비" />
                <FullWidthImage src="/images/vision_nursery_1.jpg" alt="유아실1" caption="유아실" />
                <FullWidthImage src="/images/vision_nursery_2.jpg" alt="유아실2" />
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white font-sans-kr">
      <PageHeader title="공동체" subtitle="COMMUNITY" image="/images/village_all_1.jpg" />
      {renderSubPage()}
    </div>
  );
};

// 5. TRAINING
const TrainingContent = ({ subPage }) => {
  return (
    <div className="bg-white font-sans-kr animate-fade-in">
      <PageHeader title="양육과 훈련" subtitle="TRAINING" image="/images/training_basic.jpg" />
      
      <div className="max-w-4xl mx-auto px-4 py-24 space-y-24">
        {/* 1. 기본 양육 과정 */}
        <div>
           <div className="flex items-end gap-4 border-b-2 border-black pb-4 mb-8">
               <span className="text-6xl font-bold text-gray-200 leading-none">01</span>
               <h3 className="text-2xl font-bold text-black pb-1 font-sans-kr">기본 양육 과정</h3>
           </div>
           <FullWidthImage src="/images/training_basic.jpg" alt="기본양육" />
           <ul className="list-disc pl-5 space-y-4 text-lg text-gray-700 mt-8 font-sans-kr">
             <li><strong>새가족 교육(5주):</strong> 새 가족으로 기본적인 신앙생활과 교회 생활을 어떻게 해야 하는지를 배웁니다.</li>
             <li><strong>복음의 기초(8주):</strong> 영광스러운 복음을 깊이 있고 체계적으로 배웁니다.</li>
             <li><strong>크리스찬의 5대 확신(5주):</strong> 복음을 아는 성도를 넘어 확신과 믿음으로 살아가는 성도의 삶을 배웁니다.</li>
           </ul>
        </div>

        {/* 2. 하나님과 교제 하는 방법 */}
        <div>
          <div className="flex items-end gap-4 border-b-2 border-black pb-4 mb-8">
               <span className="text-6xl font-bold text-gray-200 leading-none">02</span>
               <h3 className="text-2xl font-bold text-black pb-1 font-sans-kr">하나님과 교제 하는 방법</h3>
           </div>
          <p className="text-gray-700 mb-8 text-lg font-sans-kr">
            구원받은 자녀는 하나님과 교제하는 법을 배워야 합니다. 하나님의 뜻을 말씀을 통해 어떻게 분별하는지 묵상훈련을 통해서 배웁니다. 
            또 기도훈련을 통해 성도가 어떻게 하나님의 공급하심을 받고 살아가는지를 교육 받습니다.
          </p>
          <ul className="space-y-2 text-lg text-gray-700 font-bold font-sans-kr">
            <li>묵상훈련(4주)</li>
            <li>기도훈련(4주)</li>
          </ul>
        </div>

        {/* 3. 성경 읽기와 묵상 */}
        <div>
          <div className="flex items-end gap-4 border-b-2 border-black pb-4 mb-8">
               <span className="text-6xl font-bold text-gray-200 leading-none">03</span>
               <h3 className="text-2xl font-bold text-black pb-1 font-sans-kr">성경 읽기와 묵상</h3>
           </div>
          <p className="text-gray-700 mb-8 text-lg font-sans-kr">
            샘물교회는 말씀사역의 비전에 따라, 성경읽기와 큐티 사역에 힘쓰고 있습니다.
            성경읽기는 리딩지저스 읽기 프로그램을 따라 공동체가 함께 읽어가고 있고 또 함께 잘 읽어갈 수 있도록 통독반을 운영하고 있습니다.
          </p>
          <p className="text-gray-700 text-lg font-sans-kr">
            큐티사역은 김찬이 목사님이 직접 만든 <strong>은혜의 샘물 큐티집</strong>으로 묵상하고 있습니다. 
            묵상에 대한 정기적인 훈련을 통해 묵상하는 법을 배우고 함께 나누는 모임을 진행합니다.
          </p>
          <a href="https://www.readingjesus.net/main/" target="_blank" rel="noreferrer" className="text-blue-600 underline mt-4 block font-sans-kr">▶ 리딩지저스 바로가기</a>
        </div>

        {/* 4. 그리스도인의 가정생활 */}
        <div>
          <div className="flex items-end gap-4 border-b-2 border-black pb-4 mb-8">
               <span className="text-6xl font-bold text-gray-200 leading-none">04</span>
               <h3 className="text-2xl font-bold text-black pb-1 font-sans-kr">그리스도인의 가정생활</h3>
           </div>
          <p className="text-gray-700 text-lg font-sans-kr">
             성경적인 가정생활을 배움으로 결혼 예비학교의 교육뿐만 아니라, 결혼 생활에서 일어나는 많은 갈등을 해결하는 지침과 교육을 제공합니다. 
             또 부모가 성경적인 자녀교육을 어떻게 해야하는지를 배웁니다. (10주)
          </p>
        </div>

        {/* 5. 기독교 교리와 성경공부 */}
        <div>
          <div className="flex items-end gap-4 border-b-2 border-black pb-4 mb-8">
               <span className="text-6xl font-bold text-gray-200 leading-none">05</span>
               <h3 className="text-2xl font-bold text-black pb-1 font-sans-kr">기독교 교리와 성경공부</h3>
           </div>
          <p className="text-gray-700 text-lg font-sans-kr">
             말씀 사역의 비전에 따라 2년 동안 매주 수요일 오후 7시 30분 개혁주의 교리특강 진행하였습니다. 
             또 성경 66권을 한 권씩 공부하며 배웠습니다. 성도가 유투브 자료를 통해 개인학습을 하도록 코칭합니다. 
             또 추가적인 교육을 통해 배울 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

// 6. LOCATION
const LocationContent = () => (
  <div className="fade-in">
    <PageHeader title="오시는 길" subtitle="LOCATION" image="/images/map_main.jpg" />
    <div className="max-w-5xl mx-auto px-4 py-24 space-y-16">
      
      {/* 2. 새가족 안내 */}
      <div className="bg-blue-50 p-10 rounded-xl border border-blue-100">
        <h3 className="text-2xl font-bold mb-6 text-blue-900 font-sans-kr">새 가족 안내</h3>
        <ol className="space-y-4 text-lg text-gray-700 font-sans-kr list-decimal pl-5">
          <li>교회 처음 오실 분들은 안내자를 따라 예배 안내를 하시고 KT 건물에 주차하신 경우, 안내자에게 말씀해 주세요</li>
          <li>2부 예배 후에는 풍성한 식사가 준비되어 있습니다. 처음 와서 낯설지만, 식사를 함께하면서 성도의 교제를 나누기를 원합니다.</li>
          <li>등록을 원하시는 경우, 안내팀에게 말씀해 주세요</li>
          <li>새 가족 교육(5주)을 받고, 마을 중 그룹과 목장 소그룹에 소속됩니다.</li>
        </ol>
      </div>

      {/* 3. 오시는 길 */}
      <div>
        <h3 className="text-2xl font-bold mb-6 font-sans-kr">오시는 길</h3>
        <div className="mb-12">
           <h4 className="text-xl font-bold mb-2 font-sans-kr">교회주소</h4>
           <p className="text-lg text-gray-700 mb-2 font-sans-kr">경기도 의정부시 용민로 122번길 49 (본건물)</p>
           <FullWidthImage src="/images/map_main.jpg" alt="본당 지도" />
           <p className="text-lg text-gray-700 mb-2 mt-8 font-sans-kr">경기도 의정부시 용현로 158 한영빌딩 4층 (비전센터)</p>
           <FullWidthImage src="/images/map_vision.jpg" alt="비전센터 지도" />
        </div>
        <div>
           <h4 className="text-xl font-bold mb-2 font-sans-kr">지하철 이용</h4>
           <p className="text-lg text-gray-700 font-sans-kr">송산역 2번 출구 =&#62; 송산2동 주민센터 방향으로 이동 =&#62; 노브랜드있는 골목으로 걸어오시면 됩니다</p>
        </div>
      </div>

      {/* 4. 주차 안내 */}
      <div className="bg-gray-50 p-10 rounded-xl border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 font-sans-kr">주차 안내</h3>
        <ul className="space-y-4 text-lg text-gray-700 font-sans-kr">
           <li>1) 교회 정문으로 오시면 주차 지역을 안내해 드립니다.</li>
           <li>2) 비전센터(한영 빌딩 지상, 지하주차장, 경기 의정부시 용현로 158)에 주차하셔도 됩니다.</li>
           <li>3) 교회 옆 kt 동의정부 지점 (의정부시 용현로 168)에 주차하시면 2시간 주차비 지원해드립니다.</li>
        </ul>
      </div>
    </div>
  </div>
);

// === MAIN APP ===
const App = () => {
  const [activeMain, setActiveMain] = useState('home');
  const [activeSub, setActiveSub] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeMain, activeSub]);

  const handleNavigate = (main, sub = '') => {
    setActiveMain(main);
    // 대메뉴 클릭 시 서브메뉴가 있다면 첫 번째 서브메뉴를 기본값으로 설정
    if (!sub && MENU_STRUCTURE[main].sub.length > 0) {
      setActiveSub(MENU_STRUCTURE[main].sub[0].id);
    } else {
      setActiveSub(sub);
    }
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeMain) {
      case 'home': return <HomeContent onNavigate={handleNavigate} />;
      case 'about': return <AboutContent subPage={activeSub} />;
      case 'worship': return <WorshipContent />;
      case 'community': return <CommunityContent subPage={activeSub} />;
      case 'training': return <TrainingContent subPage={activeSub} />;
      case 'location': return <LocationContent />;
      default: return <HomeContent onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-900">
      <GlobalStyles />
      <Navigation 
        activeMain={activeMain}
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="w-full">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;