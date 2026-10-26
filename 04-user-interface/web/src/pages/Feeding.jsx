import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { feeding } from "../data/mockData.js";
import { Clock, Sparkles } from "lucide-react";

export default function Feeding() {
  const [fed, setFed] = useState(false);

  return (
    <DashboardLayout>
      <PageHeader title="Feeding Management" subtitle="Schedules, manual feeding and history" />

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="panel p-5 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-aqua-600/15 text-aqua-300 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Next Feeding</p>
            <p className="text-lg font-display font-semibold text-white">{feeding.nextFeeding}</p>
          </div>
        </div>

        <div className="panel p-5 lg:col-span-2">
          <p className="text-xs text-slate-500 mb-3">Daily Schedule</p>
          <div className="flex flex-wrap gap-2">
            {feeding.dailySchedule.map((t) => (
              <span key={t} className="rounded-lg bg-surface border border-border px-3 py-1.5 text-sm text-white">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <button className="rounded-lg bg-aqua-600 hover:bg-aqua-700 transition-colors px-4 py-2 text-xs font-medium text-white">
              Add Schedule
            </button>
            <button className="rounded-lg bg-surface border border-border hover:border-aqua-500 transition-colors px-4 py-2 text-xs font-medium text-white">
              Edit Schedule
            </button>
            <button
              onClick={() => setFed(true)}
              className="rounded-lg bg-surface border border-border hover:border-aqua-500 transition-colors px-4 py-2 text-xs font-medium text-white"
            >
              {fed ? "Fed just now ✓" : "Manual Feed"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-5">
        <div className="panel p-5 overflow-x-auto">
          <p className="text-sm font-medium text-white mb-4">Feeding History</p>
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-border">
                <th className="py-2 pr-4">Date &amp; Time</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {feeding.history.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 text-sm text-slate-300 whitespace-nowrap">{row.datetime}</td>
                  <td className="py-3 pr-4 text-sm text-white">{row.amount}</td>
                  <td className="py-3 pr-4 text-sm text-slate-400">{row.type}</td>
                  <td className="py-3 pr-4 text-sm text-status-good">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-aqua-300" />
            <p className="text-sm font-medium text-white">AI Recommendation</p>
          </div>
          <p className="text-sm text-slate-400">{feeding.recommendation}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
