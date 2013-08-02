
module.exports.processGameStatus = function(jsonStatus) {
  var cmds, status;

  status = JSON.parse(jsonStatus);
  if (status.RoundNumber == 0) console.log("New game has started, I should probably reset");
  cmds = [];
  cmds.push(new Command(1, 'move:east'));
  cmds.push(new Command(2, 'fire', { X: 8, Y: 9 }));
  return JSON.stringify(cmds);
};

var Command = (function() {
  function Command(vesselid, action, coordinate) {
    this.vesselid = vesselid;
    this.action = action;
    this.coordinate = coordinate;
  }

  return Command;

})();