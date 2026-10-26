# Decision Support Logic - Threshold Configuration Notes

## Purpose
This document records the illustrative thresholds currently used by
the Smart Aquarium Decision Support prototype.

## Current prototype thresholds

| Parameter | Configured rule/limit | Unit |
|---|---|---|
| pH | Minimum 6.5, maximum 8.5 | pH scale |
| Temperature | Minimum 24.0, maximum 30.0 | °C |
| Dissolved oxygen | Critical below 4.0 | mg/L |
| Ammonia | Warning at 0.25; critical at 0.5 | mg/L (illustrative) |
| Water level | Minimum 20.0 | % |

## How decisions are generated
- The decision engine compares supplied readings with configured rules.
- A triggered rule can produce a status, risk level, reason and recommendation.
- If a predicted temperature is supplied, it can trigger a forecast-based warning.
- A forecast-based warning is not proof that the predicted condition has occurred.
- Missing, non-numeric and out-of-range inputs are validated by the engine.

## Important limitations
- These are prototype/example thresholds, not universally safe limits.
- They have not been validated for a specific fish species or farm.
- Before real deployment, confirm appropriate limits for the target species,
  life stage, water conditions and measurement units with a qualified
  aquaculture expert and reliable domain references.
- Sensor readings should be checked for accuracy before acting on an alert.
- Recommendations do not automatically control an aerator or feeder.

## Configuration and maintenance
The decision engine supports configurable limits. Review the configured
values and rule behavior before using it for a different species or setup.

## Demo testing
Synthetic scenarios have been used to test Normal, Warning and Critical
outputs. These demonstrate prototype behavior, not live sensor performance
or a validated aquaculture prediction system.