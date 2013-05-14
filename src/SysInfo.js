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
var SysInfo = function(options){

	var o = options || {};

	var container,
		q = o.queryStringName || 'sysinfo',
		displayFromStart = Boolean(o.displayFromStart) || true;

	var build = function(){

		if(container){
			return;
		}

		container = document.createElement('div');
		container.style.cssText = "position: fixed; top: 10px; left: 10px; font-family: 'Lucida Console'; color: white; Monaco, monospace; font-size: 11px; margin: 10px; padding: 5px; background-color: rgb(100, 100, 100); width: 240px; max-width: 360px; min-width: 240px;-webkit-user-drag: none;-webkit-touch-callout: none;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none;";
		container.id = 'sysInfo';

		var dimContainer = document.createElement('div');
			dimContainer.id = 'dim';
			dimContainer.style.cssText = 'padding-bottom: 5px; font-weight: bold';
			container.appendChild(dimContainer);

		var sysContainer = document.createElement('div');
			sysContainer.style.cssText = 'background-color : rgb(50,50,50); padding: 5px;';
			container.appendChild(sysContainer);

		var sysInfo = new UAParser().getResult();
		sysContainer.appendChild(document.createTextNode(JSON.stringify(sysInfo, null, 1)));

		container.onclick = function(){
			remove();
		};

		document.body.appendChild(container);
		window.addEventListener('resize', onResize);
		onResize(null);
	};

	var onResize = function(e){

		if(!container){
			return;
		}

		container.querySelector('#dim').innerHTML = window.innerWidth + 'x' + window.innerHeight;
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

	var qs = parseQueryString();

	if(qs[q] || displayFromStart){
		build();
	}

	return {
		remove : remove,
		build : build
	};
};