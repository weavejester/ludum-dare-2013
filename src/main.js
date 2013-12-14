window.onload = function() {
  var stage = new createjs.Stage("game");
  addCrowd(stage, 10);
  createjs.Ticker.addEventListener('tick', function(e) { stage.update(e); });
};