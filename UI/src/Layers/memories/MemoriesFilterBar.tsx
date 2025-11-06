import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export type MemoryItem = {
  memoryId: number;
  memoryCreateDate: string | Date;
  isFavorite: boolean;
  memoryMood: number;
  memorySummary?: string | null;
};

type MonthOption = { key: string; label: string }; // key: "YYYY-MM"

type Props = {
  filteredMemories: MemoryItem[];
  onFilterChange: (monthKey: string | null) => void;
};

const capitalizeTR = (s: string) =>
  s.length ? s[0].toLocaleUpperCase("tr-TR") + s.slice(1) : s;

const formatMonthLabel = (key: string): string => {
  const label = new Date(`${key}-01`).toLocaleString("tr-TR", { month: "long" });
  const year = key.split("-")[0];
  return `${capitalizeTR(label)} ${year}`;
};

const MemoriesFilterBar: React.FC<Props> = ({ filteredMemories, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const monthOptions: MonthOption[] = useMemo(() => {
    const months = new Set<string>();
    (filteredMemories ?? []).forEach((m) => {
      const d = new Date(m.memoryCreateDate);
      if (Number.isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months.add(key);
    });

    return Array.from(months)
      .sort((a, b) => new Date(`${b}-01`).getTime() - new Date(`${a}-01`).getTime())
      .map((key) => ({ key, label: formatMonthLabel(key) }));
  }, [filteredMemories]);

  const handleSelect = (monthKey: string) => {
    setSelectedMonth(monthKey);
    setIsOpen(false);
    onFilterChange(monthKey);
  };

  return (
    <div className="flex gap-4 self-end ml-auto mr-10 relative">
      <div className="bg-[#fae0c3] hover:bg-[#f8c994] select-none cursor-pointer transition-all duration-100 w-24 flex justify-center items-center rounded-lg h-10">
        Tümü
      </div>
      <div className="bg-[#fae0c3] hover:bg-[#f8c994] select-none cursor-pointer transition-all duration-100 w-24 flex justify-center items-center rounded-lg h-10">
        Favoriler
      </div>
      <div className="bg-[#fae0c3] hover:bg-[#f8c994] select-none cursor-pointer transition-all duration-100 w-32 flex justify-center items-center rounded-lg h-10">
        Negatif Günler
      </div>
      <div className="bg-[#fae0c3] hover:bg-[#f8c994] select-none cursor-pointer transition-all duration-100 w-32 flex justify-center items-center rounded-lg h-10">
        Pozitif Günler
      </div>

      {/* Tarih Seç dropdown */}
      <div
        className="bg-[#fae0c3] hover:bg-[#f8c994] relative select-none cursor-pointer transition-all duration-100 w-40 flex justify-between items-center px-4 rounded-lg h-10"
        onClick={() => setIsOpen((p) => !p)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>
          {selectedMonth
            ? monthOptions.find((m) => m.key === selectedMonth)?.label ?? "Tarih Seç"
            : "Tarih Seç"}
        </span>
        <ChevronDown size={18} className="text-[#5e5346]" />

        {isOpen && (
          <div
            className="absolute top-11 left-0 w-full bg-[#fff9f3] border border-[#ead7bf] rounded-lg shadow-md z-10 max-h-56 overflow-y-auto"
            role="listbox"
          >
            {monthOptions.map((opt) => (
              <div
                key={opt.key}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(opt.key);
                }}
                className="px-4 py-2 hover:bg-[#f8e5cc] transition-colors text-[#463b2d]"
                role="option"
                aria-selected={selectedMonth === opt.key}
              >
                {opt.label}
              </div>
            ))}
            {monthOptions.length === 0 && (
              <div className="px-4 py-2 text-[#5e5346]/70 italic">Ay bulunamadı</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoriesFilterBar;
