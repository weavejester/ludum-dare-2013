var Person = function(position, radius, col) {
  this.shape = new createjs.Shape();
  this.shape.graphics.beginFill(col).drawCircle(0, 0, radius);
  this.shape.setTransform(position.x, position.y);

  var person = this;
  this.shape.addEventListener('click', function(e) { Game.kill(person); });
  createjs.Ticker.addEventListener('tick', function(e) { person.update(e.delta); });
};

Person.prototype.update = function(delta) {
  this.shape.x += delta * 0.01;
};

// returns a random colour string for beginFill() and other methods.
// Limited to avoid being too close to pure black and pure white
function randomColor(){
  var r = _.random(32, 224);
  var g = _.random(32, 224);
  var b = _.random(32, 224);
  return createjs.Graphics.getRGB(r,g,b);
}

function randomPosition(x, y, w, h) {
  return { x: _.random(x, x + w), y: _.random(y, y + h) };
}

function randomPerson(width, height) {
  var radius   = _.random(35, 50);
  var position = randomPosition(radius, radius, width - radius, height - radius);
  return new Person(position, radius, randomColor());
}

function randomCrowd(amount, width, height) {
  return _.times(amount, function(i) { return randomPerson(width, height); });
}

function addCrowd(stage, amount) {
  var crowd = randomCrowd(amount, stage.canvas.width, stage.canvas.height);
  _.each(crowd, function(p) { stage.addChild(p.shape) });
  _.first(crowd).setAsTarget();
}

Person.prototype.setAsTarget = function() {
  this.isTarget = true;
};