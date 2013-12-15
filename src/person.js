var Person = function(position, radius, color) {
  this.radius = radius;
  this.velocity = {x: 0, y: 0};

  this.shape = new createjs.Shape();
  this.shape.graphics.beginFill(color).drawCircle(0, 0, radius);
  this.shape.setTransform(position.x, position.y);

  var person = this;
  this.shape.addEventListener('click', function(e) { Game.current.kill(person); });
  createjs.Ticker.addEventListener('tick', function(e) { person.update(e.delta * 0.001); });

  //window.setInterval(function() { person.velocity = changedirection(person); }, _.random(1000, 5000));
  window.setInterval(function() { person.velocity = randomVelocity(); }, _.random(1000, 5000));
 };

// returns a random colour string for beginFill() and other methods.
// Limited to avoid being too close to pure black and pure white
function randomColor(){
  var r = _.random(32, 224);
  var g = _.random(32, 224);
  var b = _.random(32, 224);
  return createjs.Graphics.getRGB(r,g,b);
}

function randomPerson(width, height) {
  var radius   = _.random(35, 50);
  var bounds   = { x: radius, y: radius, w: width - (radius * 2), h: height - (radius * 2) };
  var position = randomPosition(bounds);
  var person   = new Person(position, radius, randomColor());
  person.bounds   = bounds;
  person.velocity = randomVelocity();
  return person;
}

function randomCrowd(amount, width, height) {
  return _.times(amount, function(i) { return randomPerson(width, height); });
}

function addCrowd(stage, amount) {
  var crowd = randomCrowd(amount, stage.canvas.width, stage.canvas.height);
  _.each(crowd, function(p) { stage.addChild(p.shape) });
  _.first(crowd).setAsTarget();
}

Person.prototype.update = function(delta) {
  this.shape.x += this.velocity.x * delta;
  this.shape.y += this.velocity.y * delta;
  confineCoord(this.shape, this.bounds);
};

Person.prototype.setAsTarget = function() {
  this.isTarget = true;
};