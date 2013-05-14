/**
 * Displays a system information overlay in the top left corner of the browser.
 * Currently screen resolution and user agent is included.
 *
 * SysInfo can be activated from a query string:
 *
 * Just include 'sysinfo=true' in the URL and it will display.
 * The name of the query string that SysInfo looks for is customizable.
 *
 * Options include:
 *
 * displayFromStart (true / false) : Will show or hide SysInfo on page load.
 * queryStringName (string) : The name of the query string that SysInfo will look for when hidden.
 */
var SysInfo = function(){

	var onResize = function(e){
		dimContainer.innerHTML = window.innerWidth + 'x' + window.innerHeight;
	};

	var remove = function(){

		if(!container){
			return;
		}

		if(container.parentNode){
			container.parentNode.removeChild(container);
		}

		container.onclick = null;
		container = null;
		window.removeEventListener('resize', onResize);
	};

	var parseQueryString = function(){

		var dict  = {},
			decode = function (s) {
				return decodeURIComponent(s.replace(/\+/g, ' '));
			},
			queryString = location.search.substring(1),
			keyValues = queryString.split('&');

		for(var i in keyValues) {
			var key = keyValues[i].split('=');

			if(key.length > 1) {
				dict[decode(key[0])] = decode(key[1]);
			}
		}

		return dict;
	};

	var container = document.createElement('div');
	container.style.cssText = "position: fixed; line-height: 100%; zoom: reset; display: block; text-align: left; vertical-align: baseline; border: 0 none; z-index: 20000; top: 10px; left: 10px; font-family: 'Lucida Console'; color: white; Monaco, monospace; font-size: 11px; margin: 10px; padding: 5px; background-color: rgba(100, 100, 100, 0.9); width: 240px; max-width: 360px; min-width: 240px;-webkit-user-drag: none;-webkit-touch-callout: none;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none;";

	var dimContainer = document.createElement('div');
	dimContainer.id = 'dim';
	dimContainer.style.cssText = 'padding-bottom: 5px; font-weight: bold';
	container.appendChild(dimContainer);

	var sysContainer = document.createElement('div');
	sysContainer.style.cssText = 'background-color : rgba(0,0,0,0.5); padding: 5px;';
	container.appendChild(sysContainer);

	var sysInfo = new UAParser().getResult();
	sysContainer.appendChild(document.createTextNode(JSON.stringify(sysInfo, null, 1)));

	container.onclick = function(){
		remove();
	};

	window.addEventListener('resize', onResize);
	onResize(null);

	var qs = parseQueryString();

	if(qs['sysInfo'] && !!document.body){
		document.body.appendChild(container);
	}

	return {
		domElement : container
	};
};

SysInfo.REVISION = '1.0.0';
window.SysInfo = SysInfo;