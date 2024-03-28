from flask import Flask
import serial
from pymongo import MongoClient

app = Flask(__name__)
ser = serial.Serial("/dev/ttyS0", 115200)

# Function to send data to MongoDB
def send_to_mongodb(distance, strength, temperature):
    try:
        client = MongoClient("raspberrypi.local")
        db = client["TFMini-s"]
        collection = db["tfmini"]

        documentToAdd = {"device": "TFMini", "distance": distance, "strength": strength, "temperature": temperature}
        collection.insert_one(documentToAdd)
        print("Data added to MongoDB")

    except Exception as e:
        print("Error:", e)

# Function to read sensor data and insert into MongoDB
def read_and_insert_data():
    counter = ser.in_waiting
    if counter > 8:
        bytes_serial = ser.read(9)
        ser.reset_input_buffer()

        if bytes_serial[0] == 0x59 and bytes_serial[1] == 0x59:
            distance = bytes_serial[2] + bytes_serial[3] * 256
            strength = bytes_serial[4] + bytes_serial[5] * 256
            temperature = bytes_serial[6] + bytes_serial[7] * 256
            temperature = (temperature / 8) - 256
            print("TF-Luna data:")
            print("Distance:", distance, "cm, Strength:", strength, "Chip Temperature:", temperature, "°C")

            # Send data to MongoDB
            send_to_mongodb(distance, strength, temperature)

            ser.reset_input_buffer()

@app.route('/trigger_reading', methods=['GET'])
def trigger_reading():
    read_and_insert_data()
    return "Sensor reading taken and sent to MongoDB."

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
