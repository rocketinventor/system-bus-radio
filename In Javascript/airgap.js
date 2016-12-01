var player; // Define "player" var to make my code linter happy

function start() { // Start Web Worker & send song data to player
	var logs = document.getElementById('logs'); // Define log element

	// Create Web Worker if it doesn't already exist
	if (window.Worker && typeof(player) == "undefined") {
		var player = new Worker("worker.js");
		window.player = player; // Make variable Global
		player.onmessage = function(event) {
			var data = event.data;
			window.logs.value += data;
		};

		// Send song data to player
		var song = document.getElementById("tones").innerHTML;
		player.postMessage(song);
	}
}

function end() { // Stops the Web Worker
	player.terminate();
}

function pause(time) {
	window.logs.value += "\nPaused / " + time*.001 + " seconds";
	var dt = new Date();
	while ((new Date()) - dt <= time) { /* Do nothing */ }
}