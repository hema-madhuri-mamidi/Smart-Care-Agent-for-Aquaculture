# Decision Support Logic

## Aquarium Care Agent

The Decision Support Logic is responsible for analyzing aquarium conditions
and providing actionable recommendations to the aquarium owner.

The system uses sensor readings and predicted aquarium health risk to determine
whether the aquarium condition is normal, requires attention, or needs immediate action.

## 1. Decision Levels

The Aquarium Care Agent uses three decision levels:

### Low Risk

The aquarium conditions are within acceptable limits.
No immediate action is required.

### Medium Risk

One or more parameters show an abnormal condition.
The aquarium owner should monitor the aquarium and take corrective action.

### High Risk

A critical condition is detected or multiple parameters indicate serious
risk. The aquarium owner should take immediate corrective action.

## 2. Decision Rules

The Care Agent uses predefined rules to convert aquarium conditions into
actionable recommendations.

### Rule 1 – pH

IF the pH is outside the selected safe range,

THEN:
- classify the condition as abnormal,
- generate a pH warning,
- recommend checking water quality and performing an appropriate partial
  water change if required.

### Rule 2 – Temperature

IF the water temperature is outside the selected acceptable range,

THEN:
- generate a temperature warning,
- recommend checking the aquarium heater or cooling arrangement,
- advise gradual temperature correction.

### Rule 3 – Dissolved Oxygen

IF dissolved oxygen becomes critically low,

THEN:
- generate a high-priority alert,
- recommend increasing aeration,
- advise the aquarium owner to check the filtration and aeration system.

### Rule 4 – Ammonia

IF ammonia concentration becomes high,

THEN:
- generate a critical water-quality alert,
- recommend checking the aquarium and filtration system,
- recommend an appropriate partial water change.

### Rule 5 – Water Level

IF the water level becomes too low,

THEN:
- generate a water-level warning,
- recommend checking for evaporation or leakage,
- recommend restoring the water level appropriately.

## 3. ML Prediction and Rule-Based Decision Support

The Random Forest model provides an aquarium health-risk prediction.
The Decision Support Logic then combines the predicted risk with current
sensor conditions to generate an appropriate recommendation.

For example:

Current Sensor Data
        ↓
Random Forest Prediction
        ↓
Aquarium Health Risk
        ↓
Decision Support Rules
        ↓
Actionable Recommendation

## 4. Example Decisions

### Example 1 – Low Risk

Condition:
All monitored parameters are within acceptable ranges.

Decision:
Continue normal monitoring.

Recommendation:
"No immediate action required. Continue monitoring aquarium conditions."


### Example 2 – Medium Risk

Condition:
A water-quality parameter shows an abnormal value.

Decision:
Generate a warning.

Recommendation:
"Check the affected water-quality parameter and take corrective action."


### Example 3 – High Risk

Condition:
Dissolved oxygen is critically low.

Decision:
Generate a critical alert.

Recommendation:
"Increase aeration immediately and check the aquarium filtration system."


### Example 4 – High Ammonia

Condition:
Ammonia concentration is high.

Decision:
Generate a critical water-quality alert.

Recommendation:
"Check water quality and filtration and perform an appropriate partial
water change."

## 5. Overall Decision Flow

The overall decision process is:

Current Aquarium Data
→ Health Risk Prediction
→ Decision Support Rules
→ Risk Classification
→ Actionable Recommendation
→ Aquarium Owner

The system therefore converts raw sensor information and model predictions
into practical recommendations that can help the aquarium owner respond
to abnormal aquarium conditions.