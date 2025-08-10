import { useEffect, useState } from 'react';
import StatusBar from '../components/StatusBar';
import TopHeader from '../components/TopHeader';
import { fetchStats } from '../store/auth';

export default function DonatePoints() {
  const [amount, setAmount] = useState(1000);
  const [stats, setStats] = useState<{ totalAmount: number; totalDonors: number } | null>(null);
  useEffect(() => {
    fetchStats().then(setStats).catch(()=>{});
  }, []);
  return (
    <div className="mx-auto max-w-[390px] pb-24">
      <StatusBar />
      <TopHeader title="포인트 기부" />

      {/* 히어로 텍스트 */}
      <div className="px-4 pt-2">
        <h2 className="text-[22px] font-extrabold leading-[30px] tracking-[-0.3px] text-[#1F2A37]">
          작은 포인트를 모아
          <br />큰 사랑을 만들어요
        </h2>
      </div>

      {/* 히어로 이미지 */}
      <div className="px-4 pt-6">
        <img src="/img/donate-hero.png" alt="donate" className="w-full rounded-xl bg-[#F7FAFD] object-contain" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
      </div>

      {/* 누적 정보 카드 */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-[#F3F7FB] p-4">
        <div>
          <div className="text-[13px] text-grayText">누적 기부금</div>
          <div className="mt-1 text-[16px] font-semibold">{(stats?.totalAmount ?? 0).toLocaleString()}P</div>
        </div>
        <div>
          <div className="text-[13px] text-grayText">누적 기부자</div>
          <div className="mt-1 text-[16px] font-semibold">{(stats?.totalDonors ?? 0).toLocaleString()} 명</div>
        </div>
      </div>

      {/* 설명 */}
      <div className="px-4 pt-6">
        <div className="text-[13px] font-semibold text-[#1A73E8]">어떻게 기부되나요?</div>
        <p className="mt-2 text-[14px] leading-6 text-[#2D3748]">
          신한은행의 특별한 <span className="text-[#1A73E8]">토큰(Token)</span>으로,
          <br />안전하고, 투명하게 기부됩니다.
        </p>
      </div>

      {/* 3가지 안내 카드 */}
      <div className="px-4 pt-3 space-y-3">
        {[
          { icon: '/img/donate-simple.png', title: '간편하게 기부할 수 있습니다.', desc: '포인트를 토큰으로 전환하면 몇 번의 클릭만으로 기부 완료! 빠르고 손쉽게 나눔에 참여할 수 있습니다.' },
          { icon: '/img/donate-safe.png', title: '안전하고 투명한 거래가 가능합니다.', desc: '모든 기부 내역은 블록체인에 기록되어 누구나 확인 가능. 중간 과정의 생략탓에 안전하고 신뢰할 수 있습니다.' },
          { icon: '/img/donate-impact.png', title: '기부 효과를 극대화합니다.', desc: '토큰 기부는 처리 비용을 줄여 더 많은 금액이 실제 기부처에 전달됩니다.' },
        ].map((c) => (
          <div key={c.title} className="flex items-start gap-3 rounded-2xl border border-[#E6EBF0] bg-white p-4">
            <img src={c.icon} alt="icon" className="h-8 w-8 object-contain" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
            <div>
              <div className="text-[15px] font-semibold text-[#1F2A37]">{c.title}</div>
              <div className="mt-1 text-[13px] leading-5 text-[#4A5568]">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 CTA */}
      <div className="fixed bottom-8 left-1/2 w-full max-w-[390px] -translate-x-1/2 px-4">
        <button
          className="w-full rounded-xl bg-[#1977F3] py-3 text-[16px] font-semibold text-white shadow active:bg-[#166ad6]"
          onClick={() => window.history.pushState({}, '', '/convert') || window.dispatchEvent(new PopStateEvent('popstate'))}
        >
          포인트 기부하기
        </button>
      </div>
    </div>
  );
}


