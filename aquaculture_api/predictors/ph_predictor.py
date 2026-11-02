from datetime import datetime
from pathlib import Path

import joblib
import numpy as np
import pandas as pd


class PhPredictor:
    def __init__(self, model_path: Path):
        if not model_path.exists():
            raise FileNotFoundError(f"Model not found: {model_path}")

        bundle = joblib.load(model_path)
        self.model = bundle["model"]
        self.features = bundle["feature_columns"]
        self.horizon = bundle["forecast_minutes"]
        self.version = bundle.get("model_version")

    def predict(self, timestamp: datetime, readings: dict[str, float]):
        hour = timestamp.hour + timestamp.minute / 60
        row = {
            "current_pH": readings["current_ph"],
            "pH_5min_ago": readings["ph_5min_ago"],
            "pH_10min_ago": readings["ph_10min_ago"],
            "pH_15min_ago": readings["ph_15min_ago"],
            "hour_sin": np.sin(2 * np.pi * hour / 24),
            "hour_cos": np.cos(2 * np.pi * hour / 24),
        }

        features = pd.DataFrame([row])[self.features]
        predicted = float(self.model.predict(features)[0])
        result = {
            "status": "success",
            "current_ph": readings["current_ph"],
            "predicted_ph": round(predicted, 4),
            "forecast_horizon_minutes": self.horizon,
            "forecast_timestamp": (
                timestamp + pd.Timedelta(minutes=self.horizon)
            ).isoformat(),
        }
        if self.version is not None:
            result["model_version"] = self.version
        return result
