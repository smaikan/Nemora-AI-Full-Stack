
type props = {
  Memory:
  {memoryId: number;
  memoryCreateDate: string;
  memoryText: string | null;
  userId?: number;
  memoryUpdateDate?: string | null;
  memoryMood?: number | null;
  memorySummary?: string | null;}[],
  points: [number,Date][];
  range: string;
};

const MoodChart: React.FC<props> = ({Memory, points, range }) => {
  const max = 9;

   if (!Memory || Memory.length === 0) {
    return <div className="p-2 rounded-lg bg-red-200"> Analiz edilecek sayfa bulunamadı. Lütfen günlüğünüze sayfa ekleyin.</div>;
  }
console.log(12, points)
  return (
    <div className="w-full h-40">
      <svg viewBox="0 0 200 83" className="w-full h-full">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-start)" />
            <stop offset="100%" stopColor="var(--color-chart-end)" />
          </linearGradient>
        </defs>
        {points.map((p, i) => {
          const x = 10 + i * (180 / points.length);
          const h = (p[0] / max) * 60;
          return (
            <g key={i}>
              <text
                x={x + 6}
                y={70 - h}
                fontSize="8"
                textAnchor="middle"
                className="font-semibold select-none fill-current text-content-secondary dark:text-content-dark-secondary"
              >
                {p[0]}
              </text>
              <rect x={x} y={75 - h} width={12} height={h} rx={3} fill="url(#g)" className="transition-all duration-200 hover:opacity-90" />
              <text
                x={x + 6}
                y={82}
                fontSize="8"
                textAnchor="middle"
                className="fill-current text-content-muted dark:text-content-dark-muted"
              >
                {i === points.length - 1 ? "Son" : range == "week" ? `${p[1].toLocaleDateString("tr-TR", { weekday: "long" })}` 
                : range == "year" ? `${p[1].toLocaleDateString("tr-TR", { month: "long" })}` : `${i+1}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default MoodChart;