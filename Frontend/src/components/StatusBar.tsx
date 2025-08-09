type Props = {
  timeText?: string;
};

export default function StatusBar({ timeText = '9:41' }: Props) {
  return (
    <div className="flex items-center justify-between px-4 pt-3">
      <span className="text-[12px] font-semibold tracking-wider">{timeText}</span>
      <div className="flex items-center gap-2">
        <img
          src="/img/status-signal.png"
          alt="signal"
          className="h-3.5 w-5 object-contain"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        <img
          src="/img/status-wifi.png"
          alt="wifi"
          className="h-3.5 w-4 object-contain"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        <img
          src="/img/status-battery.png"
          alt="battery"
          className="h-3.5 w-6 object-contain"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>
    </div>
  );
}


