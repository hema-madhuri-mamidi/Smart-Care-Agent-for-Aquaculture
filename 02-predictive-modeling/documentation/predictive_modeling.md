# Predictive Modeling

## Target Species

Guppy Fish (Poecilia reticulata)

## 1. Aquarium Stress Factors

The Aquarium Care Agent focuses on environmental conditions that can
cause stress to guppy fish.

The main factors considered are:

1. Abnormal pH
2. High or low water temperature
3. Low dissolved oxygen
4. High ammonia concentration
5. Low water level
6. Sudden changes in water-quality parameters

## 2. ML Input Features

The predictive model will use historical aquarium water-quality data as
input features.

The main features are:

- pH
- Water Temperature
- Dissolved Oxygen
- Ammonia
- Water Level
- Change in pH
- Change in Temperature
- Change in Dissolved Oxygen

## 3. Prediction Output

The model will classify the aquarium condition into three risk levels:

- Low Risk – aquarium conditions are generally stable.
- Medium Risk – some parameters show abnormal or changing conditions and
  monitoring is required.
- High Risk – critical conditions indicate a high possibility of fish stress
  or health problems and immediate action is required.

## 4. Predictive Modeling Approach

A Random Forest classification model will be considered for predicting
aquarium health risk.

The model will learn patterns from historical water-quality and fish-health
data. The trained model will classify the current aquarium condition into
Low Risk, Medium Risk, or High Risk.

The model will use parameters such as pH, temperature, dissolved oxygen,
ammonia, water level, and changes in these parameters.

## 5. Early Warning System

The predictive model will analyze historical patterns and current
water-quality conditions to identify an increased risk of fish stress.

If the predicted risk becomes high, the Aquarium Care Agent will generate
an early warning so that the aquarium owner can take corrective action
before the condition becomes more serious.