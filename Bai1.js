//function Person(firstName, lastName){
   // this.firstName = firstName;
  //  this.lastName = lastName;
//}

//Person.prototype.showFullName = function(){
  // console.log(this.firstName + ' ' + this.lastName);
//}

//const singer = new Person('Linh', 'Hoang Thuy');
//console.log(singer)

//console.log(singer.showFullName())






function Car(_make, _speed){
    this.make = _make;
    this.speed = _speed;
    console.log('Xe ' +  this.make + ' có tốc độ là ' + this.speed)
}

Car.prototype.accelerate = function(){
    this.speed += 10
    console.log('Xe ' +  this.make + ' có tốc độ là ' + this.speed)
}

Car.prototype.brake = function(){
    this.speed -= 5
    console.log('Xe ' +  this.make + ' có tốc độ là ' + this.speed)
}


var BMW = new Car('BMW', 120)
var Mercedes = new Car('Mercedes', 95)


BMW.accelerate()
BMW.accelerate()
BMW.brake()
BMW.brake()
Mercedes.accelerate()
Mercedes.accelerate()
Mercedes.brake()
Mercedes.brake()