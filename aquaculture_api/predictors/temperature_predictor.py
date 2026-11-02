from collections import deque
from pathlib import Path

import joblib
import numpy as np
import pandas as pd


class MissingHistoryError(ValueError):
    """Raised when an exact historical temperature reading is unavailable."""


class TemperaturePredictor:
    def __init__(self, model_path: Path):
        if not model_path.exists():
            raise FileNotFoundError(f"Model not found: {model_path}")

        bundle = joblib.load(model_path)
        self.model = bundle["model"]
        self.features = bundle["features"]
        self.horizon = bundle["forecast_horizon_minutes"]
        self.version = bundle["model_version"]
        self.readings = deque()

    def add_reading(self, timestamp, temperature):
        timestamp = pd.Timestamp(timestamp)
        temperature = float(temperature)

        if pd.isna(timestamp) or not np.isfinite(temperature):
            raise ValueError("Timestamp and temperature must be valid.")

        if self.readings and timestamp <= self.readings[-1][0]:
            raise ValueError(
                "Reading timestamp must be later than the previous reading."
            )

        self.readings.append((timestamp, temperature))
        cutoff = timestamp - pd.Timedelta(minutes=20)

        while self.readings and self.readings[0][0] < cutoff:
            self.readings.popleft()

    def predict(self):
        if not self.readings:
            raise ValueError("No sensor readings have been received.")

        timestamp, current_temp = self.readings[-1]
        history = dict(self.readings)
        row = {"water_temp": current_temp}

        for minutes in (5, 10, 15):
            target_time = timestamp - pd.Timedelta(minutes=minutes)
            if target_time not in history:
                raise MissingHistoryError(
                    f"Missing reading at {target_time}. "
                    "A reading is required at exactly "
                    f"{minutes} minutes before the latest timestamp."
                )
            row[f"temp_{minutes}min_ago"] = history[target_time]

        minute_of_day = timestamp.hour * 60 + timestamp.minute
        row["hour_sin"] = np.sin(2 * np.pi * minute_of_day / 1440)
        row["hour_cos"] = np.cos(2 * np.pi * minute_of_day / 1440)

        input_data = pd.DataFrame([row])[self.features]
        predicted = float(self.model.predict(input_data)[0])

        return {
            "status": "success",
            "current_temperature_c": round(current_temp, 3),
            "predicted_temperature_c": round(predicted, 3),
            "forecast_horizon_minutes": self.horizon,
            "latest_reading_timestamp": timestamp.isoformat(),
            "forecast_timestamp": (
                timestamp + pd.Timedelta(minutes=self.horizon)
            ).isoformat(),
            "model_version": self.version,
        }
