import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import HealthCard from "../components/HealthCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import AquariumBackground from "../components/AquariumBackground.jsx";
import { fishHealth } from "../data/mockData.js";
import { Fish } from "lucide-react";

const analysisIcons = {
  Behavior: "Activity",
  Movement: "Waves",
  Feeding: "Utensils",
  "Possible Risks": "ShieldAlert",
};

export default function FishHealth() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Fish Health"
        subtitle="AI-assessed behavior and wellbeing of your fish"
        actions={<StatusBadge label={`Overall Health ${fishHealth.overallHealth}%`} tone="good" />}
      />

      <div className="grid lg:grid-cols-[1fr_320px] gap-5 mb-5">
        <div className="relative panel overflow-hidden h-56 lg:h-full">
          <AquariumBackground />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-white bg-black/30 backdrop-blur px-3 py-1.5 rounded-lg">
            <Fish size={16} className="text-aqua-300" />
            {fishHealth.numberOfFish} fish detected
          </div>
        </div>

        <div className="panel p-5 grid grid-cols-2 gap-4 content-start">
          <Stat label="Number of Fish" value={fishHealth.numberOfFish} />
          <Stat label="Activity" value={fishHealth.activity} />
          <Stat label="Swimming Pattern" value={fishHealth.swimmingPattern} />
          <Stat label="Feeding Behavior" value={fishHealth.feedingBehavior} />
          <Stat label="Abnormal Behavior" value={fishHealth.abnormalBehavior} full />
        </div>
      </div>

      <div className="panel p-5">
        <p className="text-sm font-medium text-white mb-4">Health Analysis</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {fishHealth.analysis.map((a) => (
            <HealthCard key={a.label} icon={analysisIcons[a.label]} label={a.label} status={a.status} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ label, value, full }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-white mt-1">{value}</p>
    </div>
  );
}
