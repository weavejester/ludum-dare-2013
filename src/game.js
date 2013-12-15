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
  addCrowd(this.stage, 10);
}

Game.prototype.game_end = function() {
  this.stage.removeAllChildren();
  showVictim(this.victim);
  if (this.victim.isTarget)
    { 
      alert("Well done! You shot the bad guy!");
    }  
    else
    {
      alert("You killed an innocent civilian! You monster!");
    }
}

Game.prototype.end_menu = function() {
  delete this.victim;
  displayMenu(this.stage);
}

Game.prototype.kill = function(person) {
  this.victim=person;
  this.changeState('end');
};
