
from datetime import datetime
import logging
import math
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

from predictors.ph_predictor import PhPredictor
from predictors.tds_predictor import TdsPredictor
from predictors.temperature_predictor import (
    MissingHistoryError,
    TemperaturePredictor,
)


app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent

predictor = TemperaturePredictor(
    BASE_DIR / "models" / "linear_temperature_model.joblib"
)

ph_predictor = PhPredictor(
    BASE_DIR / "models" / "final_ph_model.joblib"
)

tds_predictor = TdsPredictor(
    BASE_DIR / "models" / "linear_tds_model.joblib"
)

MIN_TEMP_C = 0.0
MAX_TEMP_C = 50.0
FORECAST_HORIZON_MINUTES = 30

logging.basicConfig(level=logging.INFO)


def error_response(message: str, status_code: int = 400):
    return jsonify({
        "status": "error",
        "message": message
    }), status_code


def parse_json_object():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return None, error_response(
            "Send a valid JSON object containing the required fields."
        )

    return data, None


def parse_timestamp(value):
    if not isinstance(value, str) or not value.strip():
        return None, error_response(
            "timestamp must be a non-empty string."
        )

    try:
        timestamp = datetime.fromisoformat(value)
    except (ValueError, TypeError):
        return None, error_response(
            "Invalid timestamp. Use YYYY-MM-DD HH:MM:SS."
        )

    if timestamp.tzinfo is not None:
        return None, error_response(
            "Use a timestamp without a timezone, "
            "for example YYYY-MM-DD HH:MM:SS."
        )

    return timestamp, None


def parse_finite_number(data, field_name):
    if field_name not in data:
        return None, error_response(
            f"{field_name} is required."
        )

    value = data[field_name]

    if isinstance(value, bool):
        return None, error_response(
            f"{field_name} must be a number."
        )

    try:
        number = float(value)
    except (ValueError, TypeError, OverflowError):
        return None, error_response(
            f"{field_name} must be a valid number."
        )

    if not math.isfinite(number):
        return None, error_response(
            f"{field_name} must be a finite number."
        )

    return number, None


def parse_measurements(data, fields, minimum, maximum=None):
    values = {}

    for field in fields:
        value, error = parse_finite_number(data, field)

        if error is not None:
            return None, error

        if value < minimum or (
            maximum is not None and value > maximum
        ):
            if maximum is None:
                message = f"{field} must be at least {minimum}."
            else:
                message = (
                    f"{field} must be between "
                    f"{minimum} and {maximum}."
                )

            return None, error_response(message)

        values[field] = value

    return values, None


@app.get("/")
def home():
    return jsonify({
        "status": "running",
        "service": "Smart Care Agent Aquaculture API",
        "available_prediction_endpoints": [
            "POST /reading",
            "POST /api/test/reset-temperature",
            "POST /api/predict/ph",
            "POST /api/predict/tds",
        ],
        "forecast_horizon_minutes": FORECAST_HORIZON_MINUTES,
    }), 200


@app.post("/api/test/reset-temperature")
def reset_temperature_test():
    predictor.readings.clear()

    return jsonify({
        "status": "success",
        "message": "Temperature test history cleared."
    }), 200


@app.post("/reading")
def receive_reading():
    data, error = parse_json_object()

    if error is not None:
        return error

    if "timestamp" not in data or "water_temp" not in data:
        return error_response(
            "Both timestamp and water_temp are required."
        )

    timestamp, error = parse_timestamp(data["timestamp"])

    if error is not None:
        return error

    values, error = parse_measurements(
        data,
        ["water_temp"],
        MIN_TEMP_C,
        MAX_TEMP_C
    )

    if error is not None:
        return error

    temperature = values["water_temp"]

    if predictor.readings and timestamp <= predictor.readings[-1][0]:
        return error_response(
            "Reading timestamp must be later than the previous reading."
        )

    try:
        predictor.add_reading(timestamp, temperature)

    except (ValueError, TypeError, OverflowError) as exc:
        return error_response(str(exc), 400)

    try:
        return jsonify(predictor.predict()), 200

    except MissingHistoryError as exc:
        return jsonify({
            "status": "waiting_for_history",
            "message": str(exc),
        }), 200

    except Exception:
        app.logger.exception(
            "Unexpected temperature prediction error"
        )

        return error_response(
            "An internal prediction error occurred.",
            500
        )


@app.post("/api/predict/ph")
def predict_ph():
    data, error = parse_json_object()

    if error is not None:
        return error

    fields = [
        "current_ph",
        "ph_5min_ago",
        "ph_10min_ago",
        "ph_15min_ago"
    ]

    if "timestamp" not in data:
        return error_response("timestamp is required.")

    timestamp, error = parse_timestamp(data["timestamp"])

    if error is not None:
        return error

    readings, error = parse_measurements(
        data,
        fields,
        0.0,
        14.0
    )

    if error is not None:
        return error

    try:
        result = ph_predictor.predict(timestamp, readings)
        return jsonify(result), 200

    except Exception:
        app.logger.exception(
            "Unexpected pH prediction error"
        )

        return error_response(
            "An internal prediction error occurred.",
            500
        )


@app.post("/api/predict/tds")
def predict_tds():
    data, error = parse_json_object()

    if error is not None:
        return error

    fields = [
        "current_tds",
        "tds_5min_ago",
        "tds_10min_ago",
        "tds_15min_ago",
    ]

    if "timestamp" not in data:
        return error_response("timestamp is required.")

    timestamp, error = parse_timestamp(data["timestamp"])

    if error is not None:
        return error

    readings, error = parse_measurements(
        data,
        fields,
        0.0
    )

    if error is not None:
        return error

    try:
        result = tds_predictor.predict(timestamp, readings)
        return jsonify(result), 200

    except Exception:
        app.logger.exception(
            "Unexpected TDS prediction error"
        )

        return error_response(
            "An internal prediction error occurred.",
            500
        )


@app.errorhandler(404)
def not_found(error):
    return error_response(
        "Endpoint not found.",
        error.code or 404
    )


@app.errorhandler(405)
def method_not_allowed(error):
    return error_response(
        "HTTP method not allowed for this endpoint.",
        error.code or 405
    )


@app.errorhandler(500)
def internal_server_error(error):
    return error_response(
        "An internal server error occurred.",
        error.code or 500
    )


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )
