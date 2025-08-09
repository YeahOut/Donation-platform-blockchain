import StatusBar from '../components/StatusBar';
import TopHeader from '../components/TopHeader';
type Action = {
  key: string;
  label: string;
  img: string; // public/img 경로 기준
  badge?: 'N';
  wrapCircle?: boolean; // true면 원형 배경 안, false면 원 없이 이미지 그대로
};

// 제공한 이미지처럼 일부는 자체 원형을 포함하므로 wrapCircle=false가 자연스러움
const actions: Action[] = [
  { key: 'deposit', label: '계좌입금', img: '/img/ic-deposit.png', wrapCircle: false },
  { key: 'atm', label: 'ATM출금', img: '/img/ic-atm.png', wrapCircle: false },
  { key: 'gift', label: '포인트\n선물', img: '/img/ic-gift.png', wrapCircle: false },
  { key: 'saving', label: '예/적금\n가입', img: '/img/ic-saving.png', wrapCircle: false },
  { key: 'mini-insurance', label: '미니보험\n가입', img: '/img/ic-mini-insurance.png', badge: 'N', wrapCircle: false },
  { key: 'shopping', label: '포인트\n쇼핑', img: '/img/ic-shopping.png', badge: 'N', wrapCircle: false },
  { key: 'donate', label: '기부하기', img: '/img/ic-donate.png', badge: 'N', wrapCircle: false },
];

export default function Points() {
  const name = '몰리';
  const myPoint = '1000P';
  const goTo = (path: string) => {
    window.history.pushState({}, '', path);
    // Programmatic navigation for SPA: dispatch a popstate for react-router
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="mx-auto max-w-[390px] pb-20">
      {/* 상단 상태바 + 헤더 */}
      <StatusBar />
      <TopHeader title="포인트" />

      {/* 배너 */}
      <div className="mx-4 mt-3 overflow-hidden rounded-2xl bg-gradient-to-b from-[#E9F5FF] to-white">
        <div className="flex items-start justify-between px-4 py-6">
          <div className="max-w-[220px]">
            <p className="text-[22px] font-extrabold leading-[30px] tracking-[-0.3px] text-[#1F2A37]">
              {name} 님의
              <br />마이신한포인트는
              <br />{myPoint}입니다.
            </p>
          </div>
          <img
            src="/img/points-hero.png"
            alt="포인트 배너"
            className="h-24 w-28 object-contain"
            onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}
          />
        </div>
      </div>

      {/* 탭 */}
      <div className="mt-4 flex border-b border-divider px-4 text-[15px]">
        <button className="relative w-1/2 py-3 text-grayText">포인트 조회</button>
        <button className="relative w-1/2 py-3 font-semibold text-[#111] after:absolute after:bottom-0 after:left-1/4 after:h-[2px] after:w-1/2 after:bg-[#111]">포인트 사용</button>
      </div>

      {/* 섹션 타이틀 */}
      <div className="px-4 pt-4">
        <h2 className="text-[18px] font-semibold">포인트 사용하기</h2>
      </div>

      {/* 액션 그리드 */}
      <div className="grid grid-cols-3 gap-5 px-4 py-4">
        {actions.map((a) => (
          <div
            key={a.key}
            className="relative rounded-2xl border border-[#E9EEF5] bg-white px-5 py-4 text-center shadow-[0_1px_4px_rgba(31,42,55,0.04)]"
            onClick={() => {
              if (a.key === 'donate') goTo('/donate');
            }}
          >
            {a.badge === 'N' && (
              <span className="absolute right-2 top-2 rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">N</span>
            )}
            {a.wrapCircle ? (
              <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F8FB]">
                <img
                  src={a.img}
                  alt={a.label}
                  className="h-12 w-12 object-contain"
                  onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}
                />
              </div>
            ) : (
              <img
                src={a.img}
                alt={a.label}
                className="mx-auto mb-2 h-20 w-20 object-contain"
                onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}
              />
            )}
            <div className="mt-0.5 text-[14px] font-medium leading-tight text-[#1F2A37]">
              {a.label.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


