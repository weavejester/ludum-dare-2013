window.onload = function() {
  var stage = new createjs.Stage("game");
  person = createPerson();
  stage.addChild(person.shape);
  stage.update();
};

function createPerson() {
  var person = {};
  person.shape = new createjs.Shape();
  person.shape.graphics.beginFill("red").drawCircle(0, 0, 50);
  person.shape.x = 100;
  person.shape.y = 100;
  return person;
}