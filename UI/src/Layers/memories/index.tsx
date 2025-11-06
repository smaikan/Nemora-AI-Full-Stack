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
          <h1 className="text-2xl font-bold text-[#463b2d]">Günlüklerim</h1>
          <p className="text-sm text-[#5e5346]/80 mt-1">
            Tüm günlük sayfalarınızı aşağıda bulabilirsiniz.
          </p>
        </div>

        <div className="flex gap-4 self-end ml-auto mr-10 relative">
          <div
            onClick={() => {
              setFilter("all");
              setSelectedMonth(null);
            }}
            className={`bg-[#fae0c3] select-none hover:bg-[#f8c994] cursor-pointer transition-all duration-100 w-24 flex justify-center items-center rounded-lg h-10 ${
              filter === "all" ? "ring-2 ring-[#d9b58d]" : ""
            }`}
          >
            Tümü
          </div>

          <div
            onClick={() => {
              setFilter("favorite");
              setSelectedMonth(null);
            }}
            className={`bg-[#fae0c3] select-none hover:bg-[#f8c994] cursor-pointer transition-all duration-100 w-24 flex justify-center items-center rounded-lg h-10 ${
              filter === "favorite" ? "ring-2 ring-[#d9b58d]" : ""
            }`}
          >
            Favoriler
          </div>

          <div
            onClick={() => {
              setFilter("negative");
              setSelectedMonth(null);
            }}
            className={`bg-[#fae0c3] select-none hover:bg-[#f8c994] cursor-pointer transition-all duration-100 w-32 flex justify-center items-center rounded-lg h-10 ${
              filter === "negative" ? "ring-2 ring-[#d9b58d]" : ""
            }`}
          >
            Negatif Günler
          </div>

          <div
            onClick={() => {
              setFilter("positive");
              setSelectedMonth(null);
            }}
            className={`bg-[#fae0c3] select-none hover:bg-[#f8c994] cursor-pointer transition-all duration-100 w-32 flex justify-center items-center rounded-lg h-10 ${
              filter === "positive" ? "ring-2 ring-[#d9b58d]" : ""
            }`}
          >
            Pozitif Günler
          </div>

          <div
            className="bg-[#fae0c3] hover:bg-[#f8c994] relative select-none cursor-pointer transition-all duration-100 w-40 flex justify-between items-center px-4 rounded-lg h-10"
            onClick={() => setOpenMonthBox((v) => !v)}
          >
            <span className="truncate">
              {selectedMonthLabel || "Tarih Seç"}
            </span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="text-[#5e5346]"
            >
              <path fill="currentColor" d="M7 10l5 5 5-5H7z"></path>
            </svg>

            {openMonthBox && (
              <div
                className="absolute top-11 left-0 w-full bg-[#fff9f3] border border-[#ead7bf] rounded-lg shadow-md z-10 max-h-56 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {monthOptions.length > 0 ? (
                  <>
                    <div
                      className="px-4 py-2 hover:bg-[#f8e5cc] transition-colors text-[#463b2d]"
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
                        className={`px-4 py-2 hover:bg-[#f8e5cc] transition-colors text-[#463b2d] ${
                          selectedMonth === opt.key ? "bg-[#f3e0c9]" : ""
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
                  <div className="px-4 py-2 text-[#5e5346]/70 italic">
                    Ay bulunamadı
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full gap-4 flex-wrap mx-auto mt-10">
        {filteredMemories.map((m) => (
          <Memory
            key={m.memoryId}
            id={m.memoryId}
            date={String(m.memoryCreateDate)}
            isFavorite={m.isFavorite}
            mood={m.memoryMood}
            excerpt={m.memorySummary}
          />
        ))}

        {filteredMemories.length === 0 && (
          <p className="text-[#5e5346]/70 italic mt-6">
            Bu filtreye uygun günlük bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
};

export default Memories;
