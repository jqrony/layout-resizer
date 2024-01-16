/**
 * layoutResizer v1.0.0
 * https://github.com/jqrony/layout-resizer
 * 
 * Copyright 2024, Shahzada Modassir
 * Release under the MIT license
 * https://github.com/jqrony/layout-resizer/blob/main/LICENSE
 * 
 * @author Shahzada Modassir
 * date: 16 January 2024 13:38:35 GMT+0530
 */
(function(_w) {
"use strict";
var rnegativeParser = /^\s*(?:left|top)$/i;
var rdir = /^(?:left|right|(top|bottom))$/i;

// Configuration layoutResizer just need common properties
function doConfig(self, dir, overrideCursor) {
	self.attachUnit = function (value) {return value + "px"};
	dir = rdir.exec(dir) || error(dir);
	self.dir = dir.shift().toLowerCase();
	self.axis = !!dir[0] ? 'Y' : 'X';
	self.client = ("client" + self.axis);
	addProp(self, overrideCursor);
	self.origin = setOrigin(self.dir);
	!overrideCursor&&setCss(self.sash, "cursor", self.cursor);
}

function setCss(elem, prop, value) {
	return elem.style[prop] = value;
}

function _switch({dir}, value) {
	return rnegativeParser.test(dir) ? -value : value;
}

function resizeHandler(self, callback) {
	return self[callback.name]=function(event) {
		callback(self, event);
	};
}

function setOrigin(dir) {
	return ({left: "right", right: "left", top: "bottom", bottom: "top"})[ dir ];
}

function getStyle(elem, prop) {
	var r=elem.style[prop] || _w.getComputedStyle(elem)[prop];
	return parseFloat(r) || r;
}

function addProp(self, cursor) {
	cursor = cursor && getStyle(self.sash, "cursor");
	Object.assign(self, ({
		X: {cssprop: "width",  cursor: (cursor || "ew-resize")},
		Y: {cssprop: "height", cursor: (cursor || "ns-resize")}
	})[self.axis]);
}

function layoutResizer(layout, sash, dir, overrideCursor) {
	typeof layout.nodeType!=="number" && error("layout");
	typeof sash.nodeType!=="number" && error("sash-resizer");
	this.layout   = layout;
	this.sash     = sash;
	this.handler  = resizeHandler;
	doConfig(this, dir, overrideCursor), this.resize(this);
}

function ditachResizer(self, e) {
	removeEvent(_w.document, "mousedown touchstart", self.initResizer);
	removeEvent(_w.document, "mousemove touchmove", self.doResizer);
	removeEvent(_w.document, e.type, self.ditachResizer);
}

function doResizer(self, e) {
	// Let's isDefaultPrevented disabled the element dragging
	self.dragging && e.preventDefault();
	var event, value;
	event = forceEvent(e);
	value = _switch(self, event[self.client] - self.initPos);
	setCss(self.layout, self.cssprop, self.attachUnit(self[self.cssprop] +value));
}

function initResizer(self, e) {
	// SET: current dimension of layout in specific layoutResizer property
	self[self.cssprop] = getStyle(self.layout, self.cssprop);
	var event = forceEvent(e);
	self.dragging = true;
	self.initPos = event[self.client];
	setEvent(_w.document, "mouseup touchend", self.handler(self, ditachResizer));
	setEvent(_w.document, "mousemove touchmove",  self.handler(self, doResizer));
}

layoutResizer.prototype = {
	prototype: layoutResizer,
	resize: function() {
		setEvent(this.sash, "mousedown touchstart", this.handler(this, initResizer));
	}
};

function setEvent(elem, types, callback) {
	types = types.split(" ");
	for(let i in types) elem.addEventListener(types[i], callback);
}

function removeEvent(elem, types, callback) {
	types = types.split(" ");
	for(let i in types) elem.removeEventListener(types[i], callback);
}

layoutResizer.each = function (obj, callback) {
	return Array.isArray(obj) ?
		layoutResizer.each(Object.create(obj), callback) :
		!function (name) {
			for (name in obj) {
				if (callback.call(obj[name], +name || name, obj[name])===false) {
					break;
				}
			}
		}(), obj;
};

function forceEvent(event) {
	return event.touches && event.touches[0] || event;
}

function error(error) {
	throw new TypeError("Invalid '" + error + "' Argument.");
}


// EXPOSE

// Register as named AMD module, since Codecore can be concatenated with other
// files that may use define
if (typeof define==="function" && define.amd) {
	define(function() {
		return layoutResizer;
	});
}
// For CommonJS and CommonJS-like environments
// (such as Node.js) expose a factory as module.exports
else if (typeof module==="object" && module.exports) {
	module.exports = layoutResizer;

// Attach layoutResizer in `window` with Expose layoutResizer Identifiers, AMD
// CommonJS for browser emulators (trac-13566)
} else {
	window.layoutResizer = layoutResizer;
}
// EXPOSE
})(this.window);