// smooth rotation
function changedirection(person){
  var vx = person.velocity.x;
  var vy = person.velocity.y;
  
  var speed = Math.atan(vx/vy);
  var direction = Math.asin(vx);
  
/*  console.log("speed="+speed);
  console.log("direction="+direction);
  console.log("convert="+degs(direction));
  */
  
  var angle = _.random(-1,1);
  var direction=angle+(angle*(rads(15))); // 15 degrees should be a smooth enough step-size
  
  vx = speed*(Math.sin(direction));
  vy = speed*(Math.cos(direction));
  //person.velocity.x = vx
  //person.velocity.y = vy;
  
  return {x:vx,y:vy};
}
  
function randomVelocity() {
  return { x: _.random(-30, 30), y: _.random(-30, 30) };
}

function randomPosition(bounds) {
  return {
    x: _.random(bounds.x, bounds.x + bounds.w),
    y: _.random(bounds.y, bounds.y + bounds.h)
  };
}

// Stop a coordinate from getting out of bounds
function confineCoord(coord, bounds) {
  coord.x = confine(coord.x, bounds.x, bounds.x + bounds.w);
  coord.y = confine(coord.y, bounds.y, bounds.y + bounds.h);
}

// Don't let a number get higher than max or lower than min
function confine(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

function rads(degrees){
  return degrees*(180.0/Math.PI);
}

function degs(radians){
  return radians*(Math.PI/180.0);
}