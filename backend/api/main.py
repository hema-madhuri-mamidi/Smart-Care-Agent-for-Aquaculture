# Minimal FastAPI layer for the existing Decision Support modules.
# This file intentionally does not rewrite the logic in the decision engine.
# It only adapts the current Python functions into an HTTP API.

import sys
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Add the project Decision Support directory to Python's import path.
# This matches the actual repository layout and the confirmed working imports.
ROOT_DIR = Path(__file__).resolve().parents[2]
DECISION_SUPPORT_DIR = ROOT_DIR / "03-decision-support"
if str(DECISION_SUPPORT_DIR) not in sys.path:
    sys.path.insert(0, str(DECISION_SUPPORT_DIR))

# Import the existing Decision Support modules without changing their implementation.
from decision_engine.decision_engine import evaluate_aquarium, save_decision
from alert_generation.alert_generator import generate_alert
from alert_generation.alert_history import save_alert

app = FastAPI(
    title="Smart Aquarium Decision Support API",
    version="0.1.0",
    description="Minimal API for the existing decision engine and alert generator.",
)

# Enable local development access for the Vite frontend running on localhost:5173.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DecisionRequest(BaseModel):
    """Expected request body for aquarium decision evaluation."""

    ph: float = Field(..., description="pH reading")
    temperature: float = Field(..., description="Current water temperature in C")
    dissolved_oxygen: float = Field(..., description="Dissolved oxygen reading in mg/L")
    ammonia: float = Field(..., description="Ammonia reading in mg/L")
    water_level: float = Field(..., description="Water level percentage")
    predicted_temperature: float | None = Field(
        default=None,
        description="Optional predicted temperature value for forecasting logic.",
    )
    predicted_risk: str | None = Field(
        default=None,
        description="Optional model prediction: Low, Medium, or High.",
    )


@app.get("/api/health")
def health_check():
    """Simple health endpoint for verifying the API is running."""
    return {
        "status": "ok",
        "message": "Decision Support backend is running.",
    }


@app.post("/api/decision")
def evaluate_decision(request: DecisionRequest):
    """
    Accept aquarium readings and return the decision plus alert output.
    This uses the existing evaluate_aquarium() and generate_alert() functions.
    """
    readings = {
        "ph": request.ph,
        "temperature": request.temperature,
        "dissolved_oxygen": request.dissolved_oxygen,
        "ammonia": request.ammonia,
        "water_level": request.water_level,
    }

    try:
        decision = evaluate_aquarium(
            readings,
            predicted_temperature=request.predicted_temperature,
            predicted_risk=request.predicted_risk,
        )
    except ValueError as exc:
        # Preserve the decision engine's validation messages and return them as HTTP 400.
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    alert = generate_alert(decision)

    # Save history in the same way as the standalone prototype does.
    save_decision(decision)
    save_alert(alert)

    return {
        "decision": decision,
        "alert": alert,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("backend.api.main:app", host="0.0.0.0", port=8000, reload=True)
