

const QuickActions: React.FC<{ onNew: () => void; onAll: () => void }> = ({ onNew, onAll }) => {
  return (
    <div className="bg-white dark:bg-panel-dark rounded-xl p-4 shadow-sm border border-edge-tertiary dark:border-edge-dark-secondary">
      <h3 className="text-sm font-semibold text-content-primary dark:text-content-dark-primary mb-2">Hızlı Eylemler</h3>
      <div className="flex flex-col gap-2">
        <button onClick={onNew} className="w-full px-3 py-2 rounded-md bg-panel-alt2 dark:bg-interactive-dark text-sm text-content-secondary dark:text-content-dark-secondary">Yeni Anı</button>
        <button onClick={onAll} className="w-full text-center px-3 py-2 rounded-md bg-white dark:bg-panel-dark border border-edge-tertiary dark:border-edge-dark-secondary text-sm text-content-secondary dark:text-content-dark-secondary">Tüm Anılar</button>
      </div>
    </div>
  );
};

export default QuickActions;