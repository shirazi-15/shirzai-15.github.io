#include <Adafruit_NeoPixel.h>

// C++ code
//

#define LED_PIN    10
#define LED_COUNT 60
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

// Colors 
uint32_t lightBlue = strip.Color(94, 252,255);
uint32_t mediumPurple = strip. Color(124, 22, 171);
uint32_t mystery = 12147;

void setup()
{
  // enable and clear the neopixel
  strip.begin();
  strip.show();

  // if using grid
  strip.setBrightness(32);
    
  
  // set an RGB color 
  strip.setPixelColor(0, 50, 150, 250);
  strip.setPixelColor(1, lightBlue);
  strip.setPixelColor(2, mediumPurple);
  strip.setPixelColor(3, mystery);

    // set someHSV values
  for(int i = 4; i < 64; i++){
    uint32_t c =strip.ColorHSV(i * 600, 200, 255);
    strip.setPixelColor(i, c); 
  }
  strip.show(); 
}

void loop()
{
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
}          
