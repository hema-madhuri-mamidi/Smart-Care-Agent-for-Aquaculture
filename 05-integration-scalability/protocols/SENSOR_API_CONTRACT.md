# Sensor API Contract

## 1. Purpose

This document defines the data format and communication requirements for sending aquarium sensor readings from the ESP32 to the FastAPI backend of the AI-Powered Smart Aquarium Management System.

## 2. API Details

| Property | Value |
|---|---|
| Method | POST |
| Endpoint | `/api/evaluate` |
| Content-Type | `application/json` |
| Backend framework | FastAPI |
| Local development URL | `http://127.0.0.1:8000/api/evaluate` |

The production URL will be determined during deployment.

## 3. Request Payload

The ESP32 must send the following fields:

| Field | Data type | Description | Unit |
|---|---|---|---|
| timestamp | String (ISO 8601) | Time when readings are captured | Date and time |
| ph | Number | Aquarium water pH | pH scale |
| temperature | Number | Current water temperature | Celsius |
| dissolved_oxygen | Number | Dissolved oxygen concentration | mg/L |
| ammonia | Number | Ammonia concentration | mg/L |
| water_level | Number | Aquarium water level | Percentage |

All six fields are required.

## 4. Sample Request

The following is an illustrative example, not actual sensor data.

```json
{
  "timestamp": "2026-11-09T14:30:00+05:30",
  "ph": 7.2,
  "temperature": 27.4,
  "dissolved_oxygen": 6.5,
  "ammonia": 0.02,
  "water_level": 85
}
```

## 5. Data Requirements

- All sensor measurements must be numeric.
- Every request must contain all required fields.
- The timestamp must use a valid ISO 8601 date-time format.
- The timestamp should include its timezone offset.
- All measurements in one request should correspond to the same capture time.
- Water level must be represented as a percentage.
- ESP32 should send updated readings at the agreed sampling interval.

## 6. Backend Processing

When the backend receives a request:

1. FastAPI validates the incoming request.
2. The temperature reading and timestamp are passed to the temperature prediction module.
3. The prediction module checks whether sufficient historical readings are available.
4. The decision-support engine evaluates current aquarium conditions.
5. An alert is generated based on the decision.
6. The backend returns the prediction status, decision, and alert.

## 7. Temperature Prediction Requirements

The current temperature prediction model expects readings at five-minute intervals.

It requires historical readings at the configured five-, ten-, and fifteen-minute offsets before producing a forecast.

If sufficient history is unavailable, the backend returns a waiting-for-history status while still evaluating current aquarium conditions.

The prediction history is currently maintained in backend memory. Restarting the backend requires the history to be collected again.

## 8. Response Overview

The `/api/evaluate` endpoint returns these fields:

| Response field | Description |
|---|---|
| prediction_status | Indicates whether prediction succeeded or is waiting for history |
| prediction | Temperature prediction result, or null |
| prediction_message | Explanation when prediction history is insufficient |
| decision | Aquarium decision-support result |
| alert | Generated aquarium alert |

## 9. Error Handling

- HTTP 422: Request validation or invalid temperature-reading errors.
- HTTP 400: Decision evaluation errors.
- ESP32 integration should handle unsuccessful HTTP responses without interrupting future sensor transmissions.

## 10. Integration Notes

- ESP32 is responsible for collecting and transmitting sensor readings.
- FastAPI backend is responsible for prediction, decision evaluation, and alert generation.
- ESP32 does not need to calculate predicted temperature.
- Optional fields such as `predicted_temperature` and `predicted_risk` are not required from ESP32.
- Sensor sampling frequency and transmission reliability should be agreed upon by the hardware and software teams.
- Actual hardware integration must be verified after real sensor data becomes available.

---

**Document:** Sensor API Contract
**Project:** AI-Powered Smart Aquarium Management System
**Owner:** Integration and Scalability
