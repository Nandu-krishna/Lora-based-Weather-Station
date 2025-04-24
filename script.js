const { SerialPort } = require('serialport'); // Correct import for SerialPort
const { ReadlineParser } = require('@serialport/parser-readline'); // Import ReadlineParser
const axios = require('axios');

// Replace with your COM port (e.g., 'COM3' on Windows or '/dev/ttyUSB0' on Linux/Mac)
const port = new SerialPort({ path: 'COM4', baudRate: 9600 });

// Replace with your ThingSpeak API key
const apiKey = 'DB3OXMOKXFLZBREV';

// Set up the serial port parser
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
    try {
        // Parse incoming data
        const sensorData = JSON.parse(data);
        console.log('Received:', sensorData);

        // Send data to ThingSpeak
        axios.post(`https://api.thingspeak.com/update`, null, {
            params: {
                api_key: apiKey,
                field1: sensorData.temperature,
                field2: sensorData.humidity
            }
        }).then((response) => {
            console.log('ThingSpeak Response:', response.data);
        }).catch((error) => {
            console.error('Error sending data to ThingSpeak:', error.message);
        });

    } catch (error) {
        console.error('Error parsing data:', error.message);
    }
});
