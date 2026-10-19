import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { aquarium } from "../data/mockData.js";

const tabs = ["Aquarium", "Thresholds", "Automation", "Notifications"];

export default function Settings() {
  const [tab, setTab] = useState("Aquarium");
  const [mode, setMode] = useState("Automatic");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: aquarium.name,
    species: aquarium.fishSpecies,
    count: aquarium.numberOfFish,
    size: aquarium.size,
  });

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <DashboardLayout>
      <PageHeader title="Settings" subtitle="Manage your aquarium profile and system behavior" />

      <div className="flex gap-2 mb-5 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-xs font-medium border whitespace-nowrap transition-colors ${
              tab === t
                ? "bg-aqua-600 border-aqua-600 text-white"
                : "bg-card border-border text-slate-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="panel p-6 max-w-2xl">
        {tab === "Aquarium" && (
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Aquarium Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Fish Species" value={form.species} onChange={(v) => setForm({ ...form, species: v })} />
            <Field label="Number of Fish" value={form.count} onChange={(v) => setForm({ ...form, count: v })} />
            <Field label="Aquarium Size" value={form.size} onChange={(v) => setForm({ ...form, size: v })} />
          </div>
        )}

        {tab === "Thresholds" && (
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Temperature safe range" value="24 - 30 °C" onChange={() => {}} />
            <Field label="pH safe range" value="6.8 - 7.3" onChange={() => {}} />
            <Field label="Dissolved oxygen safe range" value="6 - 8 mg/L" onChange={() => {}} />
            <Field label="Ammonia safe range" value="0 - 0.1 mg/L" onChange={() => {}} />
          </div>
        )}

        {tab === "Automation" && (
          <div>
            <p className="text-sm text-slate-300 mb-3">Automation Mode</p>
            <div className="flex gap-3">
              {["Automatic", "Manual"].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-lg px-4 py-2 text-sm border transition-colors ${
                    mode === m
                      ? "bg-aqua-600 border-aqua-600 text-white"
                      : "bg-surface border-border text-slate-400"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {mode === "Automatic" ? "AI controls devices automatically." : "You control devices manually."}
            </p>
          </div>
        )}

        {tab === "Notifications" && (
          <div className="space-y-4">
            {["Critical alerts", "Warning alerts", "Informational updates", "Weekly summary email"].map((n) => (
              <label key={n} className="flex items-center justify-between text-sm text-slate-300">
                {n}
                <input type="checkbox" defaultChecked className="accent-aqua-600 h-4 w-4" />
              </label>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="mt-8 rounded-lg bg-aqua-600 hover:bg-aqua-700 transition-colors px-6 py-2.5 text-sm font-medium text-white"
        >
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </form>
    </DashboardLayout>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-slate-300 block mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-card border border-border px-3.5 py-2.5 text-sm text-white focus:border-aqua-500 outline-none"
      />
    </div>
  );
}
