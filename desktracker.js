var customTimestampEntryZome = document.getElementById('dTimestamp');
var timeStampEntry = document.getElementById('sTimestampCal');
var timeStampTime = document.getElementById('calTime');
var timeStampAMPM = document.getElementById('calAMPM');
var buttonSubmit = document.getElementById('dMainContent').querySelectorAll('input[type=submit]')[0];
	
var libraryCountTimes = [
	'09:00am',
	'09:30am',
	'10:30am',
	'11:30am',
	'12:30pm',
	'01:30pm',
	'02:30pm',
	'03:30pm',
	'04:30pm',
	'05:30pm',
	'06:00pm',
	'06:30pm',
	'07:00pm']

function timeButton(e) {
	let timeSelected = e.target.value;
	if(timeSelected[0] == '0') {
		timeStampTime.value = timeSelected.substring(1,5);
	} else {
		timeStampTime.value = timeSelected.substring(0,5);
	}

	timeStampAMPM.value = timeSelected.substring(5,7);
}
	
function showCustomTimestamp() {
	// internal code here taken from inline javascript of "custom timestamp" button
	customTimestampEntryZome.style.display = 'block';
	document.getElementById('rTimestampCustom').checked=true;
	timeStampEntry.style.display='';
}

function addButtons() {	
	let newDiv = document.createElement('div');
	newDiv.setAttribute("id", "btnList");
	
	timeStampEntry.appendChild(newDiv);
	
	for (let time of libraryCountTimes) {
		let newBtn = document.createElement('input');
		newBtn.setAttribute('type', 'button');
		//newBtn.setAttribute('style', '{background-color: rgb(39, 128, 227);background-image: none;border-bottom-color: rgb(39, 128, 227);border-bottom-left-radius: 0px;border-bottom-right-radius: 0px;border-bottom-style: solid;border-bottom-width: 0.8px;border-image-outset: 0 0 0 0;border-image-repeat: stretch stretch;border-image-slice: 100% 100% 100% 100%;border-image-source: none;border-image-width: 1 1 1 1;border-left-color: rgb(39, 128, 227);border-left-style: solid;border-left-width: 0.8px;border-right-color: rgb(39, 128, 227);border-right-style: solid;border-right-width: 0.8px;border-top-color: rgb(39, 128, 227);border-top-left-radius: 0px;border-top-right-radius: 0px;border-top-style: solid;border-top-width: 0.8px;box-shadow: rgba(39, 128, 227, 0.5) 0px 0px 0px 3.2px;box-sizing: border-box;color: rgb(255, 255, 255);cursor: pointer;display: inline-block;font-family: \"Segoe UI\",\"Source Sans Pro\",Calibri,Candara,Arial,sans-serif;font-size: 15px;font-weight: 400;line-height: 22.5px;margin-bottom: 0px;margin-left: 0px;margin-right: 0px;margin-top: 0px;outline-color: rgb(255, 255, 255);outline-style: none;outline-width: 0px;overflow: visible;overflow-x: visible;overflow-y: visible;padding-bottom: 6px;padding-left: 12px;padding-right: 12px;padding-top: 6px;text-align: center;text-decoration: none;text-decoration-color: rgb(255, 255, 255);text-decoration-line: none;text-decoration-style: solid;text-transform: none;transition-delay: 0s, 0s, 0s, 0s, 0s;transition-duration: 0.15s, 0.15s, 0.15s, 0.15s, 0.15s;transition-property: color, background-color, border-color, box-shadow, box-shadow;transition-timing-function: ease-in-out, ease-in-out, ease-in-out, ease-in-out, ease-in-out;vertical-align: middle;white-space: nowrap;-moz-border-bottom-colors: none;-moz-border-left-colors: none;-moz-border-right-colors: none;-moz-border-top-colors: none;-moz-user-select: none;}');
		newBtn.setAttribute('value', time);
		
		newBtn.addEventListener('click', timeButton, false);
		
		newDiv.appendChild(newBtn);
	}
	
	let attribution = document.createElement('small');
	attribution.setAttribute('style', 'font-size: xx-small; font-style: italic');
	attribution.appendChild(document.createTextNode('Buttons added by Dan, should be safe to use'));
	timeStampEntry.appendChild(attribution);	
	
	customTimestampEntryZome.style.height = '75px';
	
}

function validate(e) {
	var roomCounts = [];
	var gateCounts = [];
	var headCount;
	let pane = document.getElementById('dMainContent');
	let questions = pane.getElementsByClassName('dQuestion');
	
	// Retrieve all input fie
	for (let input of questions) {
		let qTitle = input.getElementsByClassName('dQuestionTitle_NoPadding')[0];
		if (qTitle.innerText.substring(0,4) == "Room") {
			roomCounts.push(input.getElementsByTagName('input')[0]);
		} else if (qTitle.innerText == "Head/Body Count") {
			headCount = input.getElementsByTagName('input')[0]
		} else if (qTitle.innerText.substr(qTitle.innerText.length - 10) == "Gate Count") {
			gateCounts.push(input.getElementsByTagName('input')[0]);
		}
	}
	
	// Test if gate count field is empty
	if ((gateCounts[0].value == "" || gateCounts[0].value == null) && (gateCounts[1].value == "" || gateCounts[1].value == null)) {
		console.log("No entries in gate count field");
	
		// Test if head count adds up
		if (Number.isInteger(parseInt(headCount.value))) {
			var count = 0;
			for (let roomCount of roomCounts) {
				if(Number.isInteger(parseInt(roomCount.value))) {
					count += parseInt(roomCount.value);
					console.log(count);
				}
			}
			
			if (count != parseInt(headCount.value)) {
				dispError("Counts do not add up");
				return;
			}
		} else {
			dispError("Please enter a number into \"Head/Body Count\"");
			return;
		}
	} else {
		if (!(headCount.value == null || headCount.value == "")) {
			dispError("Please do not combine gate and head counts");
			return;
		}
		for (let roomCount of roomCounts) {
			if (!(roomCount.value == null || roomCount.value == "")) {
				dispError("Please do not combine gate and head counts");
				return;
			}
		}
	}
	
	let msg = document.createTextNode('Validation complete');
	document.getElementById('leonard-dan-validator-lbl').innerText = null;
	document.getElementById('leonard-dan-validator-lbl').appendChild(msg);
}

function addValidator() {
	let row = document.createElement('tr');
	buttonSubmit.parentNode.parentNode.parentNode.appendChild(row);
	
	let cell = document.createElement('td');
	row.appendChild(cell);
	
	let buttonValidate = document.createElement('input');
	buttonValidate.setAttribute('value', 'Validate');
	buttonValidate.setAttribute('type', 'button');
	cell.appendChild(buttonValidate);
	
	let errorMsg = document.createElement('em');
	errorMsg.setAttribute('id', 'leonard-dan-validator-lbl');
	cell.appendChild(errorMsg);
	
	buttonValidate.addEventListener('click', validate, false);
}

function dispError(msg) {
	let lbl = document.getElementById('leonard-dan-validator-lbl')
	let txt = document.createTextNode(msg);
	
	lbl.innerText = null;
	lbl.appendChild(txt);
}

addButtons();
showCustomTimestamp();
addValidator();