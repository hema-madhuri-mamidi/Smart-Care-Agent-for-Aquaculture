
import sys
from pathlib import Path

# Add the decision-support folder to Python's import path.
PROJECT_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_DIR))

from decision_engine.decision_engine import evaluate_aquarium
from alert_generation.alert_generator import generate_alert


def test_normal_alert():
    readings = {
        "ph": 7.2,
        "temperature": 27.5,
        "dissolved_oxygen": 6.0,
        "ammonia": 0.05,
        "water_level": 80,
    }

    decision = evaluate_aquarium(readings)
    alert = generate_alert(decision)

    assert alert["priority"] == "INFO"
    assert alert["status"] == "Normal"
    assert alert["alert_type"] == "AQUARIUM_HEALTH"
    assert isinstance(alert["recommended_actions"], list)

    print("Normal alert test: PASS")
    print("Priority:", alert["priority"])
    print("Message:", alert["message"])


def test_critical_alert():
    readings = {
        "ph": 7.2,
        "temperature": 27.5,
        "dissolved_oxygen": 2.0,
        "ammonia": 0.05,
        "water_level": 80,
    }

    decision = evaluate_aquarium(readings)
    alert = generate_alert(decision)

    assert alert["priority"] == "CRITICAL"
    assert alert["risk_level"] == "High"

    print("\nCritical alert test: PASS")
    print("Priority:", alert["priority"])
    print("Message:", alert["message"])


if __name__ == "__main__":
    test_normal_alert()
    test_critical_alert()
