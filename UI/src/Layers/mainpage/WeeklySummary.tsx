

const WeeklySummary: React.FC<{ summary: { count: number; avgMood: number; highlight: string } }> = ({ summary }) => {
  return (
    <div className="bg-white dark:bg-panel-dark rounded-xl p-5 shadow-sm border border-edge-tertiary dark:border-edge-dark-secondary">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-content-primary dark:text-content-dark-primary">Kısa bakış</h2>
        
      </div>

      <p className="text-sm text-content-secondary/80 dark:text-content-dark-secondary/80 leading-relaxed">{summary.highlight}</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="p-3 bg-panel-alt dark:bg-panel-dark-alt rounded-md text-center">
          <div className="text-xs text-content-secondary/70 dark:text-content-dark-secondary/70">En iyi gün</div>
          <div className="text-sm font-semibold text-content-primary dark:text-content-dark-primary mt-1">Çarş.</div>
        </div>
        <div className="p-3 bg-panel-alt2 dark:bg-panel-dark-alt rounded-md text-center">
          <div className="text-xs text-content-secondary/70 dark:text-content-dark-secondary/70">Ortalama</div>
          <div className="text-sm font-semibold text-content-primary dark:text-content-dark-primary mt-1">{summary.avgMood}</div>
        </div>
        <div className="p-3 bg-panel-alt3 dark:bg-panel-dark-alt rounded-md text-center">
          <div className="text-xs text-content-secondary/70 dark:text-content-dark-secondary/70">Girişler</div>
          <div className="text-sm font-semibold text-content-primary dark:text-content-dark-primary mt-1">{summary.count}</div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;