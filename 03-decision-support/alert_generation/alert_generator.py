
def generate_alert(decision):
    """
    Convert an aquarium health decision into a structured alert.
    """

    risk_level = decision.get("risk_level", "Unknown")
    status = decision.get("status", "Unknown")
    reasons = decision.get("reasons", [])
    recommendations = decision.get("recommendations", [])

    if risk_level == "High":
        priority = "CRITICAL"
    elif risk_level == "Medium":
        priority = "WARNING"
    elif risk_level == "Low":
        priority = "INFO"
    else:
        priority = "REVIEW"

    if priority == "INFO" and status == "Normal":
        message = "Aquarium conditions are within configured limits."
    elif reasons:
        message = "; ".join(reasons)
    else:
        message = "Aquarium conditions need to be reviewed."

    return {
        "timestamp": decision.get("timestamp"),
        "alert_type": "AQUARIUM_HEALTH",
        "priority": priority,
        "risk_level": risk_level,
        "status": status,
        "message": message,
        "recommended_actions": recommendations,
    }


def generate_feeding_alert(reminder):
    """
    Convert a due feeding reminder into the same alert structure.
    Return None when feeding time is not due.
    """

    if not reminder.get("reminder_due", False):
        return None

    return {
        "timestamp": reminder.get("timestamp"),
        "alert_type": "FEEDING_REMINDER",
        "priority": "INFO",
        "risk_level": "N/A",
        "status": "Reminder Due",
        "message": reminder.get(
            "message",
            "It's feeding time. Check the established feeding plan.",
        ),
        "recommended_actions": [
            "Follow the aquarium's established feeding plan."
        ],
    }
