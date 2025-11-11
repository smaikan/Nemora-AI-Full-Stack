import { useMemo, useState } from "react";
import Memory from "./Memory";

export type MemoryType = {
  memoryId: number;
  memoryCreateDate: string | Date;
  memoryMood: number;
  isFavorite: boolean;
  memorySummary?: string;
};

interface MemoriesProps {
  user?: {
    memories?: MemoryType[];
  };
}

const Memories: React.FC<MemoriesProps> = ({ user }) => {
  const memories: MemoryType[] = user?.memories ?? [];

  const [filter, setFilter] = useState<"all" | "favorite" | "positive" | "negative">("all");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null); // "YYYY-MM"
  const [openMonthBox, setOpenMonthBox] = useState<boolean>(false);

  const baseList = useMemo<MemoryType[]>(() => {
    let list = [...memories];

    if (filter === "favorite") list = list.filter((m) => m.isFavorite);
    else if (filter === "positive") list = list.filter((m) => m.memoryMood >= 6);
    else if (filter === "negative") list = list.filter((m) => m.memoryMood <= 4);

    list.sort(
      (a, b) =>
        new Date(b.memoryCreateDate).getTime() -
        new Date(a.memoryCreateDate).getTime()
    );

    return list;
  }, [memories, filter]);

  const monthOptions = useMemo<{ key: string; label: string }[]>(() => {
    const months = new Set<string>();

    baseList.forEach((m) => {
      const date = new Date(m.memoryCreateDate);
      if (isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (isNaN(year) || isNaN(month)) return;
      const key = `${year}-${month.toString().padStart(2, "0")}`;
      months.add(key);
    });

    const toLabel = (key: string): string => {
      const [year] = key.split("-");
      const label = new Date(`${key}-01`).toLocaleString("tr-TR", {
        month: "long",
      });
      return `${label.charAt(0).toLocaleUpperCase("tr-TR") + label.slice(1)} ${year}`;
    };

    return Array.from(months)
      .sort(
        (a, b) =>
          new Date(`${b}-01`).getTime() - new Date(`${a}-01`).getTime()
      )
      .map((key) => ({ key, label: toLabel(key) }));
  }, [baseList]);

  const filteredMemories = useMemo<MemoryType[]>(() => {
    if (!selectedMonth) return baseList;
    return baseList.filter((m) => {
      const d = new Date(m.memoryCreateDate);
      if (isNaN(d.getTime())) return false;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      return key === selectedMonth;
    });
  }, [baseList, selectedMonth]);

  const selectedMonthLabel: string | null =
    selectedMonth
      ? monthOptions.find((m) => m.key === selectedMonth)?.label ?? null
      : null;

  return (
    <div className="px-6 pl-8 mt-8 min-h-screen w-full">
      <div className="flex">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-content-primary dark:text-content-dark-primary">Günlüklerim</h1>
          <p className="text-sm text-content-secondary/80 dark:text-content-dark-secondary/80 mt-1">
            Tüm günlük sayfalarınızı aşağıda bulabilirsiniz.
          </p>
        </div>

        <div className="flex gap-4 self-end ml-auto mr-10 relative">
          <div
            onClick={() => {
              setFilter("all");
              setSelectedMonth(null);
            }}
            className={`bg-interactive dark:bg-interactive-dark select-none hover:bg-interactive-hover dark:hover:bg-interactive-dark-hover cursor-pointer transition-all duration-100 w-24 flex justify-center items-center rounded-lg h-10 ${
              filter === "all" ? "ring-2 ring-interactive-ring dark:ring-primary" : ""
            }`}
          >
            Tümü
          </div>

          <div
            onClick={() => {
              setFilter("favorite");
              setSelectedMonth(null);
            }}
            className={`bg-interactive dark:bg-interactive-dark select-none hover:bg-interactive-hover dark:hover:bg-interactive-dark-hover cursor-pointer transition-all duration-100 w-24 flex justify-center items-center rounded-lg h-10 ${
              filter === "favorite" ? "ring-2 ring-interactive-ring dark:ring-primary" : ""
            }`}
          >
            Favoriler
          </div>

          <div
            onClick={() => {
              setFilter("negative");
              setSelectedMonth(null);
            }}
            className={`bg-interactive dark:bg-interactive-dark select-none hover:bg-interactive-hover dark:hover:bg-interactive-dark-hover cursor-pointer transition-all duration-100 w-32 flex justify-center items-center rounded-lg h-10 ${
              filter === "negative" ? "ring-2 ring-interactive-ring dark:ring-primary" : ""
            }`}
          >
            Negatif Günler
          </div>

          <div
            onClick={() => {
              setFilter("positive");
              setSelectedMonth(null);
            }}
            className={`bg-interactive dark:bg-interactive-dark select-none hover:bg-interactive-hover dark:hover:bg-interactive-dark-hover cursor-pointer transition-all duration-100 w-32 flex justify-center items-center rounded-lg h-10 ${
              filter === "positive" ? "ring-2 ring-interactive-ring dark:ring-primary" : ""
            }`}
          >
            Pozitif Günler
          </div>

          <div
            className="bg-interactive dark:bg-interactive-dark hover:bg-interactive-hover dark:hover:bg-interactive-dark-hover relative select-none cursor-pointer transition-all duration-100 w-40 flex justify-between items-center px-4 rounded-lg h-10"
            onClick={() => setOpenMonthBox((v) => !v)}
          >
            <span className="truncate">
              {selectedMonthLabel || "Tarih Seç"}
            </span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="text-content-secondary dark:text-content-dark-secondary"
            >
              <path fill="currentColor" d="M7 10l5 5 5-5H7z"></path>
            </svg>

            {openMonthBox && (
              <div
                className="absolute top-11 left-0 w-full bg-panel dark:bg-panel-dark border border-edge-light dark:border-edge-dark-light rounded-lg shadow-md z-10 max-h-56 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {monthOptions.length > 0 ? (
                  <>
                    <div
                      className="px-4 py-2 hover:bg-panel-hover dark:hover:bg-interactive-dark-selected transition-colors text-content-primary dark:text-content-dark-primary"
                      onClick={() => {
                        setSelectedMonth(null);
                        setOpenMonthBox(false);
                      }}
                    >
                      (Tüm Aylar)
                    </div>

                    {monthOptions.map((opt) => (
                      <div
                        key={opt.key}
                        className={`px-4 py-2 hover:bg-panel-hover dark:hover:bg-interactive-dark-selected transition-colors text-content-primary dark:text-content-dark-primary ${
                          selectedMonth === opt.key ? "bg-interactive-selected dark:bg-interactive-dark-selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedMonth(opt.key);
                          setOpenMonthBox(false);
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-2 text-content-secondary/70 dark:text-content-dark-secondary/70 italic">
                    Ay bulunamadı
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

<div className="flex flex-col w-full mx-auto mt-10 gap-8">
  {Object.entries(
    filteredMemories.reduce((acc, m) => {
      const date = new Date(m.memoryCreateDate);
      if (isNaN(date.getTime())) return acc;

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const label = new Date(`${key}-01`).toLocaleString("tr-TR", {
        month: "long",
        year: "numeric",
      }); 
      const formatted =
        label.charAt(0).toLocaleUpperCase("tr-TR") + label.slice(1);

      if (!acc[formatted]) acc[formatted] = [];
      acc[formatted].push(m);
      return acc;
    }, {} as Record<string, MemoryType[]>)
  ).map(([monthLabel, items]) => (
    <div key={monthLabel}>
      <h2 className="text-xl font-semibold text-content-primary dark:text-content-dark-primary mb-4 border-b border-edge-secondary dark:border-edge-dark-secondary pb-1 flex items-center justify-between">
        <span>{monthLabel}</span>
        <span className="text-sm text-content-secondary/70 dark:text-content-dark-secondary/70">
          {items.length} günlük
        </span>
      </h2>

      <div className="flex flex-wrap gap-4">
        {items.map((m) => (
          <Memory
            key={m.memoryId}
            id={m.memoryId}
            date={String(m.memoryCreateDate)}
            isFavorite={m.isFavorite}
            mood={m.memoryMood}
            excerpt={m.memorySummary}
          />
        ))}
      </div>
    </div>
  ))}

  {filteredMemories.length === 0 && (
    <p className="text-content-secondary/70 dark:text-content-dark-secondary/70 italic mt-6">
      Bu filtreye uygun günlük bulunamadı.
    </p>
  )}
</div>

    </div>
  );
};

export default Memories;
