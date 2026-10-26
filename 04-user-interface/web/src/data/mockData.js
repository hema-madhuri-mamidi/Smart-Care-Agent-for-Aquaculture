// =========================================================================
// mockData.js
// Single source of truth for every sensor reading, device state, prediction,
// alert and history row used across the app. Swap the contents of this file
// (or the functions that produce it) for real API/WebSocket data later —
// no component needs to change, since they all just read these shapes.
// =========================================================================

export const aquarium = {
  name: "Ocean World Aquarium",
  online: true,
  healthScore: 92,
  healthLabel: "Healthy",
  lastUpdated: "Apr 23, 2025 · 10:42 AM",
  fishSpecies: "Tropical Fish",
  numberOfFish: 5,
  size: "120 L",
};

// Helper to build a small trailing history series for sparklines / charts
function series(base, points = 24, spread = 1) {
  const out = [];
  let value = base;
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.5) * spread;
    out.push({
      time: `${i}:00`,
      value: Number(value.toFixed(2)),
    });
  }
  return out;
}

// -------------------------------------------------------------------------
// Live water parameters (used on Dashboard + Water Quality)
// -------------------------------------------------------------------------
export const parameters = {
  temperature: {
    key: "temperature",
    label: "Temperature",
    unit: "°C",
    current: 27.4,
    min: 25.8,
    max: 29.1,
    avg: 27.2,
    safeRange: "24 - 30°C",
    status: "Normal",
    history: series(27.4, 24, 0.6),
  },
  ph: {
    key: "ph",
    label: "pH",
    unit: "",
    current: 7.2,
    min: 6.9,
    max: 7.5,
    avg: 7.2,
    safeRange: "6.8 - 7.3",
    status: "Normal",
    history: series(7.2, 24, 0.15),
  },
  oxygen: {
    key: "oxygen",
    label: "Dissolved Oxygen",
    unit: "mg/L",
    current: 6.8,
    min: 5.8,
    max: 7.4,
    avg: 6.6,
    safeRange: "6 - 8 mg/L",
    status: "Normal",
    history: series(6.8, 24, 0.5),
  },
  turbidity: {
    key: "turbidity",
    label: "Turbidity",
    unit: "NTU",
    current: 1.8,
    min: 0.8,
    max: 3.2,
    avg: 1.9,
    safeRange: "0 - 5 NTU",
    status: "Normal",
    history: series(1.8, 24, 0.4),
  },
  waterLevel: {
    key: "waterLevel",
    label: "Water Level",
    unit: "%",
    current: 78,
    min: 62,
    max: 96,
    avg: 78,
    safeRange: "70 - 100%",
    status: "Normal",
    history: series(78, 24, 3),
  },
  ammonia: {
    key: "ammonia",
    label: "Ammonia",
    unit: "mg/L",
    current: 0.02,
    min: 0.0,
    max: 0.06,
    avg: 0.03,
    safeRange: "0 - 0.1 mg/L",
    status: "Normal",
    history: series(0.02, 24, 0.01),
  },
};

// -------------------------------------------------------------------------
// AI Agent — observation / decision / activity log
// -------------------------------------------------------------------------
export const aiAgent = {
  active: true,
  observations: [
    { label: "Temperature", status: "Normal" },
    { label: "Oxygen", status: "Slightly decreasing" },
    { label: "Water clarity", status: "Normal" },
    { label: "Fish activity", status: "Normal" },
  ],
  decision: {
    summary:
      "Detected decreasing dissolved oxygen. Air pump activated automatically.",
  },
  flow: [
    { stage: "Observation", detail: "Oxygen \u2193" },
    { stage: "Analysis", detail: "DO level risk" },
    { stage: "Decision", detail: "Aeration required" },
    { stage: "Action", detail: "Air pump ON" },
  ],
  activityLog: [
    { time: "09:30", event: "Oxygen decreased" },
    { time: "09:30", event: "Air pump activated" },
    { time: "09:42", event: "Oxygen returned to normal" },
    { time: "09:42", event: "Air pump stopped" },
  ],
};

// -------------------------------------------------------------------------
// Automation & Device Control
// -------------------------------------------------------------------------
export const devices = [
  {
    id: "heater",
    name: "Heater",
    icon: "Flame",
    on: true,
    mode: "Automatic",
    detail: "Temp 26.8°C",
    lastAction: "Started heating",
  },
  {
    id: "cooling",
    name: "Cooling Fan / Chiller",
    icon: "Fan",
    on: false,
    mode: "Automatic",
    detail: "Temp 27.4°C",
    lastAction: "Idle",
  },
  {
    id: "airpump",
    name: "Air Pump",
    icon: "Wind",
    on: true,
    mode: "Automatic",
    detail: "Reason: Low oxygen",
    lastAction: "Turned ON at 09:30",
  },
  {
    id: "waterpump",
    name: "Water Pump",
    icon: "Waves",
    on: false,
    mode: "Automatic",
    detail: "Reason: Filtration cycle",
    lastAction: "Idle",
  },
  {
    id: "filter",
    name: "Filter",
    icon: "Filter",
    on: true,
    mode: "Automatic",
    detail: "Normal operation",
    lastAction: "Running",
  },
  {
    id: "feeder",
    name: "Automatic Feeder",
    icon: "Utensils",
    on: false,
    mode: "Manual",
    detail: "Next feed 12:30 PM",
    lastAction: "Last fed 08:00 AM",
  },
  {
    id: "light",
    name: "Aquarium Light",
    icon: "Lightbulb",
    on: true,
    mode: "Automatic",
    detail: "Day/night cycle",
    lastAction: "Turned ON at 07:00 AM",
  },
];

