#include <Adafruit_NeoPixel.h>

#define LED_PIN    7      
#define LED_COUNT  9     
#define POT_POS    A0      
#define POT_WIDTH  A1       

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin();
  strip.show(); 
  uint32_t pink = strip.Color(204, 0, 204);
  strip.setBrightness(32);
}

void loop() {
  int potPos = analogRead(POT_POS);     
  int potWidth = analogRead(POT_WIDTH); 

  
  int centerIndex = map(potPos, 0, 1023, 0, LED_COUNT - 1);

  
  int width;
  if (potWidth <= 350) {
    width = 1;
  } else if (potWidth <= 700) {
    width = 3;
  } else {
    width = 5;
  }

  
  strip.clear();

  
  int half = width / 2;
  for (int i = -half; i <= half; i++) {
    int idx = centerIndex + i;
    if (idx >= 0 && idx < LED_COUNT) {
      strip.setPixelColor(idx, strip.Color(204, 0, 204)); 
    }
  }

  strip.show();
}
