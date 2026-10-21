
import time
import random

from sensor_simulator import generate_readings
from decision_engine.decision_engine import evaluate_aquarium, save_decision
from alert_generation.alert_generator import generate_alert
from alert_generation.alert_history import save_alert


def main():
    print("Dynamic Decision Support Demo")
    print("Synthetic readings and simulated forecast only.")
    print("Press Ctrl+C to stop.\n")

    try:
        while True:
            readings = generate_readings()

            sensor_values = {
                key: readings[key]
                for key in (
                    "ph",
                    "temperature",
                    "dissolved_oxygen",
                    "ammonia",
                    "water_level",
                )
            }

            # Simulated forecast for testing, NOT a trained ML prediction.
            predicted_temperature = round(random.uniform(23.0, 33.0), 2)

            decision = evaluate_aquarium(
                sensor_values,
                predicted_temperature=predicted_temperature,
            )

            save_decision(decision)

            alert = generate_alert(decision)
            save_alert(alert)

            print("=" * 55)
            print("Time:", readings["generated_at"])
            print("Source:", readings["data_source"])
            print("Readings:", sensor_values)
            print("Simulated predicted temperature:", predicted_temperature)
            print("Status:", decision["status"])
            print("Risk:", decision["risk_level"])
            print("Reasons:", decision["reasons"])
            print("Recommendations:", decision["recommendations"])

            time.sleep(5)

    except KeyboardInterrupt:
        print("\nDynamic demo stopped.")


if __name__ == "__main__":
    main()
