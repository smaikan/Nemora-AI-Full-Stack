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
    <div className="bg-panel dark:bg-panel-dark-alt rounded-xl p-4 shadow-sm border border-edge-tertiary dark:border-edge-dark-primary">
      <h3 className="text-sm font-semibold text-content-primary dark:text-content-dark-primary mb-3">Son Anılar</h3>
      <ul className="space-y-3">
        {recent.length === 0 && <li className="text-sm text-content-secondary/70 dark:text-content-dark-secondary/70">Henüz anı yok.</li>}
        {recent.map((m: Memory) => (
          <li key={m.memoryId}>
            <Link to={`/memory/${m.memoryId}`} className="flex items-start gap-3 hover:bg-panel-alt dark:hover:bg-panel-dark-alt p-2 rounded-md transition">
              <div className="w-10 text-xs text-content-secondary/65 dark:text-content-dark-secondary/65">{formatShortDate(m.memoryCreateDate)}</div>
              <div className="flex-1 text-sm text-content-primary dark:text-content-dark-primary truncate">{m.memoryText?.slice(0, 80) ?? "—"}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentMemories;