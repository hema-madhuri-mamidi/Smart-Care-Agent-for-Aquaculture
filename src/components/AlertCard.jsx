import { Info, AlertTriangle, AlertOctagon } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

const severityIcon = {
  Information: Info,
  Warning: AlertTriangle,
  Critical: AlertOctagon,
};

// Renders a single alert as a table row. Used by the Alerts & Notifications page.
export default function AlertCard({ alert }) {
  const Icon = severityIcon[alert.severity] || Info;

  return (
    <tr className="border-b border-border last:border-0 hover:bg-white/[0.02]">
      <td className="py-3 px-4 text-sm text-slate-400 whitespace-nowrap">{alert.time}</td>
      <td className="py-3 px-4 text-sm text-white whitespace-nowrap">{alert.parameter}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1.5">
          <Icon size={14} className="text-slate-500" />
          <StatusBadge label={alert.severity} />
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-slate-400">{alert.description}</td>
      <td className="py-3 px-4 text-sm text-aqua-300 whitespace-nowrap">{alert.action}</td>
    </tr>
  );
}