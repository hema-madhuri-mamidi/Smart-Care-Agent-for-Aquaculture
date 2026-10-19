import * as Icons from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

export default function PredictionCard({ prediction }) {
  const Icon = Icons[prediction.icon] || Icons.Activity;

  return (
    <div className="panel p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-aqua-600/15 text-aqua-300 flex items-center justify-center">
            <Icon size={18} />
          </div>
          <p className="text-sm font-medium text-white">{prediction.title}</p>
        </div>
        <StatusBadge label={`Risk: ${prediction.risk}`} />
      </div>

      <p className="text-sm text-slate-400">{prediction.body}</p>

      <div className="flex gap-6 text-sm">
        <div>
          <p className="text-slate-500 text-xs">Current</p>
          <p className="text-white font-display">{prediction.current}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs">Predicted · {prediction.window}</p>
          <p className="text-aqua-300 font-display">{prediction.predicted}</p>
        </div>
      </div>

      <div className="border-t border-border pt-3 text-xs text-slate-400">
        <span className="text-slate-500">Recommended: </span>
        {prediction.recommendation}
      </div>
    </div>
  );
}