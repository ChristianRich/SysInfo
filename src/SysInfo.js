/**
 * SysInfo by Christian Schlostich
 * https://github.com/ChristianDen/SysInfo
 */
var SysInfo = function(){

	var onResize = function(){
		dimContainer.innerHTML = window.innerWidth + 'x' + window.innerHeight;
	};

	var remove = function(){

		if(container.parentNode){
			container.parentNode.removeChild(container);
		}

		container.onclick = null;
		container = null;
		window.removeEventListener('resize', onResize);
	};

	/**
	 * Returns the query string as an object.
	 */
	var QueryStringUtil = function(){

		this.getVal = function(value){
			return dict[value];
		};

		this.hasKey = function(key){
			return dict.hasOwnProperty(key);
		};

		var dict  = {},

			decode = function(s){
				if(!s) return '';
				return decodeURIComponent(s.replace(/\+/g, ' '));
			},

			queryString = location.search.substring(1),
			keyValues = queryString.split('&');

		for(var i in keyValues) {
			var key = keyValues[i].split('=');
			dict[decode(key[0])] = decode(key[1]);
		}
	};

	var container = document.createElement('div');
	container.style.cssText = "position: fixed; line-height: 100%; zoom: reset; display: block; text-align: left; vertical-align: baseline; border: 0 none; z-index: 20000; top: 10px; left: 10px; font-family: 'Lucida Console'; color: white; Monaco, monospace; font-size: 11px; margin: 10px; padding: 5px; background-color: rgba(100, 100, 100, 0.9); width: 240px; max-width: 360px; min-width: 240px;-webkit-user-drag: none;-webkit-touch-callout: none;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none;";

	var dimContainer = document.createElement('div');
	dimContainer.style.cssText = 'padding-bottom: 5px; font-weight: bold';
	container.appendChild(dimContainer);

	var sysContainer = document.createElement('div');
	sysContainer.style.cssText = 'background-color : rgba(0,0,0,0.5); padding: 5px;';
	container.appendChild(sysContainer);

	var ua = new UAParser().getResult();
	sysContainer.appendChild(document.createTextNode(JSON.stringify(ua, null, 1)));

	var qs = new QueryStringUtil();

	container.onclick = function(){
		remove();
	};

	if(qs.hasKey('s') && !!document.body && !container.parentNode){
		document.body.appendChild(container);
	}

	window.addEventListener('resize', onResize);
	onResize();

	return {
		REVISION: 2,
		domElement : container,
		update : onResize
	};
};