
type props = {
  Memory:
  {memoryId: number;
  memoryCreateDate: string;
  memoryText: string | null;
  userId?: number;
  memoryUpdateDate?: string | null;
  memoryMood?: number | null;
  memorySummary?: string | null;}[],
  points: number[];
};

const MoodChart: React.FC<props> = ({Memory, points }) => {
  const max = 10;

   if (!Memory || Memory.length === 0) {
    return <div className="p-2 rounded-lg bg-red-200"> Analiz edilecek sayfa bulunamadı. Lütfen günlüğünüze sayfa ekleyin.</div>;
  }

  return (
    <div className="w-full h-40">
      <svg viewBox="0 0 200 80" className="w-full h-full">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffd89b" />
            <stop offset="100%" stopColor="#f6e3d5" />
          </linearGradient>
        </defs>
        {points.map((p, i) => {
          const x = 10 + i * (180 / points.length);
          const h = (p / max) * 60;
          return (
            <g key={i}>
              <rect x={x} y={75 - h} width={12} height={h} rx={3} fill="url(#g)" className="transition-all duration-200 hover:opacity-90" />
              <text x={x + 6} y={78} fontSize="8" textAnchor="middle" fill="#66513e" className="dark:fill-text-dark-muted">
                {i === points.length - 1 ? "Şimdi" : `${i + 1}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default MoodChart;