// Simple frontend automation logic used by the Automation page
export function getTemperatureAction(temp) {
  if (temp > 30) return { label: "Cooling ON", tone: "bad" };
  if (temp < 24) return { label: "Heating ON", tone: "warn" };
  return { label: "Normal", tone: "good" };
}

export function getOxygenAction(oxygen) {
  if (oxygen < 5) return { label: "Air Pump ON", tone: "bad" };
  return { label: "Normal", tone: "good" };
}

// -------------------------------------------------------------------------
// AI Predictions
// -------------------------------------------------------------------------
export const predictions = [
  {
    id: "temp",
    icon: "Thermometer",
    title: "Temperature Prediction",
    body: "Temperature may increase during the next 6 hours.",
    current: "27.4°C",
    predicted: "29.1°C",
    window: "6 hours",
    risk: "Medium",
    recommendation: "Monitor temperature and keep cooling fan ready.",
  },
  {
    id: "oxygen",
    icon: "Wind",
    title: "Oxygen Prediction",
    body: "Dissolved oxygen may fall below the safe level tonight.",
    current: "6.8 mg/L",
    predicted: "4.8 mg/L",
    window: "5 hours",
    risk: "High",
    recommendation: "Increase aeration if the downward trend continues.",
  },
  {
    id: "quality",
    icon: "Droplets",
    title: "Water Quality Prediction",
    body: "Water quality is gradually deteriorating.",
    current: "1.8 NTU",
    predicted: "2.9 NTU",
    window: "12 hours",
    risk: "Medium",
    recommendation: "Run filter and check for debris.",
  },
  {
    id: "ph",
    icon: "FlaskConical",
    title: "pH Prediction",
    body: "pH level will remain stable.",
    current: "7.2",
    predicted: "7.3",
    window: "24 hours",
    risk: "Low",
    recommendation: "No action needed.",
  },
];

// -------------------------------------------------------------------------
// Fish Health
// -------------------------------------------------------------------------
export const fishHealth = {
  overallHealth: 94,
  numberOfFish: 5,
  activity: "Normal",
  swimmingPattern: "Normal",
  feedingBehavior: "Normal",
  abnormalBehavior: "None",
  analysis: [
    { label: "Behavior", status: "Normal" },
    { label: "Movement", status: "Normal" },
    { label: "Feeding", status: "Normal" },
    { label: "Possible Risks", status: "None detected" },
  ],
};

// -------------------------------------------------------------------------
// Feeding
// -------------------------------------------------------------------------
export const feeding = {
  nextFeeding: "12:30 PM",
  dailySchedule: ["8:00 AM", "1:00 PM", "7:00 PM"],
  recommendation:
    "Reduce today's feeding quantity because fish activity is lower than usual.",
  history: [
    { datetime: "Apr 24, 2025 · 08:02 AM", amount: "Small", type: "Automatic", status: "Completed" },
    { datetime: "Apr 23, 2025 · 01:00 PM", amount: "Medium", type: "Automatic", status: "Completed" },
    { datetime: "Apr 23, 2025 · 07:01 PM", amount: "Medium", type: "Manual", status: "Completed" },
    { datetime: "Apr 22, 2025 · 08:00 AM", amount: "Small", type: "Automatic", status: "Completed" },
  ],
};

// -------------------------------------------------------------------------
// Alerts & Notifications
// -------------------------------------------------------------------------
export const alerts = [
  { time: "10:32 AM", parameter: "Oxygen", severity: "Critical", description: "Dissolved oxygen is critically low.", action: "Air pump ON" },
  { time: "09:45 AM", parameter: "Temperature", severity: "Warning", description: "Temperature is approaching the upper limit.", action: "Cooling fan ON" },
  { time: "08:20 AM", parameter: "Fish Behavior", severity: "Warning", description: "Abnormal fish behavior detected.", action: "Alert sent" },
  { time: "07:15 AM", parameter: "Water Level", severity: "Information", description: "Water level is normal.", action: "-" },
  { time: "06:42 AM", parameter: "Filter", severity: "Information", description: "Filter is working properly.", action: "-" },
  { time: "05:10 AM", parameter: "Feeder", severity: "Information", description: "Automatic feeding completed.", action: "-" },
];

// -------------------------------------------------------------------------
// Automation History
// -------------------------------------------------------------------------
export const automationHistory = [
  { time: "10:15 AM", parameter: "Temperature", action: "Cooling fan ON", value: "29.8°C" },
  { time: "10:32 AM", parameter: "Temperature", action: "Cooling fan OFF", value: "27.5°C" },
  { time: "11:05 AM", parameter: "Oxygen", action: "Air pump ON", value: "4.9 mg/L" },
  { time: "11:20 AM", parameter: "Oxygen", action: "Air pump OFF", value: "6.1 mg/L" },
  { time: "12:45 PM", parameter: "Water Level", action: "Water pump ON", value: "78%" },
  { time: "01:10 PM", parameter: "Water Level", action: "Water pump OFF", value: "82%" },
  { time: "03:20 PM", parameter: "Light", action: "Light ON", value: "-" },
  { time: "07:00 PM", parameter: "Light", action: "Light OFF", value: "-" },
];

// -------------------------------------------------------------------------
// Maintenance
// -------------------------------------------------------------------------
export const maintenance = [
  { id: "filter", name: "Filter", status: "Cleaning recommended", due: "Due in 2 days", tone: "warn" },
  { id: "waterchange", name: "Water Change", status: "Recommended in 2 days", due: "Due in 2 days", tone: "warn" },
  { id: "sensor", name: "Sensor", status: "Working normally", due: "No action needed", tone: "good" },
  { id: "feeder", name: "Feeder", status: "Working normally", due: "No action needed", tone: "good" },
];

export const maintenanceRecommendation =
  "Consider cleaning the filter soon to maintain optimal water quality and performance.";