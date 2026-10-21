import random
from datetime import datetime


def generate_readings():
    """Generate changing synthetic readings for prototype testing."""
    return {
        "ph": round(random.uniform(6.0, 9.0), 2),
        "temperature": round(random.uniform(23.0, 33.0), 2),
        "dissolved_oxygen": round(random.uniform(2.0, 8.0), 2),
        "ammonia": round(random.uniform(0.0, 0.7), 2),
        "water_level": round(random.uniform(10.0, 100.0), 2),
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "data_source": "synthetic_simulator",
    }


if __name__ == "__main__":
    print("Dynamic sensor simulator test")
    for _ in range(5):
        print(generate_readings())
