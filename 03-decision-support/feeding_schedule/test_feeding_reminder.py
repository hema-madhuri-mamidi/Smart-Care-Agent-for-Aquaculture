
from feeding_schedule.feeding_reminder import check_feeding_time


def test_reminder_due():
    result = check_feeding_time(
        ["08:00", "14:00", "20:00"],
        current_time="14:00",
    )

    assert result["reminder_due"] is True
    assert result["alert_type"] == "FEEDING_REMINDER"
    assert "feeding time" in result["message"].lower()

    print("Feeding-time reminder test: PASS")
    print(result["message"])


def test_reminder_not_due():
    result = check_feeding_time(
        ["08:00", "14:00", "20:00"],
        current_time="10:30",
    )

    assert result["reminder_due"] is False
    assert "No feeding reminder" in result["message"]

    print("\nNo-reminder test: PASS")
    print(result["message"])


if __name__ == "__main__":
    test_reminder_due()
    test_reminder_not_due()
