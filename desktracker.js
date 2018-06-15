var customTimestampEntryZome = document.getElementById('dTimestamp');
var libraryCountTimes = [
	'09:00am'
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

function showCustomTimestamp() {
	// internal code here taken from inline javascript of "custom timestamp" button
	slidedown('dTimestamp');
	document.getElementById('rTimestampCustom').checked=true;
	document.getElementById('sTimestampCal').style.display='';
}

function addButtons() {
	