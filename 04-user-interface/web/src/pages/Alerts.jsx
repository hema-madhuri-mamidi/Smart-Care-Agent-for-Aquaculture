import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import AlertCard from "../components/AlertCard.jsx";
import { alerts } from "../data/mockData.js";

const tabs = ["All", "Information", "Warning", "Critical"];

export default function Alerts() {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? alerts : alerts.filter((a) => a.severity === tab);

  return (
    <DashboardLayout>
      <PageHeader title="Alerts & Notifications" subtitle="Everything the system has flagged, most recent first" />

      <div className="flex gap-2 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-xs font-medium border transition-colors ${
              tab === t
                ? "bg-aqua-600 border-aqua-600 text-white"
                : "bg-card border-border text-slate-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-border">
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Parameter / Device</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <AlertCard key={i} alert={a} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-slate-500">
                  No alerts in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}