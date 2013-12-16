var Game = function(stage) {
  this.state = 'init';
  this.stage = stage;
  Game.current = this;
  
};

Game.prototype.changeState = function(newState) {
  if (this.state != newState) {
    this.stage.removeAllChildren();
    this[this.state + "_" + newState]();
    this.state = newState;
  }
}

Game.prototype.init_menu = function() {
  displayMenu(this.stage);
}

Game.prototype.menu_game = function() {
  addCrowd(this.stage, 30);
}

Game.prototype.game_end = function() {
 
  var stage=this.stage;
  var deadperson=this.victim;
  stage.removeAllChildren();

  var text="";
  
  if (deadperson.isTarget)
    { 
      text="Well done! You shot the bad guy!";
      //alert("Well done! You shot the bad guy!");
    }  
    else
    {
      text="You killed an innocent civilian! You monster!";
      //alert("You killed an innocent civilian! You monster!");
    }

  var gameovermessage = new createjs.Text(text, "bold 24px Arial", "red");
  gameovermessage.textAlign = "center";
  gameovermessage.x = stage.canvas.width*0.5;
  gameovermessage.y = 20;
  
  stage.addChild(gameovermessage);
  showVictim(deadperson);
}

Game.prototype.end_menu = function() {
  delete this.victim;
  displayMenu(this.stage);
}

Game.prototype.kill = function(person) {
  this.victim=person;
  this.changeState('end');
};
