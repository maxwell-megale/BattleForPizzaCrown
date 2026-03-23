
var score = 0;
var timerActive = false;
var started = false;
var timerMin = 1;
var seconds = 60;
var mins = timerMin;
var timeoutId = null;




function countdown(minutes) {
	clearTimeout(timeoutId);
	seconds = 60;
	mins = minutes
	function tick() {
		if (timerActive) {
			//This script expects an element with an ID = "counter". You can change that to what ever you want. 
			var current_minutes = mins - 1
			seconds--;
			display.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
			console.log(timerActive);
			if (seconds > 0) {
				timeoutId = setTimeout(tick, 1000);
			} else if (mins > 1) {
				countdown(mins - 1);
			} else {
				timerActive = false;
			}
		}
	}
	tick();

}

function tapOut() { //Hide everything on screen and say TAPPED OUT
	document.getElementById("p1Score").style.display = "none";
	document.getElementById("p1").style.display = "none";
	document.getElementById("tapLogo").style.display = "none";
	document.getElementById("title").style.display = "none";
	document.getElementById("counter").style.display = "none";
	document.getElementById("tappedOut").style.display = "inline";
}

function nextTimer() {
	timerActive = true;
	score++;
	countdown(timerMin);
	document.getElementById("p1Score").innerHTML = score;
}

function startTimer() {
	started = true;
	timerActive = true;
	console.log("start");
	display = document.getElementById("counter");
	display.innerHTML = "01" + ":" + "00";
	countdown(timerMin);
}

function skipTimer() {
	timerActive = false;
	clearTimeout(timeoutId);
	timer = timerMin;
	seconds = 60;
	mins = timerMin;
	display.innerHTML = "01" + ":" + "00";
}

document.body.addEventListener("keyup", (ev) => {
	if (ev.key == "5") { //Start counter button
		if (!started) {
			startTimer();
		} else if (!timerActive) {
			nextTimer();
		}
	}

	if (ev.key == "4") { //skip counter button
		if (started && timerActive) {
			skipTimer();
		}
	}

	if (ev.key == "2") { // Tap Out button
		tapOut();
	}
});