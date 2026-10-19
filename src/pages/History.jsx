import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { automationHistory } from "../data/mockData.js";

export default function History() {
  return (
    <DashboardLayout>
      <PageHeader title="Automation History" subtitle="A log of every action the system has taken automatically" />

      <div className="panel overflow-x-auto">
        <table className="w-full text-left min-w-[520px]">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-border">
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Parameter / Device</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Value</th>
            </tr>
          </thead>
          <tbody>
            {automationHistory.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                <td className="py-3 px-4 text-sm text-slate-400 whitespace-nowrap">{row.time}</td>
                <td className="py-3 px-4 text-sm text-white whitespace-nowrap">{row.parameter}</td>
                <td className="py-3 px-4 text-sm text-aqua-300">{row.action}</td>
                <td className="py-3 px-4 text-sm text-slate-400">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
