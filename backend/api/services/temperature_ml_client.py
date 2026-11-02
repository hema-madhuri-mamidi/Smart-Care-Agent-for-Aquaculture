import json
import os
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError


API_URL = os.getenv(
    "TEMPERATURE_PREDICTION_API_URL",
    "http://127.0.0.1:5000/reading"
)


def predict_temperature(timestamp: str, water_temp: float):
    """Send a water-temperature reading to the friend's ML prediction API."""

    payload = {
        "timestamp": timestamp,
        "water_temp": float(water_temp)
    }

    request = Request(
        API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urlopen(request, timeout=10) as response:
            result = json.loads(response.read().decode("utf-8"))

        if not isinstance(result, dict):
            raise ValueError("Invalid prediction API response.")

        return result

    except HTTPError as exc:
        raise RuntimeError(
            f"Prediction API returned HTTP {exc.code}."
        ) from exc

    except URLError as exc:
        raise ConnectionError(
            "Temperature ML service is unavailable. "
            "Start the friend's Flask API first."
        ) from exc

    except (json.JSONDecodeError, TimeoutError) as exc:
        raise RuntimeError(
            "Could not read the prediction API response."
        ) from exc
