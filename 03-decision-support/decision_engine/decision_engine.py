from datetime import datetime
from pathlib import Path
import csv

BASE_DIR = Path(__file__).resolve().parent
HISTORY_FILE = BASE_DIR / "decision_history.csv"

# Illustrative prototype limits only.
# Confirm appropriate limits for the target fish species before deployment.
DEFAULT_LIMITS = {
    "ph_min": 6.5,
    "ph_max": 8.5,
    "temperature_min": 24.0,
    "temperature_max": 30.0,
    "oxygen_critical": 4.0,       # mg/L
    "ammonia_warning": 0.25,      # mg/L; illustrative
    "ammonia_critical": 0.5,      # mg/L; illustrative
    "water_level_min": 20.0,      # percentage
}


def evaluate_aquarium(
    readings,
    predicted_temperature=None,
    limits=None,
    predicted_risk=None,
):
    """Evaluate aquarium readings and return a risk decision."""

    cfg = {**DEFAULT_LIMITS, **(limits or {})}
    required = [
        "ph", "temperature", "dissolved_oxygen",
        "ammonia", "water_level"
    ]

    values = {}
    for key in required:
        if key not in readings or readings[key] is None:
            raise ValueError(f"Missing sensor reading: {key}")
        try:
            values[key] = float(readings[key])
        except (TypeError, ValueError):
            raise ValueError(f"Invalid numeric reading: {key}")

    if not 0 <= values["ph"] <= 14:
        raise ValueError("pH must be between 0 and 14.")
    if values["temperature"] < -5 or values["temperature"] > 60:
        raise ValueError("Temperature reading is outside the accepted input range.")
    if values["dissolved_oxygen"] < 0 or values["ammonia"] < 0:
        raise ValueError("Oxygen and ammonia readings cannot be negative.")
    if not 0 <= values["water_level"] <= 100:
        raise ValueError("Water level must be between 0 and 100 percent.")

    if predicted_temperature is not None:
        predicted_temperature = float(predicted_temperature)

    reasons = []
    recommendations = []
    risk = "Low"
    status = "Normal"

    def add_issue(level, reason, recommendation):
        nonlocal risk, status
        priority = {"Low": 0, "Medium": 1, "High": 2}
        if priority[level] > priority[risk]:
            risk = level
        reasons.append(reason)
        recommendations.append(recommendation)
        status = {"Low": "Normal", "Medium": "Warning",
                  "High": "Critical"}[risk]

    if not cfg["ph_min"] <= values["ph"] <= cfg["ph_max"]:
        add_issue(
            "Medium",
            "pH is outside the configured range.",
            "Recheck the pH sensor and verify water conditions before correcting them."
        )

    if not cfg["temperature_min"] <= values["temperature"] <= cfg["temperature_max"]:
        add_issue(
            "Medium",
            "Current temperature is outside the configured range.",
            "Verify the reading and inspect the heater or cooling equipment."
        )

    if values["dissolved_oxygen"] < cfg["oxygen_critical"]:
        add_issue(
            "High",
            "Dissolved oxygen is below the configured critical threshold.",
            "Verify the reading promptly and check aeration and filtration."
        )

    if values["ammonia"] >= cfg["ammonia_critical"]:
        add_issue(
            "High",
            "Ammonia reached the configured critical threshold.",
            "Verify the reading and promptly follow appropriate aquarium water-quality guidance."
        )
    elif values["ammonia"] >= cfg["ammonia_warning"]:
        add_issue(
            "Medium",
            "Ammonia reached the configured warning threshold.",
            "Recheck ammonia and inspect filtration and water quality."
        )

    if values["water_level"] < cfg["water_level_min"]:
        add_issue(
            "Medium",
            "Water level is below the configured minimum.",
            "Check for evaporation or leakage and restore the level appropriately."
        )

    if predicted_temperature is not None:
        if not -5 <= predicted_temperature <= 60:
            raise ValueError("Predicted temperature is outside the accepted input range.")
        if not cfg["temperature_min"] < predicted_temperature < cfg["temperature_max"]:
            add_issue(
                "Medium",
                "Forecast temperature is outside the configured range; this is a prediction, not a confirmed condition.",
                "Recheck the sensor and inspect temperature-control equipment."
            )

    # Optional output from the trained ML model.
    # The model itself is not implemented in this module.
    if predicted_risk is not None:
        predicted_risk = str(predicted_risk).strip().title()

        if predicted_risk not in {"Low", "Medium", "High"}:
            raise ValueError(
                "predicted_risk must be Low, Medium, or High."
            )

        reasons.append(
            f"Predictive model reported {predicted_risk} aquarium risk."
        )

        if predicted_risk == "High":
            recommendations.append(
                "Promptly verify the water-quality readings and investigate "
                "the cause of the predicted high risk."
            )
        elif predicted_risk == "Medium":
            recommendations.append(
                "Monitor water-quality trends and verify any abnormal readings."
            )
        else:
            recommendations.append(
                "Continue monitoring; a low model-predicted risk does not "
                "override any warning from the decision rules."
            )

        priority = {"Low": 0, "Medium": 1, "High": 2}
        if priority[predicted_risk] > priority[risk]:
            risk = predicted_risk
            status = {
                "Low": "Normal",
                "Medium": "Warning",
                "High": "Critical",
            }[risk]

    if not reasons:
        reasons.append("No configured rule was triggered.")
        recommendations.append("Continue monitoring aquarium conditions.")

    result = {
        "timestamp": datetime.now().astimezone().isoformat(timespec="seconds"),
        "status": status,
        "risk_level": risk,
        "readings": values,
        "predicted_temperature": predicted_temperature,
        "reasons": reasons,
        "recommendations": recommendations,
    }
    return result


def save_decision(result):
    """Append one decision record to a CSV history file."""
    fields = [
        "timestamp", "status", "risk_level", "readings",
        "predicted_temperature", "reasons", "recommendations"
    ]
    row = {
        "timestamp": result["timestamp"],
        "status": result["status"],
        "risk_level": result["risk_level"],
        "readings": str(result["readings"]),
        "predicted_temperature": result["predicted_temperature"],
        "reasons": " | ".join(result["reasons"]),
        "recommendations": " | ".join(result["recommendations"]),
    }

    write_header = not HISTORY_FILE.exists() or HISTORY_FILE.stat().st_size == 0
    with HISTORY_FILE.open("a", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fields)
        if write_header:
            writer.writeheader()
        writer.writerow(row)


if __name__ == "__main__":
    # Synthetic demo readings, not live sensor data.
    sample = {
        "ph": 7.2,
        "temperature": 27.5,
        "dissolved_oxygen": 6.0,
        "ammonia": 0.05,
        "water_level": 80,
    }

    decision = evaluate_aquarium(
        sample,
        predicted_temperature=31.0
    )
    save_decision(decision)

    print("=== AQUARIUM DECISION ===")
    print("Status:", decision["status"])
    print("Risk:", decision["risk_level"])
    print("Reasons:")
    for reason in decision["reasons"]:
        print("-", reason)
    print("Recommendations:")
    for recommendation in decision["recommendations"]:
        print("-", recommendation)
    print("Decision history:", HISTORY_FILE)
