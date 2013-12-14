var Game = {};

Game.kill = function(person) {
  if (person.isTarget) {
    Game.success();
  }
  else{
    Game.failure();
  }
};

Game.success = function(){
  alert("Well done! You shot the bad guy!");
};
  
Game.failure = function(){
  alert("You killed an innocent civilian! You monster!");
};  