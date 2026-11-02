# Decision Support Logic

## Overview

This module evaluates aquarium water-quality readings using configurable threshold-based rules. It assigns a status and risk level and provides reasons and recommendations.

## Implemented Features

- Validates pH, temperature, dissolved oxygen, ammonia, and water level.
- Evaluates readings against configurable thresholds.
- Assigns Normal, Warning, or Critical status.
- Assigns Low, Medium, or High risk.
- Reports multiple abnormal conditions in one evaluation.
- Generates reasons and recommendations.
- Supports optional predicted-temperature evaluation.
- Saves decisions in a CSV history file.
- Includes seven prototype tests covering decision scenarios and input validation.

## Project Structure

- `decision_engine/decision_engine.py` - Decision logic and CSV history function.
- `decision_engine/test_decision_engine.py` - Decision and input-validation tests.
- `decision_engine/decision_history.csv` - Saved decision history.
- `documentation/` - Decision-support documentation and diagrams.
- `rules/` - Reserved for future rule organization.

## How to Run

Run these commands from the `03-decision-support` directory.

Run the decision engine:

`python .\decision_engine\decision_engine.py`

Run the tests:

`python .\decision_engine\test_decision_engine.py`

## Integration Example

Another Python component can import the evaluation function and pass readings as a dictionary.

```python
from decision_engine import evaluate_aquarium

readings = {
    "ph": 7.2,
    "temperature": 27.5,
    "dissolved_oxygen": 6.0,
    "ammonia": 0.05,
    "water_level": 80,
}

decision = evaluate_aquarium(readings)

print(decision["status"])
print(decision["risk_level"])
print(decision["reasons"])
print(decision["recommendations"])
```

The function returns a dictionary containing the timestamp, status, risk level, readings, optional predicted temperature, reasons, and recommendations. The example demonstrates a Python function call; it does not create a web API or connect a dashboard.

## Test Results

The following seven prototype tests passed:

- Normal readings.
- pH warning.
- Critical dissolved oxygen.
- Multiple critical conditions.
- Missing sensor reading.
- Non-numeric sensor reading.
- pH outside the accepted input range.

These tests verify the current prototype logic, not live sensor accuracy or real-world fish-health outcomes.

## Decision History

Decision records are appended to `decision_engine/decision_history.csv` when the save function is called. Records include the timestamp, status, risk level, readings, optional predicted temperature, reasons, and recommendations.

## Limitations

- Demo readings are synthetic, not live sensor data.
- Thresholds are illustrative and require validation for the target fish species.
- The optional predicted temperature is a demonstration input, not a trained ML prediction.
- A web API, live sensor integration, predictive-model integration, dashboard alerts, scheduled feeding alerts, and phone notifications are not yet implemented.
