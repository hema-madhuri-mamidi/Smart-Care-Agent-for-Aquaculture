import * as Icons from "lucide-react";

export default function DeviceCard({ device, onToggle }) {
  const Icon = Icons[device.icon] || Icons.Cpu;

  return (
    <div className="panel p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center ${
              device.on ? "bg-aqua-600/20 text-aqua-300" : "bg-white/5 text-slate-500"
            }`}
          >
            <Icon size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{device.name}</p>
            <p className="text-xs text-slate-500">Mode: {device.mode}</p>
          </div>
        </div>
        <button
          onClick={() => onToggle(device.id)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            device.on ? "bg-aqua-600" : "bg-white/10"
          }`}
          aria-label={`Toggle ${device.name}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
              device.on ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
      <div className="text-xs text-slate-500 border-t border-border pt-3">
        <p>{device.detail}</p>
        <p className="mt-1 text-slate-400">{device.on ? "ON" : "OFF"} · {device.lastAction}</p>
      </div>
    </div>
  );
}