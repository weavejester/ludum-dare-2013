var Game = function(stage) {
  this.stage = stage;
  Game.current = this;
};

Game.prototype.kill = function(person) {
  if (person.isTarget) {
    Game.success();
  }
  else{
    Game.failure();
  }
};

Game.prototype.success = function(){
  alert("Well done! You shot the bad guy!");
};
  
Game.prototype.failure = function(){
  alert("You killed an innocent civilian! You monster!");
};  