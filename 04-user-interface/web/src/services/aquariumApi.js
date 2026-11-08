const DECISION_ENDPOINT = "http://127.0.0.1:8000/api/decision";

const requiredReadingFields = [
  "temperature",
  "ph",
  "dissolved_oxygen",
  "ammonia",
  "water_level",
];
const TEMPERATURE_PREDICTION_ENDPOINT =
  "http://127.0.0.1:8000/api/predict/temperature";
const INTEGRATED_EVALUATION_ENDPOINT =
  "http://127.0.0.1:8000/api/evaluate";
export async function predictTemperature(reading) {
  const response = await fetch(TEMPERATURE_PREDICTION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reading),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.detail || "Temperature prediction failed."
    );
  }

  return result;
}
export async function evaluateDecision(readings, predictedTemperature = null) {
  const response = await fetch(DECISION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...readings,
      predicted_temperature: predictedTemperature,
    }),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(`Decision API returned an invalid response (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    const detail = typeof result?.detail === "string" ? result.detail : response.statusText;
    throw new Error(`Decision API error (HTTP ${response.status}): ${detail}`);
  }

  const decision = result?.decision;
  const decisionReadings = decision?.readings;
  const validReadings = requiredReadingFields.every(
    (field) => Number.isFinite(decisionReadings?.[field]),
  );

  if (
    !decision ||
    !validReadings ||
    typeof decision.status !== "string" ||
    typeof decision.risk_level !== "string" ||
    !Array.isArray(decision.recommendations) ||
    typeof result?.alert?.priority !== "string" ||
    typeof result?.alert?.message !== "string"
  ) {
    throw new Error("Decision API response is missing expected decision or alert fields.");
  }

  return result;
}
export async function evaluateDecisionWithPrediction(
  readings,
  temperatureReading = null
) {
  // No timestamped sensor reading yet:
  // continue evaluating current aquarium conditions.
  if (!temperatureReading?.timestamp) {
    const decisionResult = await evaluateDecision(readings);

    return {
      ...decisionResult,
      temperature_prediction: {
        status: "waiting_for_sensor_data",
        message: "Waiting for timestamped sensor readings.",
      },
    };
  }

  // Timestamped reading available:
  // use the combined backend endpoint.
  const response = await fetch(INTEGRATED_EVALUATION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...readings,
      timestamp: temperatureReading.timestamp,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.detail || "Integrated aquarium evaluation failed."
    );
  }

  if (!result?.decision || !result?.alert) {
    throw new Error("Invalid integrated evaluation response.");
  }

  return {
    ...result,
    temperature_prediction: result.prediction
      ? { prediction: result.prediction }
      : {
          status: result.prediction_status,
          message: result.prediction_message,
        },
  };
}

export async function checkFeedingReminder(feedingTimes) {
  const response = await fetch(FEEDING_REMINDER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      feeding_times: feedingTimes,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.detail || "Unable to check feeding reminder."
    );
  }

  if (!result?.feeding_reminder) {
    throw new Error("Invalid feeding reminder response.");
  }

  return result.feeding_reminder;
}
