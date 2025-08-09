import { Link } from 'react-router-dom';

export default function DonateSuccess() {
  return (
    <div className="mx-auto max-w-[390px]">
      <div className="mt-20 rounded-2xl border border-divider p-6 text-center">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100" />
        <h1 className="text-xl font-semibold">기부가 완료되었습니다</h1>
        <p className="mt-2 text-grayText">따뜻한 나눔에 감사드립니다.</p>
        <Link to="/points" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-white">포인트 보기</Link>
      </div>
    </div>
  );
}


