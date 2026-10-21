
import csv
import json
from pathlib import Path

HISTORY_FILE = Path(__file__).resolve().parent / "alert_history.csv"

FIELDNAMES = [
    "timestamp",
    "alert_type",
    "priority",
    "risk_level",
    "status",
    "message",
    "recommended_actions",
]


def save_alert(alert):
    """Append a structured alert to a separate CSV history file."""

    if not alert:
        return False

    with HISTORY_FILE.open("a", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)

        if file.tell() == 0:
            writer.writeheader()

        row = {
            field: alert.get(field, "")
            for field in FIELDNAMES
        }

        # Store the list of recommended actions as JSON text.
        row["recommended_actions"] = json.dumps(
            row["recommended_actions"],
            ensure_ascii=False,
        )

        writer.writerow(row)

    return True
