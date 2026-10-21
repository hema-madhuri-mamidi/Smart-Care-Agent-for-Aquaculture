
import unittest
import csv
import tempfile
from pathlib import Path
from unittest.mock import patch
from decision_engine import decision_engine
from decision_engine.decision_engine import evaluate_aquarium


class TestDecisionEngine(unittest.TestCase):

    def setUp(self):
        self.normal_readings = {
            "ph": 7.2,
            "temperature": 27.5,
            "dissolved_oxygen": 6.0,
            "ammonia": 0.05,
            "water_level": 80,
        }

    def test_normal_conditions(self):
        result = evaluate_aquarium(self.normal_readings)
        self.assertEqual(result["status"], "Normal")
        self.assertEqual(result["risk_level"], "Low")

    def test_warning_conditions(self):
        readings = {**self.normal_readings, "ph": 6.0}
        result = evaluate_aquarium(readings)
        self.assertEqual(result["status"], "Warning")
        self.assertEqual(result["risk_level"], "Medium")

    def test_critical_conditions(self):
        readings = {
            **self.normal_readings,
            "dissolved_oxygen": 3.0,
        }
        result = evaluate_aquarium(readings)
        self.assertEqual(result["status"], "Critical")
        self.assertEqual(result["risk_level"], "High")

    def test_multiple_critical_issues(self):
        readings = {
            **self.normal_readings,
            "dissolved_oxygen": 3.0,
            "ammonia": 0.6,
        }
        result = evaluate_aquarium(readings)
        self.assertEqual(result["status"], "Critical")
        self.assertEqual(result["risk_level"], "High")
        self.assertGreaterEqual(len(result["reasons"]), 2)

    def test_missing_sensor_reading(self):
        readings = self.normal_readings.copy()
        del readings["ph"]

        with self.assertRaises(ValueError):
            evaluate_aquarium(readings)

    def test_non_numeric_sensor_reading(self):
        readings = {**self.normal_readings, "ph": "invalid"}

        with self.assertRaises(ValueError):
            evaluate_aquarium(readings)

    def test_ph_outside_accepted_range(self):
        readings = {**self.normal_readings, "ph": 15}

        with self.assertRaises(ValueError):
            evaluate_aquarium(readings)
    
    def test_predicted_temperature_at_upper_limit_warns(self):
        result = evaluate_aquarium(
            self.normal_readings,
            predicted_temperature=30.0,
        )

        self.assertEqual(result["status"], "Warning")
        self.assertTrue(
            any("prediction" in reason.lower() for reason in result["reasons"])
        )

    def test_predicted_temperature_within_range(self):
        result = evaluate_aquarium(
            self.normal_readings,
            predicted_temperature=29.0,
        )

        self.assertEqual(result["status"], "Normal")
    
    
    def test_predicted_high_risk_raises_normal_decision(self):
        result = evaluate_aquarium(
            self.normal_readings,
            predicted_risk="High",
        )

        self.assertEqual(result["status"], "Critical")
        self.assertEqual(result["risk_level"], "High")
        self.assertTrue(
            any("Predictive model reported High" in reason
                for reason in result["reasons"])
        )

    def test_predicted_low_risk_does_not_lower_critical_decision(self):
        readings = {
            **self.normal_readings,
            "dissolved_oxygen": 3.0,
        }

        result = evaluate_aquarium(
            readings,
            predicted_risk="Low",
        )

        self.assertEqual(result["status"], "Critical")
        self.assertEqual(result["risk_level"], "High")

    def test_invalid_predicted_risk_raises_error(self):
        with self.assertRaises(ValueError):
            evaluate_aquarium(
                self.normal_readings,
                predicted_risk="Unknown",
            )
   
    
    def test_decision_history_save(self):
        result = evaluate_aquarium(self.normal_readings)

        with tempfile.TemporaryDirectory() as temp_dir:
            temp_file = Path(temp_dir) / "test_decision_history.csv"

            with patch.object(decision_engine, "HISTORY_FILE", temp_file):
                decision_engine.save_decision(result)

            with temp_file.open(
                "r", newline="", encoding="utf-8"
            ) as file:
                rows = list(csv.DictReader(file))

        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]["status"], result["status"])
        self.assertEqual(rows[0]["risk_level"], result["risk_level"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
