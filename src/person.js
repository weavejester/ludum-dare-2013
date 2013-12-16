function drawPerson(graphics, opts) {
  graphics.
    clear().
    beginFill(opts.bodyColor).
    drawRoundRect(0, opts.headRadius * 0.8, opts.bodyWidth, opts.bodyHeight, 10).
    beginFill(opts.headColor).
    drawCircle(opts.bodyWidth * 0.5, 0, opts.headRadius);
}

function drawTarget(graphics, opts) {
  opts = _.clone(opts);
  opts.headColor = "red";
  opts.bodyColor = "red";
  drawPerson(graphics, opts);
}

function personShape(opts) {
  var shape = new createjs.Shape();
  drawPerson(shape.graphics, opts);
  shape.height = opts.headRadius * 0.8 + opts.bodyHeight;
  return shape;
}

var Person = function(position, bounds, velocity, shapeOptions) {
  this.bounds   = bounds;
  this.velocity = velocity;
  this.shape    = personShape(shapeOptions).setTransform(position.x, position.y);
  this.shapeOptions = shapeOptions;

  var person = this;
  this.shape.addEventListener('click', function(e) { Game.current.kill(person); });
  createjs.Ticker.addEventListener('tick', function(e) { person.update(e.delta * 0.001); });

  window.setInterval(function() { person.velocity = randomVelocity(); }, _.random(1000, 5000));
};
 
Person.prototype.update = function(delta) {
  if (this==Game.current.victim) {
    return;
  }
  
  this.shape.x += this.velocity.x * delta;
  this.shape.y += this.velocity.y * delta;
  confineCoord(this.shape, this.bounds);
};

Person.prototype.setAsTarget = function() {
  this.isTarget = true;
  drawTarget(this.shape.graphics, this.shapeOptions);
  var person = this;
  window.setTimeout(function() { drawPerson(person.shape.graphics, person.shapeOptions); }, 2000);
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
    headColor: randomFleshColor(),
    headRadius: _.random(20, 23),
    bodyColor: randomClothingColor(),
    bodyWidth: _.random(35, 70),
    bodyHeight: _.random(50, 80)
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