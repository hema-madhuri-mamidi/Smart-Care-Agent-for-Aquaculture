import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import LineChart from "../components/LineChart.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { parameters } from "../data/mockData.js";

const timeFilters = ["1h", "6h", "24h", "7d", "30d"];

export default function WaterQuality() {
  const [range, setRange] = useState("24h");
  const paramList = Object.values(parameters);

  return (
    <DashboardLayout>
      <PageHeader
        title="Water Quality"
        subtitle="Detailed readings for every monitored parameter"
        actions={
          <div className="flex rounded-lg border border-border bg-card p-1">
            {timeFilters.map((t) => (
              <button
                key={t}
                onClick={() => setRange(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  range === t ? "bg-aqua-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid lg:grid-cols-2 gap-5">
        {paramList.map((p) => (
          <div key={p.key} className="panel p-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-white">{p.label}</p>
              <StatusBadge label={p.status} />
            </div>
            <p className="text-2xl font-display font-semibold text-white mb-3">
              {p.current} <span className="text-sm text-slate-400 font-sans">{p.unit}</span>
            </p>
            <LineChart data={p.history} />
            <div className="grid grid-cols-4 gap-2 mt-4 text-center">
              {[
                ["Min", p.min],
                ["Max", p.max],
                ["Avg", p.avg],
                ["Current", p.current],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-surface py-2">
                  <p className="text-[11px] text-slate-500">{label}</p>
                  <p className="text-sm text-white font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
