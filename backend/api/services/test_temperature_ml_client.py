import json
import unittest
from unittest.mock import patch, MagicMock
from urllib.error import URLError

from backend.api.services.temperature_ml_client import predict_temperature


class TemperatureMLClientTests(unittest.TestCase):

    @patch("backend.api.services.temperature_ml_client.urlopen")
    def test_successful_prediction(self, mock_urlopen):
        expected = {"predicted_temperature_c": 28.2}
        response = MagicMock()
        response.__enter__.return_value.read.return_value = json.dumps(expected).encode()
        mock_urlopen.return_value = response

        result = predict_temperature("2026-11-02T12:00:00", 27.5)

        self.assertEqual(result, expected)

    @patch("backend.api.services.temperature_ml_client.urlopen")
    def test_service_unavailable(self, mock_urlopen):
        mock_urlopen.side_effect = URLError("Connection refused")

        with self.assertRaises(ConnectionError):
            predict_temperature("2026-11-02T12:00:00", 27.5)

    @patch("backend.api.services.temperature_ml_client.urlopen")
    def test_invalid_response(self, mock_urlopen):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = b"invalid json"
        mock_urlopen.return_value = response

        with self.assertRaises(RuntimeError):
            predict_temperature("2026-11-02T12:00:00", 27.5)


if __name__ == "__main__":
    unittest.main()
