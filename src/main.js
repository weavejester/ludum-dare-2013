window.onload = function() {
  var stage = new createjs.Stage("game");
  //var person1 = new Person(100, 100, randomColor());
  //var person2 = new Person(100, 300, randomColor());
  //stage.addChild(person1.shape);
  //stage.addChild(person2.shape);
  
  crowd(stage,10);
  
  stage.update();
};

var Person = function(x, y, r,col) {
  this.shape = new createjs.Shape();
  this.shape.graphics.beginFill(col).drawCircle(0, 0,r);
  this.shape.x = x;
  this.shape.y = y;
};

function randInt(start, stop) {
  return Math.floor((Math.random() * (stop - start)) + start);
}

// returns a random colour string for beginFill() and other methods.
// Limited to avoid being too close to pure black and pure white
function randomColor(){
  var r = randInt(32, 224)
  var g = randInt(32, 224);
  var b = randInt(32, 224);
  return createjs.Graphics.getRGB(r,g,b);
}

// returns random position for drawing objects of size n within maximum
function randomDraw(n,maximum){
 var pos=randInt(n, maximum - n);
 return pos;
}

// builds a crowd of crowdsize person objects and adds them to mystage stage
function crowd(mystage,crowdsize){

  var drawX
  var drawY
  
  var drawCol=randomColor();

  for (var i = 0; i < crowdsize; i++)
  {
    //I Had to use literals for the Person sizes here!
    var r=randInt(25,50);
    var gamecanvas = document.getElementById("game");
    var canvasw=gamecanvas.width;
    var canvash=gamecanvas.height;
    
    drawX=randomDraw(r,canvasw);//-50*(drawX>450);
    drawY=randomDraw(r,canvash);//-50*(drawY>450);
  
    drawCol=randomColor();
    var person = new Person(drawX,drawY,r,drawCol);
    mystage.addChild(person.shape);
  }
}