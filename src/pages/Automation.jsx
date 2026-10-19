import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import DeviceCard from "../components/DeviceCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import {
  devices as initialDevices,
  parameters,
  getTemperatureAction,
  getOxygenAction,
} from "../data/mockData.js";

export default function Automation() {
  const [mode, setMode] = useState("AUTO");
  const [devices, setDevices] = useState(initialDevices);

  function toggleDevice(id) {
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, on: !d.on } : d)));
  }

  const tempAction = getTemperatureAction(parameters.temperature.current);
  const oxygenAction = getOxygenAction(parameters.oxygen.current);

  return (
    <DashboardLayout>
      <PageHeader
        title="Automation & Device Control"
        subtitle="Devices react automatically based on live sensor readings"
        actions={
          <div className="flex rounded-lg border border-border bg-card p-1">
            {["AUTO", "MANUAL"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-aqua-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        }
      />

      <div className="panel p-4 mb-5 flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Temperature logic:</span>
          <StatusBadge label={tempAction.label} tone={tempAction.tone} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Oxygen logic:</span>
          <StatusBadge label={oxygenAction.label} tone={oxygenAction.tone} />
        </div>
        <span className="text-slate-500 ml-auto">Mode: <span className="text-white">{mode}</span></span>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} onToggle={toggleDevice} />
        ))}
      </div>
    </DashboardLayout>
  );
}
