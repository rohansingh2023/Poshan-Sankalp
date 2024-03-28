import requests

# Function to trigger sensor reading on Raspberry Pi
def trigger_sensor_reading():
    raspberry_pi_ip = "raspberrypi.local"
    r = requests.get(f'http://{raspberry_pi_ip}:5000/trigger_reading')
    if r.status_code == 200:
        print("Sensor reading triggered successfully")
    else:
        print("Error triggering sensor reading")

def main():
    # Example usage: Trigger sensor reading
    trigger_sensor_reading()

if __name__ == "__main__":
    main()
