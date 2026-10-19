import * as Icons from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import LineChart from "./LineChart.jsx";

const iconByKey = {
  temperature: "Thermometer",
  ph: "FlaskConical",
  oxygen: "Wind",
  turbidity: "Droplets",
  waterLevel: "Waves",
  ammonia: "TestTube2",
};

export default function SensorCard({ param, chartColor = "#2bc4e0" }) {
  const Icon = Icons[iconByKey[param.key]] || Icons.Activity;

  return (
    <div className="panel p-5 flex flex-col gap-3 hover:shadow-glow transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <Icon size={16} className="text-aqua-300" />
          <span className="text-sm">{param.label}</span>
        </div>
      </div>
      <div className="flex items-end gap-1">
        <span className="text-2xl font-display font-semibold text-white">{param.current}</span>
        <span className="text-sm text-slate-400 mb-0.5">{param.unit}</span>
      </div>
      <LineChart data={param.history} color={chartColor} mini height={48} />
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Safe range: {param.safeRange}</span>
        <StatusBadge label={param.status} />
      </div>
    </div>
  );
}