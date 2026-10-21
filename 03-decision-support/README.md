# Decision Support Logic - Smart Care Agent for Aquaculture

## 1. Objective
The Decision Support Logic evaluates water-quality readings and provides risk levels, warnings, and actionable recommendations to help fish farmers respond to potential problems.

## 2. Implemented Features

### A. Threshold-Based Rules
Evaluates pH, temperature, dissolved oxygen, ammonia, and water level against configurable limits. Identifies normal, warning, and critical conditions.

### B. Prediction-Aware Warnings
Supports predicted temperature and an optional predicted-risk value. Predictions can influence the decision output. The actual trained machine-learning model is not yet connected.

### C. Actionable Recommendations
Generates recommendations based on detected conditions, such as checking aeration and filtration, inspecting temperature-control equipment, and rechecking sensor readings.

### D. Decision History
Stores evaluated decisions in a CSV file, including timestamps, readings, risk levels, reasons, and recommendations.

## 3. Integration
The decision engine can be called through the backend API. The `/api/decision` endpoint accepts sensor readings and optional prediction inputs.

## 4. Testing
The decision engine and integration tests have been executed successfully. All 17 tests passed in the latest full test run.

## 5. Current Limitations
- Sensor readings used in the simulator are synthetic, not live hardware data.
- The trained predictive model has not yet been integrated.
- Default thresholds are illustrative prototype values and require validation for the target fish species before real-world use.
- Recommendations are decision-support guidance and should be verified against appropriate aquaculture practices.

## 6. Next Steps
1. Integrate the predictive model when its actual interface and outputs are available.
2. Validate thresholds for the target species.
3. Document and demonstrate the decision engine using tested scenarios.

