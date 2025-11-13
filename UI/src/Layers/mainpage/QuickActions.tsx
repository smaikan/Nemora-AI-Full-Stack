

const QuickActions: React.FC<{ onNew: () => void; onAll: () => void }> = ({ onNew, onAll }) => {
  return (
    <div className="bg-panel dark:bg-panel-dark-alt rounded-xl p-4 shadow-sm border border-edge-tertiary dark:border-edge-dark-primary">
      <h3 className="text-sm font-semibold text-content-primary dark:text-content-dark-primary mb-2">Hızlı Eylemler</h3>
      <div className="flex flex-col gap-2">
        <button onClick={onNew} className="w-full px-3 py-2 rounded-md cursor-pointer bg-edge-secondary dark:bg-interactive-dark text-sm text-content-secondary dark:text-content-dark-secondary">Yeni Anı</button>
        <button onClick={onAll} className="w-full text-center px-3 py-2 cursor-pointer bg-panel-alt rounded-md dark:bg-panel-dark-alt border border-edge-tertiary dark:border-edge-dark-primary text-sm text-content-secondary dark:text-content-dark-secondary">Tüm Anılar</button>
      </div>
    </div>
  );
};

export default QuickActions;