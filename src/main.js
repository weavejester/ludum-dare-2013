window.onload = function() {
  var stage = new createjs.Stage("game");
  addCrowd(stage, 10);
  stage.update();
};