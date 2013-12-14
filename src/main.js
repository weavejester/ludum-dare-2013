window.onload = function() {
  var stage = new createjs.Stage("game");
  person = createPerson();
  stage.addChild(person);
  stage.update();
};

function createPerson() {
  var person = new createjs.Shape();
  person.graphics.beginFill("red").drawCircle(0, 0, 50);
  person.x = 100;
  person.y = 100;
  return person;
}