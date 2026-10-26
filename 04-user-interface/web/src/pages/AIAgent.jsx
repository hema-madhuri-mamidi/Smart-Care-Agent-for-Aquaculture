import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { aiAgent } from "../data/mockData.js";
import { Eye, Search, GitBranch, Zap, ArrowRight } from "lucide-react";

const flowIcons = { Observation: Eye, Analysis: Search, Decision: GitBranch, Action: Zap };

export default function AIAgent() {
  return (
    <DashboardLayout>
      <PageHeader
        title="AI Agent"
        subtitle="Continuously observing your aquarium and acting when needed"
        actions={<StatusBadge label={aiAgent.active ? "AI Agent Active" : "AI Agent Idle"} tone={aiAgent.active ? "good" : "warn"} />}
      />

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="panel p-5">
          <p className="text-sm font-medium text-white mb-4">What AI is Currently Observing</p>
          <ul className="space-y-3">
            {aiAgent.observations.map((o) => (
              <li key={o.label} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-3 last:pb-0">
                <span className="text-slate-400">{o.label}</span>
                <StatusBadge label={o.status} />
              </li>
            ))}
          </ul>
        </div>

        <div className="panel p-5">
          <p className="text-sm font-medium text-white mb-4">AI Decision</p>
          <p className="text-sm text-slate-400 leading-relaxed">{aiAgent.decision.summary}</p>
        </div>
      </div>

      {/* Flow */}
      <div className="panel p-5 mb-5">
        <p className="text-sm font-medium text-white mb-5">Decision Flow</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {aiAgent.flow.map((step, i) => {
            const Icon = flowIcons[step.stage] || Eye;
            return (
              <div key={step.stage} className="flex items-center gap-3 flex-1">
                <div className="panel !bg-surface p-4 flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-aqua-600/15 text-aqua-300 flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <p className="text-xs text-slate-500">{step.stage}</p>
                  <p className="text-sm text-white font-medium">{step.detail}</p>
                </div>
                {i < aiAgent.flow.length - 1 && (
                  <ArrowRight size={18} className="text-slate-600 hidden sm:block shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity log */}
      <div className="panel p-5">
        <p className="text-sm font-medium text-white mb-4">AI Activity Log</p>
        <ul className="space-y-3">
          {aiAgent.activityLog.map((log, i) => (
            <li key={i} className="flex items-center gap-4 text-sm border-b border-border last:border-0 pb-3 last:pb-0">
              <span className="text-slate-500 w-16 shrink-0">{log.time}</span>
              <span className="text-slate-300">{log.event}</span>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
}