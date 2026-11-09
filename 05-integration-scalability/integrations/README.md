# Integration & Scalability

## Overview
This module is responsible for connecting the different software components of the AI-Powered Smart Aquarium Management System and ensuring smooth communication between them.

## Responsibilities
- Integrating the predictive model with the decision-support system.
- Connecting the FastAPI backend with the React frontend.
- Integrating aquarium sensor data with backend APIs.
- Connecting feeding reminder functionality.
- Implementing sensor connection monitoring.
- Handling API communication, input validation and error responses.
- Maintaining integration documentation and API contracts.

## Integration Components

| Component | File Location | Purpose |
|---|---|---|
| FastAPI Backend | `backend/api/main.py` | Provides APIs and connects system modules |
| Temperature Prediction | `backend/predictive_models/` | Predicts future aquarium temperature |
| Frontend API Service | `04-user-interface/web/src/services/aquariumApi.js` | Connects frontend with backend |
| Dashboard Integration | `04-user-interface/web/src/pages/Dashboard.jsx` | Displays decisions, alerts and sensor status |
| Feeding Reminder | `03-decision-support/feeding_schedule/` | Provides feeding reminder functionality |

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Checks backend availability |
| POST | `/api/decision` | Evaluates aquarium conditions |
| POST | `/api/predict/temperature` | Predicts temperature |
| POST | `/api/evaluate` | Combines prediction and decision evaluation |
| POST | `/api/feeding-reminder` | Checks feeding reminders |
| GET | `/api/sensor-status` | Reports sensor connection status |

## Sensor Communication
The backend provides an API endpoint for receiving timestamped sensor readings from the ESP32 hardware.

**Endpoint:** `POST /api/evaluate`

Expected sensor fields:
- `timestamp`
- `ph`
- `temperature`
- `dissolved_oxygen`
- `ammonia`
- `water_level`

The sensor API contract is maintained in:

`../protocols/SENSOR_API_CONTRACT.md`

Actual ESP32 communication and hardware-level verification are pending hardware integration.

## Sensor Connection Monitoring
The system tracks sensor readings received by the backend.

- **Waiting:** No sensor readings have been received.
- **Connected:** A reading has been received within the last 10 minutes.
- **Stale:** No recent reading has been received for more than 10 minutes.
- **Unavailable:** The frontend cannot access the sensor-status API.

The frontend checks sensor status every 30 seconds.

## Documentation
Detailed integration information is maintained in:

`../documentation/integration_scalability.md`

## Current Integration Status
- Backend and frontend API integration implemented.
- Temperature prediction integrated with decision support.
- Feeding reminder API integrated.
- Sensor API contract documented.
- Sensor connection monitoring implemented.
- Live ESP32 hardware communication and end-to-end verification pending.

---
**Module:** Integration & Scalability  
**Project:** AI-Powered Smart Aquarium Management System