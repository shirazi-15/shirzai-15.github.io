// C++ code
//
int Pinread = 0;

int moterstate = 0;

void setup()
{
  pinMode(5, INPUT);
  Serial.begin(9600);
  pinMode(4, OUTPUT);

  moterstate = 0;
}

void loop()
{
  Pinread = digitalRead(5);
  Serial.println(digitalRead(5));
  if (Pinread == 1) {
    if (moterstate == 0) {
      moterstate = 1;
      digitalWrite(4, HIGH);
    } else {
      moterstate = 0;
      digitalWrite(4, LOW);
    }
    delay(1500); // Wait for 1500 millisecond(s)
  }
  delay(10); // Wait for 10 millisecond(s)
}
