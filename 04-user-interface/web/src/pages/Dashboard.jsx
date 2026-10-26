import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SensorCard from "../components/SensorCard.jsx";
import { aquarium, parameters, aiAgent, automationHistory } from "../data/mockData.js";
import { HeartPulse, Sparkles } from "lucide-react";

export default function Dashboard() {
  const paramList = Object.values(parameters);

  return (
    <DashboardLayout>
      <PageHeader title={aquarium.name} subtitle={`Last updated ${aquarium.lastUpdated}`} />

      <div className="grid lg:grid-cols-[280px_1fr] gap-5 mb-6">
        {/* Aquarium health */}
        <div className="panel p-6 flex flex-col items-center justify-center text-center gap-3">
          <div className="relative h-28 w-28 rounded-full border-4 border-status-good/30 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-status-good border-t-transparent rotate-45" />
            <div>
              <p className="text-3xl font-display font-semibold text-white">{aquarium.healthScore}</p>
              <p className="text-[10px] text-slate-500">/ 100</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-status-good text-sm font-medium">
            <HeartPulse size={15} />
            {aquarium.healthLabel}
          </div>
          <p className="text-xs text-slate-500">Aquarium Health</p>
        </div>

        {/* Live water parameters */}
        <div className="panel p-5">
          <p className="text-sm font-medium text-white mb-4">Live Water Parameters</p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {paramList.map((p) => (
              <SensorCard key={p.key} param={p} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent activity */}
        <div className="panel p-5">
          <p className="text-sm font-medium text-white mb-3">Recent Activity</p>
          <ul className="space-y-3">
            {automationHistory.slice(0, 5).map((row, i) => (
              <li key={i} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-2 last:pb-0">
                <span className="text-slate-400">{row.time}</span>
                <span className="text-white">{row.parameter}</span>
                <span className="text-aqua-300">{row.action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI recommendation */}
        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-aqua-300" />
            <p className="text-sm font-medium text-white">AI Recommendation</p>
          </div>
          <p className="text-sm text-slate-400">{aiAgent.decision.summary}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {aiAgent.observations.map((o) => (
              <li key={o.label} className="flex items-center justify-between text-slate-400">
                <span>{o.label}</span>
                <span className="text-white">{o.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
