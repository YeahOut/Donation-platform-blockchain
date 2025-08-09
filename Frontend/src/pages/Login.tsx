import StatusBar from '../components/StatusBar';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-[390px] px-6">
      <StatusBar />
      {/* 상단 여백 */}
      <div className="h-[60px]" />

      {/* 타이틀 중앙 정렬 */}
      <div className="text-center">
        <h1 className="text-[34px] font-extrabold leading-[40px] tracking-[-0.2px]">아이디/비밀번호</h1>
        <p className="mt-2 text-[14px] text-[#9FA6AE]">비밀번호를 입력해주세요.</p>
      </div>

      {/* 입력 그룹 */}
      <div className="mt-10 rounded-xl border border-stroke">
        <div className="flex items-center gap-3 px-4 py-4">
          <img
            src="/img/ic-user.png"
            alt="user"
            className="h-5 w-5 object-contain"
            onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}
          />
          <input
            placeholder="아이디 입력"
            className="w-full bg-transparent text-[16px] placeholder:text-[#A1A7AE] outline-none"
          />
        </div>
        <div className="h-px bg-divider" />
        <div className="flex items-center gap-3 px-4 py-4">
          <img
            src="/img/ic-lock.png"
            alt="lock"
            className="h-5 w-5 object-contain"
            onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}
          />
          <input
            placeholder="영문자, 숫자, 특수문자 혼용(8~15자)"
            className="w-full bg-transparent text-[16px] placeholder:text-[#A1A7AE] outline-none"
          />
        </div>
      </div>

      {/* 로그인 버튼 */}
      <button
        className="mt-5 w-full rounded-xl bg-primary py-3 text-[16px] font-semibold text-white active:bg-[#0f8ee0]"
        onClick={() => navigate('/points')}
      >
        로그인
      </button>

      {/* 링크 */}
      <div className="mt-3 flex justify-center gap-3 text-[12px] text-grayText">
        <span>아이디 찾기</span>
        <span className="text-divider">|</span>
        <span>비밀번호 재등록</span>
      </div>

      {/* 하단 CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 mx-auto max-w-[390px] px-6 pb-[28px] pt-10">
        <div className="pointer-events-auto text-center">
          <button className="text-[15px] font-medium text-primary">다른 방법으로 로그인 &gt;</button>
        </div>
      </div>
    </div>
  );
}


