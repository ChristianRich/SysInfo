/**
 * Displays system information overlay in the top left corner of the screen.
 * Currently screen resolution and user agent is included.
 *
 * SysInfo can be activated in three two ways:
 *
 * 1) From a query string. Just type 'sysinfo=true' in the URL and it will pop open (as long as the script is included in the page).
 *
 * 2) Via JavaScript:
 *
 *    var sysInfo = new SysInfo();
 *    document.body.appendChild(sysInfo.domElement);
 *
 * 3) Via a bookmarklet (see my blog for details)
 */
var SysInfo = function(){

	var onResize = function(e){

		if(!container.parentNode){
			return;
		}

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

	var ua = new UAParser().getResult();
	sysContainer.appendChild(document.createTextNode(JSON.stringify(ua, null, 1)));

	container.onclick = function(){
		remove();
	};

	window.addEventListener('resize', onResize);
	onResize(null);

	var qs = parseQueryString();

	if(qs['sysinfo'] && !!document.body){
		document.body.appendChild(container);
	}

	return {
		REVISION: 1,
		domElement : container,
		update : resize
	};
};