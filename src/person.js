function randomColor(){
  var r = _.random(32, 224);
  var g = _.random(32, 224);
  var b = _.random(32, 224);
  return createjs.Graphics.getRGB(r,g,b);
}

function personShape(opts) {
  var shape = new createjs.Shape();
  shape.graphics.
    beginFill(opts.body.color).
    drawRoundRect(0, opts.head.radius * 0.8, opts.body.width, opts.body.height, 10).
    beginFill(opts.head.color).
    drawCircle(opts.body.width * 0.5, 0, opts.head.radius);

  shape.height = opts.head.radius * 0.8 + opts.body.height;
  return shape;
}

var Person = function(position, bounds, velocity, shapeOptions) {
  this.bounds   = bounds;
  this.velocity = velocity;
  this.shape    = personShape(shapeOptions).setTransform(position.x, position.y);

  var person = this;
  this.shape.addEventListener('click', function(e) { Game.current.kill(person); });
  createjs.Ticker.addEventListener('tick', function(e) { person.update(e.delta * 0.001); });

  window.setInterval(function() { person.velocity = randomVelocity(); }, _.random(1000, 5000));
};
 
Person.prototype.update = function(delta) {
  this.shape.x += this.velocity.x * delta;
  this.shape.y += this.velocity.y * delta;
  confineCoord(this.shape, this.bounds);
};

Person.prototype.setAsTarget = function() {
  this.isTarget = true;
};

function bottomY(shape) {
  return shape.y + shape.height;
}

function comparePersonShapes(shape1, shape2) {
  if (bottomY(shape1) == bottomY(shape2)) {
    return 0;
  } else if (bottomY(shape1) < bottomY(shape2)) {
    return -1;
  } else {
    return 1;
  }
}

function randomPerson(width, height) {
  var shapeOptions = {
    head: { color: randomColor(), radius: _.random(20, 23) },
    body: { color: randomColor(), width: _.random(35, 70), height: _.random(50, 80) }
  };
  
  var bounds   = { x: 0, y: 25, w: (width - 140), h: (height - 160) };
  var position = randomPosition(bounds);
  var velocity = randomVelocity();
  
  return new Person(position, bounds, velocity, shapeOptions);
}

function randomCrowd(amount, width, height) {
  return _.times(amount, function(i) { return randomPerson(width, height); });
}

function addCrowd(stage, amount) {
  var crowd = randomCrowd(amount, stage.canvas.width, stage.canvas.height);
  _(crowd).each(function(p) { stage.addChild(p.shape) });
  _(crowd).first().setAsTarget();
}
