import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import TopHeader from '../components/TopHeader';
import { donate, settleDonation, useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export default function ConvertPoints() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const profile = useAuthStore((s) => s.profile);
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const availablePoints = profile?.balance ?? 0;
  const [amount, setAmount] = useState<number | ''>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mx-auto max-w-[390px] pb-24">
      <StatusBar />
      <TopHeader title="포인트 기부" />

      {/* 마이 포인트 */}
      <div className="mx-4 mt-2 rounded-2xl bg-[#F4F7FB] p-4">
        <div className="text-[13px] text-grayText">마이신한포인트</div>
        <div className="mt-1 text-[26px] font-extrabold text-[#1977F3]">{availablePoints}P</div>
      </div>

      {/* 질문 */}
      <div className="px-4 pt-6">
        <h2 className="text-[20px] font-extrabold tracking-[-0.2px]">얼마나 기부할까요?</h2>
        <div className="mt-2 text-right text-[12px] text-grayText">1P씩 입력가능해요</div>
      </div>

      {/* 입력 + 퀵버튼 */}
      <div className="px-4 pt-2">
        <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-3">
          <input
            type="number"
            inputMode="numeric"
            placeholder="포인트를 입력해주세요"
            value={amount}
            onChange={(e)=> setAmount(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full outline-none"
            disabled={isLoading}
          />
          <span className="text-[16px] font-semibold text-[#4A5568]">P</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[
            { label: '+1백P', inc: 100 },
            { label: '+1천P', inc: 1000 },
            { label: '+1만P', inc: 10000 },
            { label: '전체사용', inc: 'all' as const },
          ].map((b) => (
            <button
              key={b.label}
              className="rounded-lg border border-[#E2E8F0] bg-white py-2 text-[13px] text-[#1F2A37] active:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (isLoading) return;
                if (b.inc === 'all') {
                  setAmount(availablePoints);
                } else {
                  const base = amount === '' ? 0 : amount;
                  const next = Math.min(base + b.inc, availablePoints);
                  setAmount(next);
                }
              }}
              disabled={isLoading}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pt-4">
        {error && <div className="px-1 text-[13px] text-red-600">{error}</div>}
        <button
          className="w-full rounded-xl bg-[#1977F3] py-3 text-center text-[16px] font-semibold text-white active:bg-[#166ad6] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={async () => {
            if (isLoading) return;
            if (!token) { navigate('/'); return; }
            if (amount === '' || amount <= 0) return;
            if (amount > availablePoints) return;
            
            setIsLoading(true);
            setError(null);
            try {
              const d = await donate(amount, token);
              // 즉시 성공 처리하여 통계 반영
              await settleDonation(d.donationId, 'SUCCESS', token);
              await fetchMe();
              setShowSuccess(true);
            } catch (e: any) {
              setError(e?.message || '기부에 실패했습니다.');
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '포인트 기부하기'}
        </button>
      </div>

      {/* 안내 박스 */}
      <div className="mx-4 mt-5 rounded-2xl border border-[#E6EBF0] bg-white p-4">
        <div className="text-[15px] font-semibold">포인트 기부하기 안내</div>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-6 text-[#4A5568]">
          <li>보유한 포인트를 원하는 금액만큼 토큰으로 전환하여 기부합니다.</li>
          <li>토큰 전환 후 기부가 완료되면, 해당 내역은 블록체인에 기록되어 누구나 확인할 수 있습니다.</li>
          <li>모든 기부 금액은 수수료를 최소화하여 전액 기부처에 전달됩니다.</li>
          <li>기부 취소 및 환불은 진행되지 않으니 금액을 신중히 입력해 주세요.</li>
        </ul>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[320px] rounded-2xl bg-white p-5 text-center shadow-xl">
            <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-blue-100" />
            <div className="text-[18px] font-semibold">기부 성공!</div>
            <div className="mt-1 text-[13px] text-grayText">따뜻한 나눔 감사합니다.</div>
            <button
              className="mt-4 w-full rounded-lg bg-[#1977F3] py-2.5 text-[14px] font-semibold text-white"
              onClick={() => setShowSuccess(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


