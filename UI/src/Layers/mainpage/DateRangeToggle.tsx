
type Props = { value: "week" | "month" | "year"; onChange: (v: Props["value"]) => void; };

const DateRangeToggle: React.FC<Props> = ({ value, onChange }) => {
  const items: Props["value"][] = ["week", "month", "year"];
  return (
    <div className="inline-flex bg-panel-alt3 dark:bg-panel-dark-alt p-1 rounded-md border border-edge-tertiary dark:border-edge-dark-secondary">
      {items.map((it) => (
        <button
          key={it}
          onClick={() => onChange(it)}
          className={`px-3 py-1 text-sm rounded-md transition ${value === it ? "bg-panel-alt2 dark:bg-interactive-dark-selected font-semibold" : "hover:bg-white dark:hover:bg-panel-dark"}`}
          aria-pressed={value === it}
        >
          {it === "week" ? "Hafta" : it === "month" ? "3 Ay" : "Yıl"}
        </button>
      ))}
    </div>
  );
};

export default DateRangeToggle;