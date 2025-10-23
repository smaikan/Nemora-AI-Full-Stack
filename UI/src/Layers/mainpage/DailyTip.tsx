import { Link } from "react-router-dom";

type Summary = {
  count: number;
  avgMood?: number;
  highlight?: string;
};

const DailyTip: React.FC<{ summary: Summary; onWrite: () => void }> = ({ summary, onWrite }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-[#efe0c8]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#463b2d]">Günün Kısa Tavsiyesi</h2>
        <div className="text-xs text-[#5e5346]/70">AI önerisi (yakında)</div>
      </div>

      <div className="p-4 bg-[#fffefc] rounded-md border border-[#f0e6d4]">
        <p className="text-sm text-[#5e5346]/80">
          {summary.count > 0
            ? "Bugün kısa bir yürüyüş yapmayı deneyin — önceki girişleriniz rahatlatıcı etkinliklerin ruh halinizi olumlu etkiledi."
            : "Günlük yazmaya başlamak için kısa bir cümleyle bugün ne hissettiğinizi yazın."}
        </p>

        <div className="mt-3 flex gap-2">
          <button onClick={onWrite} className="px-3 py-1 rounded-md bg-[#f6e3d0] text-sm text-[#5e5346] hover:shadow-sm transition">
            Yeni Anı Yaz
          </button>
          <Link to="/memories" className="px-3 py-1 rounded-md bg-white border border-[#efe0c8] text-sm text-[#5e5346]">
            Anılarımı Gör
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DailyTip;