

const QuickActions: React.FC<{ onNew: () => void; onAll: () => void }> = ({ onNew, onAll }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#efe0c8]">
      <h3 className="text-sm font-semibold text-[#463b2d] mb-2">Hızlı Eylemler</h3>
      <div className="flex flex-col gap-2">
        <button onClick={onNew} className="w-full px-3 py-2 rounded-md bg-[#f6e3d0] text-sm text-[#5e5346]">Yeni Anı</button>
        <button onClick={onAll} className="w-full text-center px-3 py-2 rounded-md bg-white border border-[#efe0c8] text-sm text-[#5e5346]">Tüm Anılar</button>
      </div>
    </div>
  );
};

export default QuickActions;