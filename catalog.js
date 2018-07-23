var topMatter = document.getElementById('yui-main');
var searchArea = topMatter.getElementsByClassName('topcol1')[0];

/*
var localLib = {
	name: 'UIUC'
};
*/

var localDept = {
	name: 'IAS',
	code: 'uiu_ias'
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function addButtons() {
	let br1 = document.createElement('br');
	searchArea.appendChild(br1);
	let btnDiv = document.createElement('div');
	searchArea.appendChild(btnDiv);

	/*
	let newBtnLocalLib = document.createElement('input')
	newBtnLocalLib.setAttribute('type', 'button');
	newBtnLocalLib.setAttribute('value', localLib.name + ' Holdings Only');
	newBtnLocalLib.addEventListener('click', clickLocalLib, false);
	btnDiv.appendChild(newBtnLocalLib);
	*/

	let newBtnLocalDept = document.createElement('input')
	newBtnLocalDept.setAttribute('class', 'libExt-button')
	newBtnLocalDept.setAttribute('type', 'button');
	newBtnLocalDept.setAttribute('value', localDept.name + ' Holdings Only');
	newBtnLocalDept.addEventListener('click', clickLocalDept, false);
	if(window.location.href.indexOf("uiu_LocalDept") > -1) {
		newBtnLocalDept.setAttribute('disabled', 'disabled');
	}
	btnDiv.appendChild(newBtnLocalDept);

	/*
	let newBtnIShare = document.createElement('input')
	newBtnIShare.setAttribute('type', 'button');
	newBtnIShare.setAttribute('value', 'I-Share');
	newBtnIShare.addEventListener('click', clickIShare, false);
	btnDiv.appendChild(newBtnIShare);
	*/
}

//function clickLocalLib(e) {}

function clickLocalDept(e) {
	if(getParameterByName('filter[]') == 'locations:\"' + localDept.code + '\"') {
		return;
	}

	let destination = updateQueryStringParameter(window.location.href, 'filter[]', 'locations:\"uiu_ias\"');
	window.location.href = destination;
}

//function clickIShare(e) {}

addButtons();