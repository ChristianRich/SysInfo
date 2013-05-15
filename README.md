SysInfo
=======

Displays user agent and screen dimensions overlay. Works for desktop, tablet and mobile. Looks like this:

![SysInfo screen show](https://raw.github.com/ChristianDen/SysInfo/master/images/sys-info-screenshot.gif "Optional title")

###Why###
I was messing around with responsive design and needed a quick way of getting user agent and screen dimensions in order to set my media query breakpoints. So I made this. I'm sure it can be used for other purposes.

###How###
First you need to include the script in your page:

```html
<script src="http://raw.github.com/ChristianDen/SysInfo/master/dist/sysinfo.min.js"></script>
```
or clone the repo and host the file your self:
```html
<script src="js/sysinfo.min.js"></script>
```
From here you have three options:

1) Hide SysInfo by default and trigger it with a query string. Just append '?s' to the url. Really, it's that simple.
```html
http://myawesomewebsite.com/?s
```

2) Show SysInfo on page load. Include this script in the body tag on your page:
```html
<script>
    var sysInfo = new SysInfo();
    document.body.appendChild(sysInfo.domElement);
</script>
```

3) Via a bookmarklet. This is only applicable for desktop, since I haven't found a solid way of using bookemarklets on mobile and tablet (see my blog for details).

###FAQ###

Why is it so ugly? *I'm not a designer and don't really care.*

Why is the user agent info so hard to read? *You're a developer. You'll figure it out :-)*
