var topMatter = document.getElementById('yui-main');
var searchArea = topMatter.getElementsByClassName('topcol1')[0];

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

	let newBtnUIUC = document.createElement('input')
	newBtnUIUC.setAttribute('type', 'button');
	newBtnUIUC.setAttribute('value', 'UIUC Holdings Only');
	newBtnUIUC.addEventListener('click', clickUIUC, false);
	btnDiv.appendChild(newBtnUIUC);

	let newBtnIAS = document.createElement('input')
	newBtnIAS.setAttribute('type', 'button');
	newBtnIAS.setAttribute('value', 'IAS Holdings Only');
	newBtnIAS.addEventListener('click', clickIAS, false);
	if(window.location.href.indexOf("uiu_ias") > -1) {
		newBtnIAS.setAttribute('disabled', 'disabled');
	}
	btnDiv.appendChild(newBtnIAS);

	let newBtnIShare = document.createElement('input')
	newBtnIShare.setAttribute('type', 'button');
	newBtnIShare.setAttribute('value', 'I-Share');
	newBtnIShare.addEventListener('click', clickIShare, false);
	btnDiv.appendChild(newBtnIShare);
}

function clickUIUC(e) {}

function clickIAS(e) {
	if(getParameterByName('filter[]') == "locations:\"uiu_ias\"") {
		return;
	}

	let destination = updateQueryStringParameter(window.location.href, 'filter[]', 'locations:\"uiu_ias\"');
	window.location.href = destination;
}

function clickIShare(e) {}

addButtons();