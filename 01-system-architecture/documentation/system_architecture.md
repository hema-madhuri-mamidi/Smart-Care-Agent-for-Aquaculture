# System Architecture

## Project Title

Aquarium Care Agent – AI-Based Aquarium Monitoring and Decision Support System

## 1. Problem Statement

Maintaining proper aquarium conditions requires continuous monitoring of
important water-quality parameters. Changes in parameters such as pH,
temperature, and dissolved oxygen can affect the health of aquatic species.

The proposed Aquarium Care Agent continuously monitors these parameters,
analyzes the collected data, and provides alerts and actionable recommendations
to the aquarium owner when abnormal conditions are detected.

## 2. Sensors

The Aquarium Care Agent uses sensors to collect real-time aquarium data.

- pH Sensor – measures the acidity or alkalinity of the water.
- Temperature Sensor – measures water temperature.
- Dissolved Oxygen Sensor – measures the amount of oxygen available in the water.
- Water Level Sensor – monitors the aquarium water level.
- Ammonia Sensor – monitors ammonia concentration in the water.

## 3. System Architecture

The Aquarium Care Agent consists of five major stages:

1. Sensor Layer
2. Data Collection Layer
3. Data Processing Layer
4. Care Agent and Decision Support Layer
5. User Interface and Alert Layer

### 3.1 Sensor Layer

Sensors installed in the aquarium continuously collect water-quality parameters
such as pH, temperature, dissolved oxygen, water level, and ammonia.

### 3.2 Data Collection Layer

An ESP32 controller collects readings from the connected sensors and prepares
the data for further processing.

### 3.3 Data Processing Layer

The collected sensor readings are processed and checked for abnormal or
critical values.

### 3.4 Care Agent and Decision Support Layer

The Care Agent analyzes the processed sensor data and determines whether
the aquarium conditions are normal or require attention.

### 3.5 User Interface and Alert Layer

The processed information is displayed through a simple dashboard.
When a critical condition is detected, the system generates an alert and
provides an appropriate recommendation to the aquarium owner.

## 4. Data Flow

The system follows the following data flow:

Aquarium Sensors → ESP32 → Data Processing → Care Agent → Dashboard/Alerts → Aquarium Owner

### Step 1: Data Collection

Sensors continuously measure the aquarium's water-quality parameters.

### Step 2: Data Transmission

The ESP32 receives the sensor readings and transfers the collected data
to the processing layer.

### Step 3: Data Processing

The system validates and processes the incoming sensor readings.

### Step 4: Condition Analysis

The Care Agent analyzes the processed data and identifies abnormal conditions.

### Step 5: Decision Support

If an abnormal condition is detected, the Care Agent generates a suitable
recommendation for the aquarium owner.

### Step 6: Monitoring and Alerting

The current sensor values are displayed on the dashboard. Critical conditions
generate alerts so that the aquarium owner can take appropriate action.

## 5. Real-Time Monitoring and Alerting

The Aquarium Care Agent continuously receives sensor readings and updates
the monitoring dashboard.

If a critical parameter moves outside its acceptable range, the system
generates an alert. The alert identifies the affected parameter and provides
an appropriate action for the aquarium owner.

Example:

Dissolved Oxygen → Low → Critical Alert → Increase Aeration