# Main game engine
module.exports.processGameStatus = (jsonStatus) ->
	# Parse the input
	status = JSON.parse jsonStatus
	console.log "New game has started, I should probably reset" if status.RoundNumber == 0
	
	# Create commands
	cmds = []
	cmds.push new Command(1,'move:west')
	cmds.push new Command(3,'fire',{ X: 8, Y: 9 })
	JSON.stringify(cmds)

class Command
	constructor: (@vesselid, @action, @coordinate) ->