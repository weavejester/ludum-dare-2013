window.onload = function() {
  var stage = new createjs.Stage("game");
  var game  = new Game(stage);
  game.changeState('menu');
  createjs.Ticker.addEventListener('tick', function(e) {
    stage.sortChildren(comparePersonShapes);
    stage.update(e);
  });
};