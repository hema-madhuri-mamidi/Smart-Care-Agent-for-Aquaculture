
import time
from datetime import datetime

from feeding_schedule.run_feeding_alert import run_feeding_alert


# Example schedule only: replace these with your approved feeding times.
FEEDING_TIMES = ["08:00", "14:00", "20:00"]
# Check the clock every 10 seconds.
CHECK_INTERVAL_SECONDS = 10


def start_scheduler():
    alerted_today = set()
    current_date = datetime.now().date()

    print("Feeding reminder scheduler started.")
    print("Scheduled times:", ", ".join(FEEDING_TIMES))
    print("Checking every", CHECK_INTERVAL_SECONDS, "seconds.")
    print("Press Ctrl+C to stop.")

    try:
        while True:
            now = datetime.now()
            today = now.date()

            # Reset daily duplicate protection.
            if today != current_date:
                alerted_today.clear()
                current_date = today

            current_time = now.strftime("%H:%M")
            alert_key = (today.isoformat(), current_time)

            if (
                current_time in FEEDING_TIMES
                and alert_key not in alerted_today
            ):
                run_feeding_alert(
                    FEEDING_TIMES,
                    current_time=current_time,
                )
                alerted_today.add(alert_key)

            time.sleep(CHECK_INTERVAL_SECONDS)

    except KeyboardInterrupt:
        print("\nFeeding reminder scheduler stopped.")


if __name__ == "__main__":
    start_scheduler()
