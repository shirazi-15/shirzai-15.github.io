/* 
  Example sketch to control a 28BYJ-48 stepper motor 
  with ULN2003 driver board and Arduino UNO. 
  More info: https://www.makerguides.com 
*/

// Include the Arduino Stepper.h library:
#include "Stepper.h"

// Define number of steps per rotation:
const int stepsPerRevolution = 2048;

// Create stepper object called 'myStepper', note the pin order:
Stepper myStepper = Stepper(stepsPerRevolution, 8, 10, 9, 11);

void setup() {
  // Set the speed to 5 rpm:
  myStepper.setSpeed(15);
  
  // Begin Serial communication at a baud rate of 9600:
  Serial.begin(9600);
} 

void loop() {

  if (digitalRead(2) == HIGH) {
    Serial.println("180");
    myStepper.step(stepsPerRevolution / 2);
    delay(500);
  } 
  
   if (digitalRead(3) == HIGH) {
    Serial.println("25");
    myStepper.step(stepsPerRevolution / 14.4);
    delay(500);
  } 
  
    if (digitalRead(4) == HIGH) {
    Serial.println("-180");
    myStepper.step(-stepsPerRevolution / 2);
    delay(500);
  } 
  
   if (digitalRead(5) == HIGH) {
    Serial.println("-25");
    myStepper.step(-stepsPerRevolution / 14.4);
    delay(500);
  } 
  
  delay(10);
}
