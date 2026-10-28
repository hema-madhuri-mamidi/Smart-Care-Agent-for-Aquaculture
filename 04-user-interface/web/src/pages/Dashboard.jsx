import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SensorCard from "../components/SensorCard.jsx";
import { aquarium, parameters, aiAgent, automationHistory } from "../data/mockData.js";
import { HeartPulse, Sparkles } from "lucide-react";
import StatusBadge from "../components/StatusBadge.jsx";
import { evaluateDecision } from "../services/aquariumApi.js";

const mockReadings = {
  ph: parameters.ph.current,
  temperature: parameters.temperature.current,
  dissolved_oxygen: parameters.oxygen.current,
  ammonia: parameters.ammonia.current,
  water_level: parameters.waterLevel.current,
};

const apiFieldByParameter = {
  temperature: "temperature",
  ph: "ph",
  oxygen: "dissolved_oxygen",
  ammonia: "ammonia",
  waterLevel: "water_level",
};

export default function Dashboard() {
  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;
    setIsLoading(true);
    setApiError("");
    setApiResult(null);

    evaluateDecision(mockReadings)
      .then((result) => {
        if (isCurrentRequest) setApiResult(result);
      })
      .catch((error) => {
        if (isCurrentRequest) {
          setApiError(error instanceof Error ? error.message : "An unexpected API error occurred.");
        }
      })
      .finally(() => {
        if (isCurrentRequest) setIsLoading(false);
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [retryCount]);

  const decision = apiResult?.decision;
  const decisionBorderClass =
    decision?.risk_level === "High"
      ? "border-status-bad"
      : decision?.risk_level === "Medium"
        ? "border-status-warn"
        : "border-status-good";
  const decisionMutedBorderClass =
    decision?.risk_level === "High"
      ? "border-status-bad/30"
      : decision?.risk_level === "Medium"
        ? "border-status-warn/30"
        : "border-status-good/30";
  const paramList = decision
    ? Object.values(parameters)
        .filter((param) => apiFieldByParameter[param.key])
        .map((param) => ({
          ...param,
          current: decision.readings[apiFieldByParameter[param.key]],
        }))
    : Object.values(parameters);

  return (
    <DashboardLayout>
      <PageHeader
        title={aquarium.name}
        subtitle={
          decision
            ? "Backend evaluation · demo mock inputs"
            : `Mock aquarium data · last updated ${aquarium.lastUpdated}`
        }
      />

      <div
        className={`mb-5 rounded-xl border p-4 text-sm ${
          apiError
            ? "border-status-warn/30 bg-status-warn/10 text-status-warn"
            : "border-aqua-300/20 bg-aqua-300/5 text-slate-300"
        }`}
        role={apiError ? "alert" : "status"}
      >
        {isLoading ? (
          <p>Connecting to the decision API. Values shown below are demo mock data, not live hardware readings.</p>
        ) : apiError ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>
              Decision API unavailable: {apiError} Showing clearly labeled mock data, not live hardware readings.
            </p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="rounded-lg border border-current px-3 py-1.5 font-medium hover:bg-white/5"
            >
              Retry
            </button>
          </div>
        ) : (
          <p>
            Backend decision loaded from demo mock inputs. These values are not live hardware readings.
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-5 mb-6">
        {/* Decision status, or the existing mock health score when offline */}
        <div className="panel p-6 flex flex-col items-center justify-center text-center gap-3">
          <div className={`relative h-28 w-28 rounded-full border-4 ${decision ? decisionMutedBorderClass : "border-status-good/30"} flex items-center justify-center`}>
            <div className={`absolute inset-0 rounded-full border-4 ${decision ? decisionBorderClass : "border-status-good"} border-t-transparent rotate-45`} />
            <div>
              <p className="text-xl font-display font-semibold text-white">
                {decision ? decision.status : isLoading ? "Loading" : aquarium.healthScore}
              </p>
              <p className="text-[10px] text-slate-500">
                {decision ? "Backend status" : "Mock score / 100"}
              </p>
            </div>
          </div>
          {decision ? (
            <div className="flex items-center gap-2">
              <StatusBadge label={`Risk: ${decision.risk_level}`} />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-status-good text-sm font-medium">
              <HeartPulse size={15} />
              {aquarium.healthLabel} (mock)
            </div>
          )}
          <p className="text-xs text-slate-500">
            {decision ? "Decision status" : "Aquarium health (mock)"}
          </p>
        </div>

        {/* Backend readings are single demo evaluations, not a live sensor stream */}
        <div className="panel p-5">
          <div className="mb-4">
            <p className="text-sm font-medium text-white">Water Parameters</p>
            <p className="mt-1 text-xs text-slate-500">
              {decision ? "Values returned by the backend from demo inputs" : "Mock demo values"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {paramList.map((p) => (
              <SensorCard
                key={p.key}
                param={p}
                showHistory={!decision}
                showStatus={!decision}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent activity */}
        <div className="panel p-5">
          <p className="text-sm font-medium text-white mb-1">Recent Activity (mock)</p>
          <p className="text-xs text-slate-500 mb-3">Example activity only; not reported by the backend.</p>
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

        {/* Backend recommendation, with the original mock content as fallback */}
        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-aqua-300" />
            <p className="text-sm font-medium text-white">
              {apiResult ? "Backend Alert & Recommendations" : "AI Recommendation (mock)"}
            </p>
          </div>
          {apiResult ? (
            <>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <StatusBadge label={apiResult.alert.priority} />
                <span className="text-sm text-slate-400">{apiResult.alert.message}</span>
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Recommendations</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-400">
                {decision.recommendations.map((recommendation, index) => (
                  <li key={`${index}-${recommendation}`}>{recommendation}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-400">{aiAgent.decision.summary}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {aiAgent.observations.map((o) => (
                  <li key={o.label} className="flex items-center justify-between text-slate-400">
                    <span>{o.label}</span>
                    <span className="text-white">{o.status}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
