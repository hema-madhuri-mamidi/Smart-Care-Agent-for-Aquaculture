# Decision Support Logic — Tested Scenarios

## 1. Objective
The Decision Support Logic module evaluates sensor readings using configurable threshold-based rules and provides risk levels, reasons, and actionable recommendations.

## 2. Test Environment
- Project: Smart Care Agent for Aquaculture
- Test method: Python unittest
- Data source: Synthetic sensor readings and simulated predictions
- Automated test result: **17/17 tests passed**

## 3. Scenario 1 — Normal Conditions
**Input:** Sensor readings are within configured limits.

**Expected result:** Normal status, low risk, and continued monitoring.

**Verification:** `test_normal_conditions` and `test_normal_decision` passed.

## 4. Scenario 2 — Critical Conditions
**Input:** Dissolved oxygen falls below the configured critical threshold.

**Expected result:** Critical status, high risk, and a recommendation to verify the reading and inspect aeration and filtration equipment.

**Verification:** `test_critical_conditions` and `test_critical_alert_generation` passed.

## 5. Scenario 3 — Forecast Warning
**Input:** Current sensor readings are acceptable, but a simulated predicted temperature reaches or crosses the configured upper limit.

**Expected result:** A forecast-aware warning when the prediction meets the configured warning condition. A prediction is not treated as a confirmed current measurement.

**Verification:** `test_predicted_temperature_at_upper_limit` and `test_predicted_temperature_within_range` passed.

**Note:** Forecast tests validate the decision logic using supplied prediction values; they do not demonstrate integration with a trained machine-learning model.

## 6. Additional Validation
- Invalid and missing sensor readings
- pH outside the accepted range
- Multiple critical issues
- Predicted-risk handling
- Decision-history saving
- Alert-history saving
- Normal, warning, and critical integration tests

All 17 automated tests passed.

## 7. Limitations
The sensor values and predictions used in the demonstration are synthetic. Thresholds are illustrative prototype values and have not been validated for a specific fish species. Integration with the teammate's trained prediction model remains pending.

## 8. Conclusion
The Decision Support Logic prototype passed all 17 automated tests and demonstrated rule-based decisions, recommendations, prediction-aware test cases, and history/alert handling.
