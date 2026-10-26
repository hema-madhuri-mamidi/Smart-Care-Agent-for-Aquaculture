
import csv
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from decision_engine.decision_engine import evaluate_aquarium
from alert_generation.alert_generator import generate_alert
from alert_generation.alert_history import save_alert


class TestDecisionSupportIntegration(unittest.TestCase):

    def setUp(self):
        self.normal_readings = {
            "ph": 7.2,
            "temperature": 27.5,
            "dissolved_oxygen": 6.0,
            "ammonia": 0.05,
            "water_level": 80,
        }

    def test_normal_decision(self):
        decision = evaluate_aquarium(self.normal_readings)

        self.assertEqual(decision["status"], "Normal")
        self.assertEqual(decision["risk_level"], "Low")

        for field in [
            "timestamp",
            "status",
            "risk_level",
            "readings",
            "predicted_temperature",
            "reasons",
            "recommendations",
        ]:
            self.assertIn(field, decision)

        print("Normal decision test: PASS")

    def test_warning_alert_generation(self):
        readings = {**self.normal_readings, "temperature": 31.0}
        decision = evaluate_aquarium(readings)
        alert = generate_alert(decision)

        self.assertEqual(decision["status"], "Warning")
        self.assertEqual(alert["priority"], "WARNING")
        self.assertEqual(alert["alert_type"], "AQUARIUM_HEALTH")

        print("Warning alert integration test: PASS")

    def test_critical_alert_generation(self):
        readings = {
            **self.normal_readings,
            "dissolved_oxygen": 3.0,
        }
        decision = evaluate_aquarium(readings)
        alert = generate_alert(decision)

        self.assertEqual(decision["status"], "Critical")
        self.assertEqual(alert["priority"], "CRITICAL")

        print("Critical alert integration test: PASS")

    def test_alert_history_save(self):
        readings = {
            **self.normal_readings,
            "dissolved_oxygen": 3.0,
        }
        decision = evaluate_aquarium(readings)
        alert = generate_alert(decision)

        # Use a temporary CSV so the real alert history is unchanged.
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_file = Path(temp_dir) / "test_alert_history.csv"

            with patch(
                "alert_generation.alert_history.HISTORY_FILE",
                temp_file,
            ):
                save_alert(alert)

            with temp_file.open(
                "r", newline="", encoding="utf-8"
            ) as file:
                rows = list(csv.DictReader(file))

        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]["priority"], "CRITICAL")
        self.assertEqual(rows[0]["alert_type"], "AQUARIUM_HEALTH")

        print("Alert history integration test: PASS")


if __name__ == "__main__":
    unittest.main(verbosity=2)
