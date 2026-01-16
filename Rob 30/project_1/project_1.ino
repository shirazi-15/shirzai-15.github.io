#include <Servo.h>

Servo servo;

int rxPin = 7;    // Receiver channel input
int servoPin = 9; // Servo output
int chVal;        // PWM value from receiver

void setup() {
  Serial.begin(9600);
  pinMode(rxPin, INPUT);
  servo.attach(servoPin);
}

void loop() {
  chVal = pulseIn(rxPin, HIGH, 25000); // Read PWM from receiver
  Serial.println(chVal);

  // --- MIDDLE POSITION (rest/neutral) ---
  if (chVal > 1400 && chVal < 1600) {
    servo.write(90);    // Center
  }

  // --- UP POSITION: move up ---
  else if (chVal < 1300) {    // SWC UP
    servo.write(180);   // Full up
  }

  // --- DOWN POSITION: move down ---
  else if (chVal > 1700) {    // SWC DOWN
    servo.write(0);      // Full down
  }
}
