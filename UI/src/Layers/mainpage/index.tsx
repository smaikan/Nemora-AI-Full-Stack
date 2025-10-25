import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../Components/Redux/Hooks";
import MainHeader from "./MainHeader";
import MoodChart from "./MoodChart";
import WeeklySummary from "./WeeklySummary";
import DailyTip from "./DailyTip";
import RecentMemories from "./RecentMemories";
import QuickActions from "./QuickActions";
import DateRangeToggle from "./DateRangeToggle"; 

type Memory = {
  memoryId: number;
  memoryCreateDate: string;
  memoryText: string | null;
  userId?: number;
  memoryUpdateDate?: string | null;
  memoryMood?: number | null;
  memorySummary?: string | null;
};

const formatShortDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" }) : "";

const Mainpage: React.FC = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [range, setRange] = useState<"week" | "month" | "year">("week");

const memories = ((user?.memories as Memory[]) ?? [])
  .slice()
  .sort(
    (a, b) =>
      new Date(a.memoryCreateDate).getTime() - new Date(b.memoryCreateDate).getTime()
  );

const moodPoints = useMemo(() => {
  if (!memories || memories.length === 0) return [];

  const now = new Date();
  const moodArray: number[] = [];

  if (range === "week") {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const weekData = memories.filter(m => {
      const d = new Date(m.memoryCreateDate);
      return d >= sevenDaysAgo && d <= now;
    });

    weekData.forEach(m => moodArray.push(m.memoryMood ?? 0));
  }

  else if (range === "month") {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(now.getDate() - 90);

    const recent = memories.filter(m => {
      const d = new Date(m.memoryCreateDate);
      return d >= ninetyDaysAgo && d <= now;
    });

   const totalWeeks = 12;
const weekLength = 7;

for (let i = 0; i < totalWeeks; i++) {
  const weekEnd = new Date(now);
  weekEnd.setDate(now.getDate() - i * weekLength);

  const weekStart = new Date(weekEnd);
  weekStart.setDate(weekEnd.getDate() - weekLength);

  const weekChunk = recent.filter(m => {
    const d = new Date(m.memoryCreateDate);
    return d >= weekStart && d <= weekEnd;
  });

  if (weekChunk.length > 0) {
    const avg = weekChunk.reduce((s, it) => s + (it.memoryMood ?? 0), 0) / weekChunk.length;
    moodArray.unshift(Math.round(avg));
  } else {
    moodArray.unshift(0);
  }
}

  }

  else if (range === "year") {
    const yearAgo = new Date();
    yearAgo.setFullYear(now.getFullYear() - 1);

    const recent = memories.filter(m => {
      const d = new Date(m.memoryCreateDate);
      return d >= yearAgo && d <= now;
    });

    for (let i = 0; i < 12; i++) {
      const monthStart = new Date(yearAgo.getFullYear(), yearAgo.getMonth() + i, 1);
      const monthEnd = new Date(yearAgo.getFullYear(), yearAgo.getMonth() + i + 1, 1);

      const monthChunk = recent.filter(m => {
        const d = new Date(m.memoryCreateDate);
        return d >= monthStart && d < monthEnd;
      });

      if (monthChunk.length > 0) {
        const avg =
          monthChunk.reduce((s, it) => s + (it.memoryMood ?? 0), 0) / monthChunk.length;
        moodArray.unshift(Math.round(avg));
      }
      else {
        moodArray.push(0);
      }
    }
  }

  return moodArray;
}, [memories, range]);


  const weeklySummary = useMemo(() => {
    const mems = memories.slice(-7);
    const count = mems.length;
    const avgMood = Math.round((moodPoints.reduce((a, b) => a + b, 0) / moodPoints.length) * 10) / 10;
    return {
      count,
      avgMood,
      highlight: mems[0]?.memoryText?.slice(0, 120) ?? "Geçen hafta notlarına göz atın — kısa bir özet burada görünecek.",
    };
  }, [memories, moodPoints]);

  const recent = memories.slice(-4).reverse();

  return (
    <main className="px-6 py-8 max-w-6xl mx-auto">
      <MainHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#efe0c8]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold text-[#463b2d]">Ruh Hali ({range === "week" ? "Haftalık" : range === "month" ? "3 Aylık" : "Yıllık"})</h2>
                <div className="text-xs text-[#5e5346]/70">Son {range === "week" ? 7 : range === "month" ? 30 : 90} gün {range == "month" ? "(Haftalara göre)": range == "year" && "Aylara göre" }</div>
              </div>

              <DateRangeToggle value={range} onChange={setRange} />
            </div>
            <MoodChart Memory={user?.memories} points={moodPoints} />
          {user?.memories.length !== 0 &&  <div className="mt-3 flex items-center gap-4 text-sm text-[#5e5346]">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#f6c37e]" />
                Ortalama ruh hali: <strong className="ml-1">{weeklySummary.avgMood}</strong>
              </div> 
              <div className="text-[#5e5346]/60">Günlük giriş sayısı: <strong className="ml-1">{moodPoints.length > 0 && moodPoints.length}</strong></div>
            </div> }
          </div>

          <WeeklySummary summary={weeklySummary} />

          <DailyTip summary={weeklySummary} onWrite={() => navigate("/newpage")} />
        </section>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#efe0c8]">
            <h3 className="text-sm font-semibold text-[#463b2d] mb-2">Kısa Özet</h3>
            <div className="text-xs text-[#5e5346]/75">
              Günlük veri: <strong className="ml-1">{memories.length}</strong>
            </div>
            <div className="text-xs text-[#5e5346]/75 mt-2">
              Son güncelleme: <strong className="ml-1">{formatShortDate(memories.slice(-1)[0]?.memoryCreateDate)}</strong>
            </div>
          </div>

          <RecentMemories recent={recent} />

          <QuickActions onNew={() => navigate("/newpage")} onAll={() => navigate("/memories")} />
        </aside>
      </div>
    </main>
  );
};

export default Mainpage;