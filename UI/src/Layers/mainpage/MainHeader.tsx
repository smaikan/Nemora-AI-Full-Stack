
const MainHeader: React.FC = () => {
  const today = new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-content-primary dark:text-content-dark-primary">Nemora Diary</h1>
      <p className="text-sm text-content-secondary/80 dark:text-content-dark-secondary/80 mt-1">Ruh halinizi takip edin, haftalık özetinizi görün ve yapay zekâ önerilerinizi alın.</p>
      <div className="text-xs text-content-secondary/60 dark:text-content-dark-secondary/60 mt-2">{today}</div>
    </header>
  );
};

export default MainHeader;