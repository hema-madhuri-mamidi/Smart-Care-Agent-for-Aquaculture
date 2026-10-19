const toneStyles = {
  good: "bg-status-good/15 text-status-good border-status-good/30",
  warn: "bg-status-warn/15 text-status-warn border-status-warn/30",
  bad: "bg-status-bad/15 text-status-bad border-status-bad/30",
  info: "bg-status-info/15 text-status-info border-status-info/30",
};

// Maps common status words to a visual tone so callers don't need to
// know the color system — just pass the label that's already in mockData.
function toneFromLabel(label = "") {
  const l = label.toLowerCase();
  if (["critical", "high", "bad", "abnormal"].some((w) => l.includes(w))) return "bad";
  if (["warning", "medium", "slightly", "recommended", "due"].some((w) => l.includes(w))) return "warn";
  if (["information", "info"].some((w) => l.includes(w))) return "info";
  return "good";
}

export default function StatusBadge({ label, tone }) {
  const resolvedTone = tone || toneFromLabel(label);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${toneStyles[resolvedTone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}