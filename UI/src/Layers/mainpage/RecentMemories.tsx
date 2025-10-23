import { Link } from "react-router-dom";

type Memory = {
  memoryId: number;
  memoryCreateDate: string;
  memoryText: string | null;
  userId?: number;
  memoryUpdateDate?: string | null;
};

const formatShortDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" }) : "";

const RecentMemories: React.FC<{ recent: Memory[] }> = ({ recent }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#efe0c8]">
      <h3 className="text-sm font-semibold text-[#463b2d] mb-3">Son Anılar</h3>
      <ul className="space-y-3">
        {recent.length === 0 && <li className="text-sm text-[#5e5346]/70">Henüz anı yok.</li>}
        {recent.map((m: Memory) => (
          <li key={m.memoryId}>
            <Link to={`/memory/${m.memoryId}`} className="flex items-start gap-3 hover:bg-[#fff7ea] p-2 rounded-md transition">
              <div className="w-10 text-xs text-[#5e5346]/65">{formatShortDate(m.memoryCreateDate)}</div>
              <div className="flex-1 text-sm text-[#463b2d] truncate">{m.memoryText?.slice(0, 80) ?? "—"}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentMemories;