const DECISION_ENDPOINT = "http://127.0.0.1:8000/api/decision";

const requiredReadingFields = [
  "temperature",
  "ph",
  "dissolved_oxygen",
  "ammonia",
  "water_level",
];

export async function evaluateDecision(readings) {
  const response = await fetch(DECISION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(readings),
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
