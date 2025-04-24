import serial
import time
from flask import Flask, jsonify


app = Flask(__name__)


arduino = serial.Serial('COM4', 9600, timeout=1)  
time.sleep(2)  

@app.route('/sensor_data', methods=['GET'])
def get_sensor_data():
    try:
        
        arduino.write(b"GET\n")
        data = arduino.readline().decode('utf-8').strip()

        
        if data:
            humidity, dht_temp, bmp_temp, pressure = map(float, data.split(","))
            avg_temp = (dht_temp + bmp_temp) / 2.0

            return jsonify({
                "humidity": humidity,
                "dht_temperature": dht_temp,
                "bmp_temperature": bmp_temp,
                "pressure": pressure,
                "avg_temperature": avg_temp
            })
        else:
            return jsonify({"error": "No data received from Arduino"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
