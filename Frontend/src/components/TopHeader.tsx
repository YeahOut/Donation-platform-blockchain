import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  onBack?: () => void;
  onHome?: () => void;
};

export default function TopHeader({ title, onBack, onHome }: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) return onBack();
    navigate(-1);
  };

  const handleHome = () => {
    if (onHome) return onHome();
    navigate('/points');
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <img
          src="/img/hdr-back.png"
          alt="back"
          className="w-[10px] h-[14px] cursor-pointer"
          onClick={handleBack}
        />
        <span className="text-[18px] font-semibold tracking-tight">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <img
          src="/img/hdr-home.png"
          alt="home"
          className="h-5 w-5 cursor-pointer"
          onClick={handleHome}
          onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}
        />
        <img src="/img/hdr-noti.png" alt="noti" className="h-5 w-5" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
        <img src="/img/hdr-chat.png" alt="chat" className="h-5 w-5" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
      </div>
    </div>
  );
}


