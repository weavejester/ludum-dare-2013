function createButton(px,py,w,h,text,bcol,fcol){
  var button = new createjs.Shape();
  button.graphics.beginFill(bcol).drawRect(0, 0, w,h);
  button.setTransform(px,py);
  
  //button.addEventListener('mousein', function(e) { button.graphics.beginFill(fcol) });
  //button.addEventListener('mouseout', function(e) { button.graphics.beginFill(bcol); });
  button.addEventListener('click', function(e) { Game.current.changeState('game'); });
  
  return button;
}

var startButton = createButton(226,246,60,20,"Play","black","white");

function displayMenu(stage) {
  stage.addChild(startButton);
}