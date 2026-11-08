from datetime import datetime


def check_feeding_time(feeding_times, current_time=None):
    """
    Check whether the current time matches a scheduled feeding time.

    feeding_times: list of times in 24-hour HH:MM format.
    current_time: optional HH:MM value for testing.
    """

    if current_time is None:
        current_time = datetime.now().strftime("%H:%M")

    # Validate the current time.
    try:
        datetime.strptime(current_time, "%H:%M")
    except ValueError:
        raise ValueError("Current time must use HH:MM format.")

    # Validate all scheduled feeding times.
    for feeding_time in feeding_times:
        try:
            datetime.strptime(feeding_time, "%H:%M")
        except (ValueError, TypeError):
            raise ValueError(
                f"Invalid feeding time: {feeding_time}. Use HH:MM format."
            )

    reminder_due = current_time in feeding_times

    if reminder_due:
        message = f"It's feeding time! Scheduled time: {current_time}."
    else:
        message = "No feeding reminder is due right now."

    return {
        "timestamp": datetime.now().astimezone().isoformat(
            timespec="seconds"
        ),
        "current_time": current_time,
        "feeding_times": feeding_times,
        "reminder_due": reminder_due,
        "message": message,
        "alert_type": "FEEDING_REMINDER",
    }


if __name__ == "__main__":
    # Example schedule for testing only.
    schedule = ["08:00", "14:00", "20:00"]

    result = check_feeding_time(schedule)

    print("=== AQUARIUM FEEDING REMINDER ===")
    print("Current time:", result["current_time"])
    print("Reminder due:", result["reminder_due"])
    print("Message:", result["message"])
    