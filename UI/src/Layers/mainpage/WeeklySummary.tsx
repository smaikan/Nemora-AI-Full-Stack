

const WeeklySummary: React.FC<{ summary: { count: number; avgMood: number; highlight: string } }> = ({ summary }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-[#efe0c8]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#463b2d]">Haftanın Özeti</h2>
        <div className="text-xs text-[#5e5346]/70">Kısa bakış</div>
      </div>

      <p className="text-sm text-[#5e5346]/80 leading-relaxed">{summary.highlight}</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="p-3 bg-[#fff7ea] rounded-md text-center">
          <div className="text-xs text-[#5e5346]/70">En iyi gün</div>
          <div className="text-sm font-semibold text-[#463b2d] mt-1">Çarş.</div>
        </div>
        <div className="p-3 bg-[#f6e3d0] rounded-md text-center">
          <div className="text-xs text-[#5e5346]/70">Ortalama</div>
          <div className="text-sm font-semibold text-[#463b2d] mt-1">{summary.avgMood}</div>
        </div>
        <div className="p-3 bg-[#fffaf5] rounded-md text-center">
          <div className="text-xs text-[#5e5346]/70">Girişler</div>
          <div className="text-sm font-semibold text-[#463b2d] mt-1">{summary.count}</div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;