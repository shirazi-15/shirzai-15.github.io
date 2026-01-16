#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "CytronMotorDriver.h"

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

// ================= PINS & CONFIG =================
#define SERVO_PAN     0   // Left/Right
#define SERVO_TILT    1   // Up/Down
#define SERVO_TRIGGER 2   // Fire mechanism

#define JOY_X A0
#define JOY_Y A1
#define JOY_SW 2

#define SERVOMIN  150 
#define SERVOMAX  600

// Start at center
int currentPan = 375;
int currentTilt = 375;

// Trigger Positions (Adjust these to fit your mechanical setup)
uint16_t FIRE_HOME = 150;
uint16_t FIRE_SHOT = 350; // Moves just enough to release 1 band

// ================= MOTORS =================
CytronMD motor1(PWM_DIR, 13, 12);
CytronMD motor2(PWM_DIR, 10, 11);

void setup() {
  pinMode(JOY_SW, INPUT_PULLUP);
  
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(50);

  // Initialize positions
  pwm.setPWM(SERVO_PAN, 0, currentPan);
  pwm.setPWM(SERVO_TILT, 0, currentTilt);
  pwm.setPWM(SERVO_TRIGGER, 0, FIRE_HOME);
}

void loop() {
  // 1. Read Joystick
  int xVal = analogRead(JOY_X);
  int yVal = analogRead(JOY_Y);
  bool btnPressed = (digitalRead(JOY_SW) == LOW);

  // 2. Pan Control (Servo 0)
  if (xVal > 600) currentPan -= 8; 
  if (xVal < 400) currentPan += 8;

  // 3. Tilt Control (Servo 1)
  if (yVal > 600) currentTilt -= 8;
  if (yVal < 400) currentTilt += 8;

  // 4. Safety Limits
  currentPan = constrain(currentPan, SERVOMIN, SERVOMAX);
  currentTilt = constrain(currentTilt, SERVOMIN, SERVOMAX);

  // 5. Apply Movement
  pwm.setPWM(SERVO_PAN, 0, currentPan);
  pwm.setPWM(SERVO_TILT, 0, currentTilt);

  // 6. Single Shot Trigger (Servo 2)
  if (btnPressed) {

    motor1.setSpeed(255);
    motor2.setSpeed(255);
    delay(400);
    
    pwm.setPWM(SERVO_TRIGGER, 0, FIRE_HOME); // Rotate to fire
    delay(300);                              // Wait for band to release
    pwm.setPWM(SERVO_TRIGGER, 0, FIRE_SHOT); // Return to ready
    delay(200);                     

    motor1.setSpeed(0);
    motor2.setSpeed(0);
    delay(400);
    }
    
  delay(15);
} 
