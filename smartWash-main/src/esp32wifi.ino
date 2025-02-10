#include <WiFi.h>
#include <HTTPClient.h>

const char* password = "YOUR_PASSWORD";
const char* serverName = "http://YOUR_SERVER_ADDRESS:8000/update_state";

// ADC and threshold settings
const int ledAnalogPin = A0;           
const float adcReferenceVoltage = 3.3; // For many ESP32 boards (adjust if needed)
const int adcResolution = 4095;        // 12-bit ADC
const float thresholdVoltage = 1.5;   

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  // Read the ADC value from the LED sensing pin
  int adcValue = analogRead(ledAnalogPin);
  // Convert ADC value to voltage
  float voltage = ((float)adcValue / adcResolution) * adcReferenceVoltage;
  
  // Determine machine state based on voltage
  String machineState = (voltage > thresholdVoltage) ? "open" : "close";
  
  // For example, assume machine index 0 (adjust if you have multiple sensors)
  int machineIndex = 0;
  
  // Create JSON payload
  String payload = "{\"machine_index\": " + String(machineIndex) + ", \"state\": \"" + machineState + "\"}";
  
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(payload);
    if(httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("Response code: ");
      Serial.println(httpResponseCode);
      Serial.println("Response: " + response);
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  
  delay(5000);  
}
