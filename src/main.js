window.onload = function() {
  var stage = new createjs.Stage("game");
  var person1 = new Person(100, 100);
  var person2 = new Person(100, 300);
  stage.addChild(person1.shape);
  stage.addChild(person2.shape);
  stage.update();
};

var Person = function(x, y) {
  this.shape = new createjs.Shape();
  this.shape.graphics.beginFill("red").drawCircle(0, 0, 50);
  this.shape.x = x;
  this.shape.y = y;
};