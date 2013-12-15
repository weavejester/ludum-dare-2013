function createButton(px, py, w, h, text, bcol) {
  var background = new createjs.Shape();
  background.name = "background";
  background.graphics.beginFill(bcol).drawRoundRect(px-(w*0.5), py-(h*0.5), w, h, 10);

  var label = new createjs.Text(text, "bold 24px Arial", "white");
  label.name = "label";
  label.textAlign = "center";
  label.textBaseline = "middle";
  label.x = px;
  label.y = py;

  var button = new createjs.Container();
  button.name = "button";
  button.x = w;
  button.y = h;
  button.addChild(background, label);

  // set up listeners for all display objects, for both the non-capture (bubble / target) and capture phases:
  _([button, label, background]).each(function(target) {
    target.addEventListener('click', function(e) { Game.current.changeState('game'); });
  });
  
  return button;
}

function displayMenu(stage) {
  var startButton = createButton(stage.canvas.width*0.5,stage.canvas.height*0.5,120,40,"Play","black");
  stage.addChild(startButton);
}






