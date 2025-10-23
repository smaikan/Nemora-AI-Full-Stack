
type Props = { value: "week" | "month" | "year"; onChange: (v: Props["value"]) => void; };

const DateRangeToggle: React.FC<Props> = ({ value, onChange }) => {
  const items: Props["value"][] = ["week", "month", "year"];
  return (
    <div className="inline-flex bg-[#fffaf5] p-1 rounded-md border border-[#efe0c8]">
      {items.map((it) => (
        <button
          key={it}
          onClick={() => onChange(it)}
          className={`px-3 py-1 text-sm rounded-md transition ${value === it ? "bg-[#f6e3d0] font-semibold" : "hover:bg-white"}`}
          aria-pressed={value === it}
        >
          {it === "week" ? "Hafta" : it === "month" ? "3 Ay" : "Yıl"}
        </button>
      ))}
    </div>
  );
};

export default DateRangeToggle;