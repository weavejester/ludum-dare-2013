var Person = function(x, y, r, col) {
  this.shape = new createjs.Shape();
  this.shape.graphics.beginFill(col).drawCircle(0, 0,r);
  this.shape.x = x;
  this.shape.y = y;
  var person = this;
  this.shape.addEventListener("click", function(e) { Game.kill(person); })
};

// returns a random colour string for beginFill() and other methods.
// Limited to avoid being too close to pure black and pure white
function randomColor(){
  var r = _.random(32, 224)
  var g = _.random(32, 224);
  var b = _.random(32, 224);
  return createjs.Graphics.getRGB(r,g,b);
}

function randomPerson(width, height) {
  var radius = _.random(35, 50);
  var x = _.random(radius, width - radius);
  var y = _.random(radius, height - radius);
  return new Person(x, y, radius, randomColor());
}

function randomCrowd(amount, width, height) {
  return _.times(amount, function(i) { return randomPerson(width, height); });
}

function addCrowd(stage, amount) {
  var crowd = randomCrowd(amount, stage.canvas.width, stage.canvas.height);
  _.each(crowd, function(p) { stage.addChild(p.shape) });
}