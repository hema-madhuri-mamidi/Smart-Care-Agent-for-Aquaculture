
import sys
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_DIR))

from feeding_schedule.feeding_reminder import check_feeding_time
from alert_generation.alert_generator import generate_feeding_alert
from alert_generation.alert_history import save_alert


def run_feeding_alert(schedule, current_time=None):
    reminder = check_feeding_time(schedule, current_time)
    alert = generate_feeding_alert(reminder)

    if alert is None:
        print("No feeding alert is due.")
        return None

    save_alert(alert)

    print("Feeding alert generated and saved!")
    print("Priority:", alert["priority"])
    print("Message:", alert["message"])
    print("History:", "alert_generation/alert_history.csv")

    return alert


if __name__ == "__main__":
    # Example time for testing only; replace with your actual feeding schedule.
    run_feeding_alert(["08:00", "14:00", "20:00"], current_time="14:00")
