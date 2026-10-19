import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { maintenance, maintenanceRecommendation } from "../data/mockData.js";
import { Sparkles, Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <DashboardLayout>
      <PageHeader title="Maintenance" subtitle="Equipment status and upcoming maintenance tasks" />

      <div className="panel divide-y divide-border mb-5">
        {maintenance.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-white/5 text-aqua-300 flex items-center justify-center">
                <Wrench size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="text-xs text-slate-500">{item.status}</p>
              </div>
            </div>
            <StatusBadge label={item.due} tone={item.tone} />
          </div>
        ))}
      </div>

      <div className="panel p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-aqua-300" />
          <p className="text-sm font-medium text-white">AI Recommendation</p>
        </div>
        <p className="text-sm text-slate-400">{maintenanceRecommendation}</p>
      </div>
    </DashboardLayout>
  );
}
