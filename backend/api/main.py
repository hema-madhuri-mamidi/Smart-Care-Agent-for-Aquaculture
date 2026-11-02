
from pathlib import Path
from datetime import datetime
import sys

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

# Locate the existing Decision Support module.
PROJECT_ROOT = Path(__file__).resolve().parents[2]
DECISION_SUPPORT_DIR = PROJECT_ROOT / "03-decision-support"

sys.path.insert(0, str(DECISION_SUPPORT_DIR))

from decision_engine.decision_engine import (
    evaluate_aquarium,
    save_decision,
)
from alert_generation.alert_generator import generate_alert
from alert_generation.alert_history import save_alert
from feeding_schedule.feeding_reminder import check_feeding_time
from backend.api.services.temperature_ml_client import predict_temperature


app = FastAPI(
    title="Aquaculture Care Agent API",
    description="Decision support, aquarium alerts and feeding reminders.",
    version="1.0.0",
)


class DecisionRequest(BaseModel):
    timestamp: str | None = None
    readings: dict[str, float]
    predicted_temperature: float | None = None
    predicted_risk: str | None = None
    limits: dict[str, float] | None = None


class TemperaturePredictionRequest(BaseModel):
    timestamp: str
    water_temp: float


class FeedingReminderRequest(BaseModel):
    feeding_times: list[str] = Field(
        min_length=1,
        description="Feeding times in HH:MM format",
    )
    current_time: str | None = None


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Aquaculture Care Agent API",
    }


@app.post("/api/temperature-prediction")
def temperature_prediction(request: TemperaturePredictionRequest):
    try:
        result = predict_temperature(
            timestamp=request.timestamp,
            water_temp=request.water_temp,
        )
        return {"temperature_prediction": result}
    except ConnectionError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except (RuntimeError, ValueError) as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@app.post("/api/decision")
@app.post("/api/decision")
def make_decision(request: DecisionRequest):
    try:
        predicted_temperature = request.predicted_temperature
        prediction_result = None

        # Automatically request ML prediction if one was not supplied.
        if predicted_temperature is None:
            try:
                prediction_result = predict_temperature(
                    timestamp=request.timestamp or datetime.now().isoformat(timespec="seconds"),
                    water_temp=request.readings["temperature"],
                )

                if prediction_result.get("status") == "success":
                    predicted_temperature = float(
                        prediction_result["predicted_temperature_c"]
                    )

            except (ConnectionError, RuntimeError, ValueError, KeyError) as exc:
                prediction_result = {
                    "status": "unavailable",
                    "message": str(exc),
                }

        decision = evaluate_aquarium(
            readings=request.readings,
            predicted_temperature=predicted_temperature,
            predicted_risk=request.predicted_risk,
            limits=request.limits,
        )

        save_decision(decision)

        alert = generate_alert(decision)
        save_alert(alert)

        return {
            "decision": decision,
            "alert": alert,
            "temperature_prediction": prediction_result,
        }

    except (ValueError, TypeError, KeyError) as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

@app.post("/api/feeding-reminder")
def feeding_reminder(request: FeedingReminderRequest):
    try:
        reminder = check_feeding_time(
            feeding_times=request.feeding_times,
            current_time=request.current_time,
        )

        return {
            "feeding_reminder": reminder,
        }

    except (ValueError, TypeError) as exc:
        raise HTTPException(
            status_code=422,
            detail=str(exc),
        ) from exc
