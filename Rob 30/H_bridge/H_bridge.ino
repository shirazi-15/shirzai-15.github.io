void setup()
{
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
}

void loop()
{
  //Increase Speed in Direction One
  for(int i = 0; i < 255; i+=1){
    analogWrite(5, i);
    digitalWrite(6, LOW); 
    delay(30);
  }
  //Decrease Speed in Direction One
  for(int i = 255; i > 0; i-= 1){
    analogWrite(5, i);
    digitalWrite(6, LOW);
    delay(30);
  }
  //Increase Speed in Direction Two
  for(int i = 0; i < 255; i+=1){
    analogWrite(6, i);
    digitalWrite(5, LOW);
    delay(30);
  }
  //Decrease Speed in Direction Two
  for(int i = 255; i > 0; i-= 1){
    analogWrite(6, i);
    digitalWrite(5, LOW);
    delay(30);
  }
}
