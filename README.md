# Layout Resizer [![npm version](https://img.shields.io/npm/v/layout-resizer?style=flat-square)](https://www.npmjs.com/package/layout-resizer)
> A pure javascript Layout Resizer to be resize sidebar, menubar, panel etc. host Libarary.

## How to build Layout Resizer
Clone a copy of the main Layout Resizer git repo by running:
```bash
git clone git://github.com/jqrony/layout-resizer.git
```
In the layout-resizer/lib folder you will find build version of sizzle along with the minified copy and associated map file.

## npm install
```bash
# install locally (recomended)
npm install layout-resizer --save
```

## Public API
```js
new layoutResizer(
  DOMElement layout,     // Resizable layout
  DOMElement sash,       // Resizer
  String dir,            // left, right, top, bottom
  Boolean overrideCursor // true/false
);
```

![preview](https://graphicserverstorage.github.io/store/snap.png)

create `style.css` file or internal implement in html
```css
html, body, .layout {
  height: 100%;
  width: 100%;
}
* {
  padding: 0;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, sans-serif;
}
.sidebar {
  justify-content: center;
  align-items: center;
	height: 100%;
  width: 222px;
  display: flex;
  position: absolute;
  background-color: #f1f0f0;
}
.sash {
  height: 100%;
  width: 4px;
	right: 0;
  position: absolute;
}
.sash {
  background-color: #8a2de0;
}
```

Create `index.html` file
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layout Resizer</title>
	<!-- Implement CDN Link -->
  <script src="https://cdn.jsdelivr.net/npm/layout-resizer/lib/layout-resizer.min.js"></script>
</head>
<body>
  <div class="layout">
    <div class="sidebar">
      <div class="sash"></div>
      <strong>Primary Sidebar</strong>
    </div>
  </div>
</body>
</html>
```

Create `index.js` or implement internally
```js
const sash = document.querySelector(".sash");
const sidebar = document.querySelector(".sidebar");

new layoutResizer(sidebar, sash, "right");
```
