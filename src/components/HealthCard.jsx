import * as Icons from "lucide-react";

export default function HealthCard({ icon, label, status }) {
  const Icon = Icons[icon] || Icons.HeartPulse;
  const isGood = status.toLowerCase().includes("normal") || status.toLowerCase().includes("none");

  return (
    <div className="panel p-4 flex flex-col items-center gap-2 text-center">
      <div
        className={`h-9 w-9 rounded-full flex items-center justify-center ${
          isGood ? "bg-status-good/15 text-status-good" : "bg-status-warn/15 text-status-warn"
        }`}
      >
        <Icon size={16} />
      </div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-white">{status}</p>
    </div>
  );
}