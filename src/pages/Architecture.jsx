import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { Monitor, Cloud, Cpu, Database, BrainCircuit, Fan, ArrowRight, ArrowDown } from "lucide-react";

const nodes = [
  { icon: Monitor, title: "Frontend", sub: "Web Dashboard" },
  { icon: Cloud, title: "API", sub: "REST / WebSocket" },
  { icon: Cpu, title: "ESP32 / Sensors", sub: "Temperature, pH, DO, etc." },
  { icon: Database, title: "Database", sub: "Logs & History" },
];

const secondRow = [
  { icon: BrainCircuit, title: "AI Agent", sub: "Predictions & Decisions" },
  { icon: Fan, title: "Devices", sub: "Heater, Fan, Pump, Filter, etc." },
];

export default function Architecture() {
  return (
    <DashboardLayout>
      <PageHeader
        title="System Architecture"
        subtitle="A visual reference only — this frontend does not connect to any real backend"
      />

      <div className="panel p-8">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-3 mb-6">
          {nodes.map((n, i) => (
            <div key={n.title} className="flex items-center gap-3 w-full lg:w-auto">
              <Node {...n} />
              {i < nodes.length - 1 && (
                <ArrowRight size={20} className="text-slate-600 hidden lg:block shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <ArrowDown size={20} className="text-slate-600" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {secondRow.map((n) => (
            <Node key={n.title} {...n} />
          ))}
        </div>
      </div>

      <div className="mt-6 panel p-5 text-sm text-slate-400">
        Data flows from sensors through the API into the database, where the AI agent reads
        recent history to generate predictions and decisions. Those decisions are sent back
        through the API to actuate devices such as the heater, fan, pump and filter.
      </div>
    </DashboardLayout>
  );
}

function Node({ icon: Icon, title, sub }) {
  return (
    <div className="panel !bg-surface px-5 py-4 flex flex-col items-center text-center gap-2 min-w-[160px]">
      <div className="h-10 w-10 rounded-full bg-aqua-600/15 text-aqua-300 flex items-center justify-center">
        <Icon size={18} />
      </div>
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}