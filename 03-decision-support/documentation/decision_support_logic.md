# Decision Support Logic

## Aquarium Care Agent

The Decision Support Logic evaluates supplied aquarium water-quality readings, classifies risk, explains detected conditions, and generates actionable recommendations.

The current prototype uses threshold-based rules for pH, temperature, dissolved oxygen, ammonia, and water level. It also supports an optional predicted-temperature input.

## 1. Decision Levels

- **Normal — Low Risk:** No configured rule was triggered. Continue monitoring aquarium conditions.
- **Warning — Medium Risk:** One or more conditions require attention. Verify the reading and inspect relevant equipment.
- **Critical — High Risk:** A configured critical condition was detected. Verify the reading promptly and take appropriate corrective action.

The final status reflects the highest risk level triggered by the configured rules.

## 2. Implemented Decision Rules

The prototype uses default thresholds that can be overridden through the `limits` parameter. The following values are illustrative and must be validated for the target fish species and aquarium before real-world use.

| Parameter | Configured rule |
|---|---|
| pH | Warning if below 6.5 or above 8.5 |
| Temperature | Warning if below 24°C or above 30°C |
| Dissolved oxygen | Critical if below 4.0 mg/L |
| Ammonia | Warning at 0.25 mg/L or higher; Critical at 0.5 mg/L or higher |
| Water level | Warning if below 20% |

The prototype generates reasons and recommendations for detected conditions.

## 3. Prediction-Aware Warning

The decision engine accepts an optional `predicted_temperature` value. If the supplied prediction is outside the configured temperature range, it generates a warning and identifies the condition as a forecast rather than a confirmed reading.

The trained predictive model has not yet been verified as connected to this input. Until that integration is tested, the prediction must be treated as a supplied demonstration value.

## 4. Decision Process

1. Receive aquarium readings.
2. Validate required readings and supported input ranges.
3. Compare readings with configured thresholds.
4. Determine the highest triggered risk level.
5. Generate decision reasons and recommendations.
6. Return the decision result.
7. Save the decision to CSV when the save function is called.

The decision result includes a timestamp, status, risk level, readings, optional predicted temperature, reasons, and recommendations.

## 5. Alert Generation and History

The alert-generation module converts decision results into aquarium-health alerts with a priority, message, risk level, and recommended actions.

Alert records are saved to:

`alert_generation/alert_history.csv`

Decision records are saved to:

`decision_engine/decision_history.csv`

The history files have been checked and contain records from Normal, Warning, Critical, and feeding-reminder tests.

## 6. Scheduled Feeding Reminders

The scheduled feeding prototype checks the configured feeding times every 10 seconds and generates a reminder when a scheduled time is reached. Duplicate protection prevents repeated alerts for the same scheduled minute on the same day.

The scheduler was tested using a temporary test time, and an alert was generated and saved successfully.

The default example schedule is 08:00, 14:00, and 20:00. These are example times and must be replaced with the aquarium's approved feeding schedule when appropriate.

The current implementation generates and records reminders; it does not itself deliver phone push notifications.

## 7. API Integration

A FastAPI service is available through `backend/api/main.py`.

- `GET /api/health` checks whether the API is running.
- `POST /api/decision` accepts aquarium readings, evaluates the decision, generates an alert, saves decision and alert history, and returns the results.

The health endpoint and decision endpoint were tested successfully with Normal, Warning, and Critical example inputs.

The API returns its results to the caller. Successful API responses do not establish that a dashboard or phone notification service is connected.

## 8. Testing Status

The following behaviors have been tested during prototype development:

- Normal, Warning, and Critical decision classifications.
- pH and temperature warning scenarios.
- Critically low dissolved oxygen.
- Prediction-aware temperature warning.
- Missing or invalid reading handling in decision-engine tests.
- Decision and alert history saving.
- Feeding reminder generation.
- Scheduled feeding trigger using a temporary test time.
- API health check and decision requests for Normal, Warning, and Critical conditions.

These tests establish prototype behavior only. They do not establish live sensor accuracy, real-world fish-health prediction accuracy, or production readiness.

## 9. Current Limitations and Remaining Verification

- The current tests use demonstration readings rather than verified live sensor data.
- Thresholds require validation for the target fish species and aquarium.
- The trained predictive model connection has not yet been verified.
- Live sensor integration has not yet been verified.
- Dashboard display and phone notification delivery have not been verified as part of this module.
- Final regression testing and documentation review should be completed before declaring the module finished.

## 10. Purpose of This Module

The Decision Support Logic converts supplied aquarium readings into understandable risk classifications, reasons, recommendations, and alerts. Its API and CSV history provide outputs that can be consumed by other project components. Dashboard presentation, trained-model connectivity, live sensor input, and phone notification delivery require separate integration and verification.