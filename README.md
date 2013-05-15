SysInfo
=======

Displays user agent and screen dimensions overlay for application debugging. Works for desktop, tablet and mobile.

###Why###
I was messing around with responsive design and needed a quick way of getting user agent and screen dimensions.

###How###

First you need to include the script in your page
```html
<script src="http://raw.github.com/ChristianDen/SysInfo/master/dist/sysinfo.min.js"></script>
```
From here you have three options:

1) Show SysInfo with a query string. Just append '?s' to the url. Really, it's that simple.
```html
http://myawesomewebsite.com/?s
```

2) JavaScript:
```html
<script>
    var sysInfo = new SysInfo();
    document.body.appendChild(sysInfo.domElement);
</script>
```

This method will show SysInfo on page load.

3) Via a bookmarklet. This is only applicable for desktop, since I haven't found a solid way of using bookemarklets on mobile and tablet (see my blog for details)
