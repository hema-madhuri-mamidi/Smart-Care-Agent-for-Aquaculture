import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AIAgent from "./pages/AIAgent.jsx";
import Automation from "./pages/Automation.jsx";
import WaterQuality from "./pages/WaterQuality.jsx";
import Predictions from "./pages/Predictions.jsx";
import FishHealth from "./pages/FishHealth.jsx";
import Feeding from "./pages/Feeding.jsx";
import Alerts from "./pages/Alerts.jsx";
import History from "./pages/History.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import Settings from "./pages/Settings.jsx";
import Architecture from "./pages/Architecture.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ai-agent" element={<AIAgent />} />
      <Route path="/automation" element={<Automation />} />
      <Route path="/water-quality" element={<WaterQuality />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/fish-health" element={<FishHealth />} />
      <Route path="/feeding" element={<Feeding />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/history" element={<History />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/architecture" element={<Architecture />} />
    </Routes>
  );
}