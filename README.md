🌦️ LoRa-Based Weather Station
This project is a LoRa-based weather monitoring system designed to collect real-time environmental data using sensors and display it through a responsive web dashboard.

🔧 Features:
Measures humidity, temperature (DHT & BMP sensors), and air pressure.

Calculates average temperature from dual sensors.

Sends data via LoRa to a receiver connected to a computer.

Displays sensor data live using a Flask backend and a simple HTML/JavaScript dashboard.

Pushes selected data to ThingSpeak for cloud logging and visualization.

🧰 Tech Stack:
Python (Flask)

HTML/CSS + JavaScript

Serial communication via PySerial and SerialPort

ThingSpeak API for cloud integration
