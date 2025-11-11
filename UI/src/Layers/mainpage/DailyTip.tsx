import { Link } from "react-router-dom";

type Summary = {
  count: number;
  avgMood?: number;
  highlight?: string;
};

const DailyTip: React.FC<{ summary: Summary; onWrite: () => void }> = ({ summary, onWrite }) => {
  return (
    <div className="bg-white dark:bg-panel-dark rounded-xl p-5 shadow-sm border border-edge-tertiary dark:border-edge-dark-secondary">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-content-primary dark:text-content-dark-primary">Günün Kısa Tavsiyesi</h2>
        <div className="text-xs text-content-secondary/70 dark:text-content-dark-secondary/70">AI önerisi (yakında)</div>
      </div>

      <div className="p-4 bg-panel-alt3 dark:bg-panel-dark-alt rounded-md border border-edge-secondary dark:border-edge-dark-secondary">
        <p className="text-sm text-content-secondary/80 dark:text-content-dark-secondary/80">
          {summary.count > 0
            ? "Bugün kısa bir yürüyüş yapmayı deneyin — önceki girişleriniz rahatlatıcı etkinliklerin ruh halinizi olumlu etkiledi."
            : "Günlük yazmaya başlamak için kısa bir cümleyle bugün ne hissettiğinizi yazın."}
        </p>

        <div className="mt-3 flex gap-2">
          <button onClick={onWrite} className="px-3 py-1 rounded-md bg-panel-alt2 dark:bg-interactive-dark text-sm text-content-secondary dark:text-content-dark-secondary hover:shadow-sm transition">
            Yeni Anı Yaz
          </button>
          <Link to="/memories" className="px-3 py-1 rounded-md bg-white dark:bg-panel-dark border border-edge-tertiary dark:border-edge-dark-secondary text-sm text-content-secondary dark:text-content-dark-secondary">
            Anılarımı Gör
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DailyTip;