import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import PredictionCard from "../components/PredictionCard.jsx";
import { predictions } from "../data/mockData.js";

export default function Predictions() {
  return (
    <DashboardLayout>
      <PageHeader title="AI Predictions" subtitle="Forecasts generated from recent sensor trends" />
      <div className="grid lg:grid-cols-2 gap-5">
        {predictions.map((p) => (
          <PredictionCard key={p.id} prediction={p} />
        ))}
      </div>
    </DashboardLayout>
  );
}
