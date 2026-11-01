
const API_BASE_URL = "http://127.0.0.1:5000";

export async function sendTemperatureReading(timestamp, waterTemp) {
  const response = await fetch(`${API_BASE_URL}/reading`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timestamp,
      water_temp: Number(waterTemp),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Temperature prediction failed."
    );
  }

  return data;
}

export async function resetTemperatureTestHistory() {
  const response = await fetch(
    `${API_BASE_URL}/api/test/reset-temperature`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not reset test history."
    );
  }

  return data;
}
