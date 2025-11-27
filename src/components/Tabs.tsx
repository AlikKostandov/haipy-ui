
export function Tabs({
  items, value, onChange,
}: { items: { key: string; label: string }[]; value: string; onChange: (k: string) => void }) {
  return (
    <div className="tabs">
      {items.map(it => (
        <button
          key={it.key}
          className={"tab" + (value === it.key ? " is-active" : "")}
          onClick={() => onChange(it.key)}
        >
          {it.label}
        </button>
      ))}
      <div className="tabs-underline" />
    </div>
  );
}
