
import csv

from alert_generation.alert_history import HISTORY_FILE, save_alert


def test_save_feeding_alert():
    alert = {
        "timestamp": "2026-10-10T14:00:00",
        "alert_type": "FEEDING_REMINDER",
        "priority": "INFO",
        "risk_level": "N/A",
        "status": "Reminder Due",
        "message": "It's feeding time!",
        "recommended_actions": [
            "Follow the aquarium's established feeding plan."
        ],
    }

    saved = save_alert(alert)
    assert saved is True
    assert HISTORY_FILE.exists()

    with HISTORY_FILE.open(
        "r", newline="", encoding="utf-8"
    ) as file:
        rows = list(csv.DictReader(file))

    assert any(
        row["alert_type"] == "FEEDING_REMINDER"
        and row["message"] == "It's feeding time!"
        for row in rows
    )

    print("Alert-history test: PASS")
    print("History file:", HISTORY_FILE)


if __name__ == "__main__":
    test_save_feeding_alert()
