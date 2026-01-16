#include "Stepper.h"
#include "AccelStepper.h"

// Define number of steps per rotation:
const int stepsPerRevolution = 2048;


// Create stepper object called 'myStepper', note the pin order:
Stepper myStepper2 = Stepper(stepsPerRevolution, 8, 10, 9, 11);
AccelStepper myStepper2 = AccelStepper(stepsPerRevolution, 8, 10, 9, 11);


void setup() {
  myStepper2.setMaxSpeed(500);
  
  myStepper2.setSpeed(15);
  
  // Begin Serial communication at a baud rate of 9600:
  Serial.begin(9600);
}

void loop() {
  int spdPot = analogRead(A0);
  int accelPot = analogRead(A1);
  int spd = map(spdPot, 0, 1023, 50, 500);
  int accel = map(accelPot, 0, 1023, 10, 100);
  
  myStepper.setSpeed(spd);
  myStepper2.setAcceleration(accel);
  myStepper2.runSpeed();
  
  if (digitalRead(4) == HIGH) {
    Serial.println("-500");
    myStepper.step(-stepsPerRevolution);
    Serial.println(spd);
    delay(500);
  }
  if (digitalRead(5) == HIGH) {
    Serial.println("500");
    myStepper.step(stepsPerRevolution);
    Serial.println(accel);
    delay(500);
  }
  delay(10); // Delay a little bit to improve simulation performance
}
