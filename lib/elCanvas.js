/**
 * Work-in-Progress, take all the code made by Lucky Dee and
 * - standardize naming
 * - standardize coding style
 * - Use javascript prototype for efficiency
 *
 * Update by Glenn R. Wichman
 * Should work identically to original elCanvas EXCEPT
 * original elCanvas allowed you to put the "new" operator in front of objectType functions
 * e.g. var r = new el.rect(...);
 * (the 'new' never did anything, so it really wasn't correct but it was allowed, because elCanvas had no prototype)
 * There is no way to allow that usage and also get all the prototype efficiency, so code will have to change to
 * var r = el.rect(...);
 * (Which also worked fine in original elCanvas as those functions aren't constructors so don't need to be called with new)
 */

elCanvas = (function () {
	var objectTypes = ["rect", "circle", "line", "quadLine", "image", "shape", "text", "svg", "textSprite" ];
	var defaultStyles = {
		fallback: {
			lineWidth: 0.001,
			fillStyle: '#' + Math.floor(Math.random() * 0xffffff).toString(16),
			strokeStyle: "#ffffff"
		},
		rect: {
			fillStyle: '#' + Math.floor(Math.random() * 0xffffff).toString(16),
		},
		svg: {
			fillStyle: '#' + Math.floor(Math.random() * 0xffffff).toString(16),
		},
		text: {
			fillStyle: '#' + Math.floor(Math.random() * 0xffffff).toString(16),
			font: "30px museo300",
			fillStyle: '#ff0000',
			textAlign: "center"
		},
		line: {
			strokeStyle: "#ff0000",
			lineWidth: 5,
			lineCap: 'round'
		},
		quadLine: {
			strokeStyle: "#ff0000",
			lineWidth: 5,
			lineCap: 'round'
		},
		image: {
			src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA+CAMAAABeI7j4AAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDIYgjAAAAL3RSTlMA+/kEUo+SouQeRw3FBvLhpjOfl3EWq3NMJNzCjIRa0bpOQy8rCep+ZmM5LtLMs4FqBYIAAAHLSURBVEjH5dTbcoIwEIDh3YRa1FKqFOr5rLXadt//7bqs6KqDSfS2/zgchG8Ckyg80LrpLQew56QVx2nsiq++X5qIAqqMEvRkTkYJf8zNiEiNEl9qlMTDl/qGP+bCKMmgXR+sYsKD+SiNkhHcKk/5uholDbC1JdCXUdScyBPUZ6EpRI2f6ChqgkZRsw0hKRmU2CAVIQ/2Suc9+wiXj966ZdkMCYOItjBk7iIWWveSxEWsBc2GjFIDfARWHb0tX4hzEJmHQdzhnRwnBX2JcRFYfRMNxCSQvBEZNm6ynJIxYipBZusmybD8WowI5GPcgXUQmLweTLoHEXwpa3veZS4GaToTIVesm0CvMufCSawY5O+QVNwgauab6neowrtgouODdcvZCSFJRhLSdAngJ/YwH9W7pB3vg6kgUuMZZX0URjal8ZC2CL40jja8E+MmtiBkIedRtXbivXuNjfismkFZB3zy0ncT+NQZPKy3Ye5eY1bMiA+Oa2eWB6yxcUN2spkUzZA1JhvNv8b0Ls1Pwv/66vsPBB8hDbCJdbWG3hUZg7fd1bv8tiJPi/EVwYDkRiXBKUFzFpq65FmOxGBwQiZ0VwWTZda4o2wCj/QHW46eA37RLLEAAAAASUVORK5CYII="
		}
	};
	var defaultProps = {
		fallback: {
			globalCompositeOperation: "source-over",
			transformOrigin: "50% 50%",
			x: 0,
			y: 0,
			skewX: 0,
			skewY: 0,
			xOffset: 0,
			yOffset: 0,
			scaleX: 1,
			scaleY: 1,
			scale: 1,
			opacity: 1,
			rotation: 0,
			zIndex: 0,
			parent: {
				id: "dummyParent"
			}
		},
		circle: {
			radius: 50
		},
		line: {
			x1: 0,
			y1: 0,
			x2: 100,
			y2: 100
		},
		quadLine: {
			x1: 0,
			y1: 0,
			qx:0,
			qy:50,
			x2: 100,
			y2: 100
		},
		rect: {
			width: 100,
			height: 100
		},
		svg: {
			__cachedPoints: "",
			__cachedFunction: function() {},
			width: 100,
			height: 100,
			points: "93.8,11.7 82.1,0 46.9,35.2 11.7,0 0,11.7 35.2,46.9 0,82.1 11.7,93.8 46.9,58.6 82.1,93.8 93.8,82.1 58.6,46.9"
		},
		image: {
			rounded: false
		},
		text: {
			width: 0,
			height: 0
		},
		shape: {
			customShape: function () {}
		},
		textSprite: {
			transformOrigin: "0% 0%",
			letterSpacing: 0,
			lineHeight:1,
			size: 1,
			x: 0,
			y: 0,
			rounded: false,
			align: 'left',
			null: true
		}
	};
	var fallbackImage;
	/**
	 * lazy-instantiate a fallback image, which is shared by all instances
	 */
	function getFallbackImage() {
		if (!fallbackImage) {
			fallbackImage = new Image();
			fallbackImage.src = defaultStyles.image.src;
			fallbackImage.id = 'backup';
		}
		return fallbackImage;
	}

	/**
	 * Creates a wrapper around a context that takes all the methods that return undefined
	 * and makes them return the context instead, so you can chain calls together
	 */
	var nonChainableMethods = [ "createImageData", "createLinearGradient", "createPattern", "createRadialGradient", "getImageData", "getLineDash", "isPointInPath", "isPointInStroke", "measureText" ];
	function chainableContext(ctx) {
		var _this = this;
		_this.ctx = ctx;
		function makeChainable(method) {
			if (nonChainableMethods.indexOf(method) > -1) {
				// This method returns a value, so just bind it
				_this[method] = _this.ctx[method].bind(_this.ctx);
			} else {
				// This method doesn't return a value, so wrap it with a method that returns myself.
				_this[method] = function () {
					_this.ctx[method].apply(_this.ctx, arguments);
					return _this;
				}
			}
		}
		for (var method in ctx) {
			if (typeof ctx[method] === 'function') {
				makeChainable(method);
			}
		}
	}

	chainableContext.prototype = {
		set : function (prop, val) {
			this.ctx[prop] = val;
			return this;
		},
		setAll: function (obj) {
			for (var key in obj) {
				this.ctx[key] = obj[key];
			}
			return this;
		},
		fillAndStroke: function (style, opacity) {
			this.set("globalAlpha", opacity);
			if (style.fillStyle) {
				this.fill();
			}
			if (style.strokeStyle) {
				this.stroke();
			}
			return this;
		}
	}

	/**
	 * class for doing nice affine transform calculations
	 */
	function Matrix() {
		this.data = [1, 0, 0, 1, 0, 0];
	}

	Matrix.prototype = {
		translate: function (x, y) {
			this.data[4] += this.data[0] * x + this.data[2] * y;
			this.data[5] += this.data[1] * x + this.data[3] * y;
		},
		scale: function (x, y) {
			this.data[0] *= x;
			this.data[1] *= x;
			this.data[2] *= y;
			this.data[3] *= y;
		},
		rotate: function (radians) {
			var cos = Math.cos(radians);
			var sin = Math.sin(radians);
			var m11 = this.data[0] * cos + this.data[2] * sin;
			var m12 = this.data[1] * cos + this.data[3] * sin;
			var m21 = -this.data[0] * sin + this.data[2] * cos;
			var m22 = -this.data[1] * sin + this.data[3] * cos;
			this.data[0] = m11;
			this.data[1] = m12;
			this.data[2] = m21;
			this.data[3] = m22;
		},
		skew: function (degX, degY) {
			var tanX = Math.tan(degX * Math.PI / 180);
			var tanY = Math.tan(degY * Math.PI / 180);
			var matrix0 = this.data[0];
			var matrix1 = this.data[1]
			this.data[0] += tanY * this.data[2];
			this.data[1] += tanY * this.data[3];
			this.data[2] += tanX * matrix0;
			this.data[3] += tanX * matrix1;
		}
	};

	/**
	 * handy utility functions used by elCanvas
	 */
	var _util = {
		shapes: {
			circle: function(el, x, y, r) {
				return el.ctx.beginPath().arc(x, y, r, 0, 2 * Math.PI, false).closePath();
			},
			normalRect: function(el, x, y, w, h) {
				return el.ctx.beginPath().rect(x, y, w, h).closePath();
			},
			roundRect: function(el, x, y, w, h, r) {
				var cr= typeof r == 'object' ? r : { tl: r, tr: r, bl: r, br: r }; //Corner Radius
				return el.ctx.beginPath()
					.moveTo(x + cr.tl, y)
					.lineTo(x + w - cr.tr, y)
					.quadraticCurveTo(x + w, y, x + w, y + cr.tr)
					.lineTo(x + w, y + h - cr.br)
					.quadraticCurveTo(x + w, y + h, x + w - cr.br, y + h)
					.lineTo(x + cr.bl, y + h)
					.quadraticCurveTo(x, y + h, x, y + h - cr.bl)
					.lineTo(x, y + cr.tl)
					.quadraticCurveTo(x, y, x + cr.tl, y)
					.closePath();
			}
		},
		missingLetterProps: function (map) {
			var frame;
			if (map[" "]) {
				frame = map[" "].frame;
			} else {
				frame = map[Object.keys(map)[0]]; // just grab the first defined letter
			}
			// If we still have nothing, return something
			frame = frame || { w: 1, h: 1 };
			return {
				type: "rect",
				width: frame.w,
				height: frame.h,
				style: {
					lineWidth: 2,
					strokeStyle: "#000000",
					fillStyle: false
				}
			};
		},
		// assumes alignment is left, center, or right
		adjustAlignment: function (letters, edge, alignment) {
			function adjustLine(firstIdx, lastIdx) {
				var extra = edge - (letters[lastIdx].x + letters[lastIdx].width);
				if (alignment == "center") {
					extra /= 2;
				}
				for (var x = firstIdx; x <= lastIdx; x++) {
					letters[x].x += extra;
				}
			}
			if (alignment == "left") {
				return;
			}
			var lineStart = 0, lineEnd = 1;
			while (lineEnd < letters.length) {
				if (letters[lineEnd].y > letters[lineStart].y) {
					adjustLine(lineStart, lineEnd - 1);
					lineStart = lineEnd;
				}
				lineEnd++;
			}
			adjustLine(lineStart, lineEnd - 1);
		},
		mergeDefaultProperties: function (props, type) {
			props = props || {};
			props.style = props.style || {};
			props.type = type;
			_util.setIfUndefined(props, defaultProps[type]);
			_util.setIfUndefined(props, defaultProps.fallback);
			_util.setIfUndefined(props.style, defaultStyles[type] || defaultStyles.fallback);
			return props;
		},
		setIfUndefined: function (providedObject, newObject) {
			var mergedObject = Object.assign({}, newObject, providedObject);
			Object.assign(providedObject, mergedObject);
		},
		setObjectScale: function (props) {
			if (props.scale != 1) {
				props.scaleX = props.scale;
				props.scaleY = props.scale;
			}
		},
		//generic shuffle function
		shuffleArray: function (array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		},
		// go through every object searching for objects that have parents
		addParents: function (objects) {
			objects.forEach(function (object) {
				//if there isn't a childnodes object add one
				if (object.parent.id != "dummyParent") {
					// the children inherit its parent's z
					object.zIndex += object.parent.zIndex;
					if (!object.parent.childNodes) {
						object.parent.childNodes = [];
					}
					//  push all new kids into its object
					object.parent.childNodes.push(object);
				}
			});
		},
		loadImageFromUrl: function(imageMap, imageId, imageUrl) {
			imageMap[imageId] = new Promise(function (resolve, reject) {
				var img = new Image();
				img.src = imageUrl;
				img.id = imageId;
				img.addEventListener('load', function () {
					imageMap[imageId] = img;
					resolve(img);
				}, false);
				// TODO: handle load fails
			});
		},
		/**
		 * Generate an Image for a radial gradient, with the given inner and outer colour stops.
		 * Useful to generate quick sprite images of blurred spheres for explosions, particles etc.
		 */
		generateRadialGradientBitmap: function (id, size, innerColour, outerColour) {
			var buffer = document.createElement('canvas'),
				width = size << 1;
			buffer.width = buffer.height = width;
			var ctx = buffer.getContext('2d'),
				radgrad = ctx.createRadialGradient(size, size, size >> 1, size, size, size);
			radgrad.addColorStop(0, innerColour);
			radgrad.addColorStop(1, outerColour);
			ctx.fillStyle = radgrad;
			ctx.fillRect(0, 0, width, width);
			var img = new Image();
			img.src = buffer.toDataURL("image/png");
			return img;
		},
		/**
		 * return true if the innerRect lives fully inside the outerRect
		 */
		fullyInside: function(innerRect, outerRect) {
			return innerRect.x < outerRect.x + outerRect.width &&
				innerRect.x + innerRect.width > outerRect.x &&
				innerRect.y < outerRect.y + outerRect.height &&
				innerRect.y + innerRect.height > outerRect.y;
		},
		// Debounce function for resizing
		debounce:function (fn) {
			// Setup a timer
			var timeout;
			// Return a function to run debounced
			return function () {
				var context = this;
				var args = arguments;
				if (timeout) {
					window.cancelAnimationFrame(timeout);
				}
				timeout = window.requestAnimationFrame(function () {
					fn.apply(context, args);
				});
			}

		},
		/*
		 * Thank you Stefan Goessner
		 * https://github.com/goessner/parseSvgPathData for the amazing parser for IE!
		 * I had to modify this so i can have a cached system
		 */
		parseSvgPathData: function (object, ctx) {
			var data = object.points;
			var positions = {x:[], y:[]};
			var calls = [];
			var ifc = {
				init : function() {
					this.x = this.x0 = this.x1 = this.x2 = this.y = this.y0 = this.y1 = this.y2 = 0;
					calls.push([ctx.beginPath, []]);
				},
				A : function(rx, ry, rot, fA, fS, x, y) {
					var x12 = x - this.x, y12 = y - this.y,
						phi = rot / 180 * Math.PI,
						cp = phi ? Math.cos(phi) : 1, sp = phi ? Math.sin(phi) : 0,
						k = ry / rx,
						dth_sgn = fS ? 1 : -1,
						Nx = dth_sgn * (-x12 * cp - y12 * sp), Ny = dth_sgn * (-x12 * sp + y12 * cp),
						NN = Math.hypot(Nx, Ny / k),
						R = 2 * rx > NN ? rx : NN / 2, // scale R to a valid value...
						dth = 2 * dth_sgn * Math.asin(NN / 2 / R),
						th1, ct, st;

					if (fA) {
						dth = dth > 0 ? 2 * Math.PI - dth : -2 * Math.PI - dth;
					}
					th1 = Math.atan2(k * Nx, Ny) - dth / 2;
					ct = Math.cos(th1); st = Math.sin(th1);
					calls.push([ctx.ellipse, [this.x - R * (cp * ct - sp * k * st),
						this.y - R * (sp * ct + cp * k * st),
						R, R*k, phi, th1, th1 + dth, dth_sgn === -1]]);
					this.x = x; this.y = y;
					positions.x.push(x);
					positions.y.push(y);
				},
				M : function(x,y) {
					positions.x.push(x);
					positions.y.push(y);
					calls.push([ctx.moveTo, [this.x=this.x0=x, this.y=this.y0=y]]);
				},
				L : function(x,y) {
					positions.x.push(x);
					positions.y.push(y);
					calls.push([ctx.lineTo, [this.x=x, this.y=y]]);
				},
				H : function(x)   {
					positions.x.push(x);
					calls.push([ctx.lineTo, [this.x=x, this.y ]]);
				},
				V : function(y)   {
					positions.y.push(y);
					calls.push([ctx.lineTo, [this.x,   this.y=y]]);
				},
				C : function(x1,y1,x2,y2,x,y) {
					positions.x.push(x);
					positions.y.push(y);
					calls.push([ctx.bezierCurveTo, [this.x1=x1,this.y1=y1,this.x2=x2,this.y2=y2,this.x=x,this.y=y]]);
				},
				S : function(x2,y2,x,y) {
					positions.x.push(x);
					positions.y.push(y);
					calls.push([ctx.bezierCurveTo, [this.x1=2*this.x-this.x2,this.y1=2*this.y-this.y2,
						this.x2=x2,this.y2=y2,this.x=x,this.y=y]]);
				},
				Q : function(x1,y1,x,y) {
					positions.x.push(x);
					positions.y.push(y);
					calls.push([ctx.quadraticCurveTo, [this.x1=x1,this.y1=y1,this.x=x,this.y=y]]);
				},
				T : function(x,y) {
					positions.x.push(x);
					positions.y.push(y);
					calls.quadraticCurveTo([ctx.quadraticCurveTo, [this.x1+=2*(this.x-this.x1),this.y1+=2*(this.y-this.y1),
						this.x=x,this.y=y]]);
				},
				Z : function() {
					calls.push([ctx.closePath, []])
				},
				a : function(rx,ry,rot,fA,fS,x,y) { this.A(rx,ry,rot,fA,fS,this.x+x,this.y+y) },
				m : function(x,y) { this.M(this.x+x,this.y+y) },
				l : function(x,y) { this.L(this.x+x,this.y+y) },
				h : function(x) { this.H(this.x+x) },
				v : function(y) { this.V(this.y+y) },
				c : function(x1,y1,x2,y2,x,y) { this.C(this.x+x1,this.y+y1,this.x+x2,this.y+y2,this.x+x,this.y+y) },
				s : function(x2,y2,x,y) { this.S(this.x+x2,this.y+y2,this.x+x,this.y+y) },
				q : function(x1,y1,x,y) { this.Q(this.x+x1,this.y+y1,this.x+x,this.y+y) },
				t : function(x,y) { this.T(this.x+x,this.y+y) },
				z : function() { this.Z() },
				// current point buffers (start, current, control)
				x0: 0,
				y0: 0,
				x:0,
				y:0,
				x1:0,
				y1:0,
				x2:0,
				y2:0
			};

			var rex = /([achlmqstvz])([^achlmqstvz]*)/ig;
			var seg = { A:{n:7,f:'A'}, C:{n:6,f:'C'}, H:{n:1,f:'H'},
				L:{n:2,f:'L'}, M:{n:2,f:'L'}, Q:{n:4,f:'Q'},
				S:{n:4,f:'S'}, T:{n:2,f:'T'}, V:{n:1,f:'V'},
				Z:{n:0},
				a:{n:7,f:'a'}, c:{n:6,f:'c'}, h:{n:1,f:'h'},
				l:{n:2,f:'l'}, m:{n:2,f:'l'}, q:{n:4,f:'q'},
				s:{n:4,f:'s'}, t:{n:2,f:'t'}, v:{n:1,f:'v'},
				z:{n:0} };
			var segment = function (ifc, type, args)  {
				if (type in seg) {
					if (args.length === seg[type].n) {
						var _ifc = ifc;
						_ifc[type].apply(_ifc, args);
					} else if (args.length > seg[type].n) {
						var _ifc2 = ifc;
						_ifc2[type].apply(_ifc2, args);
						args.splice(0, seg[type].n);
						segment(ifc, seg[type].f, args);
					}
				}
			};
			var match;

			ifc.init();
			// for each explicit named segment ...
			while (match = rex.exec(data)) {
				segment(ifc, match[1], match[2].replace(/^\s+|\s+$/g,'')  // trim whitespace at both ends (str.trim .. !)
					.replace(/(\d)\-/g,'$1 -') // insert blank between digit and '-'
					.split(/[, \t\n\r]+/g)     // as array
					.map(Number));
			}
			var minX = Math.min.apply(null, positions.x),
				maxX = Math.max.apply(null, positions.x),
				minY = Math.min.apply(null, positions.y),
				maxY = Math.max.apply(null, positions.y);
			object.width = (minX + (maxX - minX) / 2) * 2;
			object.height = (minY + (maxY - minY) / 2) * 2;
			var drawSVGShape = function() {
				calls.forEach(function (a) { a[0].apply(ctx, a[1]); });
			};
			return drawSVGShape;
		},
		/**
		 * hitTest:
		 * see if the mouse (or any other rectangle) is inside an interactable or debug object
		 * find the first matching object under the mouse
		 * @param callback {function} {optional} callback function to pass the object to
		 * @return the object under the mouse, or null if no interactable objects were there.
		 */
		hitTest: function (el, mousePosition, callback) {
			var length = el.objects.length;
			// Walk backward through the objects since they are sorted by zOrder
			for (var i = length -1; i >= 0; i--) {
				if ((el.objects[i].interactable || el.objects[i].debug) && _util.fullyInside(mousePosition, el.objects[i])) {
					callback && callback(el.objects[i]);
					return el.objects[i];
				}
			}
			return null;
		}
	};

	/**
	 * The main class
	 * @param container {Canvas} -- the DOM element we will draw in
	 * @param {Object} props -- properties for this elCanvas (all optional):
	 *   images {Map} -- map of names to image data
	 *   width {Number} -- the pixel width of the elCanvas (defaults to width of canvas element)
	 *   height {Number} -- the pixel width of the elCanvas (defaults to height of canvas element)
	 *   AlignToCenter {boolean} -- if true, all objects will be relative to center of canvas, instead of upper-left
	 */
	function elCanvas(container, props) {
		"use strict";
		this.ctx = new chainableContext(container.getContext('2d'));
		this.ctx.canvas = container;
		props = props || {};
		props.images = props.images || {};
		this.width = props.width || container.offsetWidth;
		this.height = props.height || container.offsetHeight;
		this.center = {
			x: this.width / 2,
			y: this.height / 2
		};
		this.images = props.images;
		this.AlignToCenter = props.AlignToCenter || false;

		//reference point for container canvas
		this.container = container;

		var spriteMaps = {};
		var spriteProps = props.spriteMaps || props.spriteFonts;
		if (spriteProps) {
			spriteProps.forEach(function (spriteMap) {
				spriteMaps[spriteMap.meta.image] = spriteMap.frames;
			});
		}
		this.spriteMaps = spriteMaps;

		// container for keeping objects which will loop
		this.objects = [];
		this.firstFrame = true;

		// list of custom shapes you can push a custom shape key into
		this.customShapes = {};

		// utility function container (do I need to make this publically reachable?
		this._util = _util;

		// Bind my update function to myself so I can pass it as a callback
		this.update = this.__update.bind(this);

	}
	elCanvas.prototype = {
		translateScaleRotate(props) {
			if (props.parent.id != "dummyParent") {
				this.translateScaleRotate(props.parent);
			}
			if (props.type == "circle") {
				props.width = props.height = props.radius / 2;
			}
			props.width = props.width || 0;
			props.height = props.height || 0;

			// Get center points (or whatever the transform origin is set to
			var tO = props.transformOrigin.replace(/%/g, "").split(' ');
			props.centerX = props.width * (Number(tO[0]) / 100)
			props.centerY =  props.height * (Number(tO[1]) / 100)

			// Set up new transformation matrix
			var matrix = new Matrix();

			// Translate to center if center is on and this is a top-level object
			if (props.parent.id == 'dummyParent' && this.AlignToCenter) {
				matrix.translate(this.center.x, this.center.y);
			}

			// Get to this object's upper left...
			matrix.translate(props.x, props.y);
			// ... then to the center of the object
			matrix.translate(props.centerX, props.centerY);

			// Now add any other affine transforms
			matrix.skew(props.skewX, props.skewY);
			matrix.rotate(props.rotation * Math.PI / 180);
			matrix.scale(props.scaleX, props.scaleY);

			// Now move back to upper left
			matrix.translate(-props.centerX, -props.centerY);

			// Now apply the matrix to the context
			this.ctx.transform(matrix.data[0], matrix.data[1], matrix.data[2], matrix.data[3], matrix.data[4], matrix.data[5]);
			// (TODO: try passing matrix up the recursion tree and then call setTransform?)
			// this.ctx.setTransform(matrix.data[0], matrix.data[1], matrix.data[2], matrix.data[3], matrix.data[4], matrix.data[5]);
		},
		importImages: function (props) {
			for(k in props){
				_util.loadImageFromUrl(this.images, k, props[k]);
			}
		},
		prepareShape: function (props) {
			_util.setObjectScale(props);
			this.prepFuncs[props.type] && this.prepFuncs[props.type].bind(this)(props);
			this.ctx.save();
			this.ctx.set("globalCompositeOperation", props.globalCompositeOperation);
			this.translateScaleRotate(props);
			return this;
		},
		fillAndStroke: function (props) {
			if (!props.null) {
				this.ctx.fillAndStroke(props.style, props.opacity);
			}
			return this;
		},
		styleShape: function (styles) {
			this.ctx.setAll(styles);
		},
		draw: function (props) {
			this.prepareShape(props);
			this.styleShape(props.style);
			this.renderFuncs[props.type](this, props);
			this.debugObject(props);
			this.ctx.restore();
		},
		debugObject: function (props) {
			if (props.debug) {
				// console.log(this.ctx);
				_util.shapes.circle(this, props.centerX, props.centerY, 10);
				el.ctx.set("globalCompositeOperation", 'difference');
				this.ctx.fill();
			}
		},
		// Shape-specific initialization
		initFuncs: {
			text: function (props) {
				if (props.style['textBaseline'] == 'safari') {
					delete props.style['textBaseline'];
				}
			},
			image: function (props) {
				props.id = props.id || props.url;
				if (!this.images[props.id]) {
					if (props.url) {
						// We need to load this image
						_util.loadImageFromUrl(this.images, props.id, props.url);
					} else if (props.radialGradient) {
						// We build this image by generating a radial gradient
						this.images[props.id] = _util.generateRadialGradientBitmap(props.id, props.radialGradient.size,
							props.radialGradient.inner, props.radialGradient.outer);
					}

				}
			},
			textSprite: function (props) {
				props.width = props.width || this.container.width;
				props.height = props.height || this.container.height;
				props.type = "rect";
				props.map = props.map || props.font;
				props.width /= props.scale;
				props.height /= props.scale;
				var spriteMap = props.map && this.spriteMaps[props.map];
				if (!spriteMap) {
					return;
				}
				var x = 0, y = 0, xend = props.width;
				var missingLetter = props.missing || _util.missingLetterProps(spriteMap);
				var el = this;
				function nextLine() {
					x = 0;
					y += missingLetter.height * props.lineHeight;
				}
				var letters = props.text.split("").map(function (letter) {
					if (letter == "\n") {
						nextLine();
						return null;
					}
					var frame = spriteMap[letter] && spriteMap[letter].frame;
					var letterProps;
					if (frame) {
						letterProps = {
							type: "image",
							id: props.map,
							width: frame.w,
							height: frame.h,
							sprite: {
								width: frame.w,
								height: frame.h,
								x: frame.x,
								y: frame.y
							}
						};
					} else {
						if (props.skipMissing) {
							return null;
						}
						letterProps = Object.assign({}, missingLetter);
					}
					if (x + letterProps.width > xend) {
						nextLine();
					}
					letterProps.x = x;
					letterProps.y = y;
					letterProps.zIndex = 1;
					letterProps.parent = props;
					x += (letterProps.width + props.letterSpacing);
					return el.addObject(letterProps);
				}).filter(function (exists) {
					return !!exists;
				});
				_util.adjustAlignment(letters, xend, props.align);
				props.letters = letters;
			}
		},
		// Shape-specific functions to call when preparing to draw
		prepFuncs: {
			line: function (props) {
				props.x = props.x1;
				props.y = props.y1;
			},
			quadLine: function (props) {
				props.x = props.x1;
				props.y = props.y1;
			},
			image: function (props) {

				// if there is an image in the array use it, otherwise use the fallback
				var image = this.images[props.id] || getFallbackImage();

				// if this image is not loaded yet, then abort prep
				if (!(image instanceof Image)) {
					console.log("This image is not ready or not an image", image);
					return;
				}
				// if there are no predefined width/height use the image ones
				props.width = props.width || image.width;
				props.height = props.height || image.height;

				// If this is a sprite, use the sprite props for width and height
				if (props.sprite) {
					props.width = props.sprite.width;
					props.height = props.sprite.height;
				}
			}
		},
		// Shape-specific drawing functions
		renderFuncs: {
			rect: function (el, props) {
				if (props.radius) {
					_util.shapes.roundRect(el, 0, 0, props.width, props.height, props.radius);
				} else {
					_util.shapes.normalRect(el, 0, 0, props.width, props.height);
				}
				return el.fillAndStroke(props);
			},
			circle: function (el, props) {
				_util.shapes.circle(el, 0, 0, props.radius);
				return el.fillAndStroke(props);
			},
			line: function (el, props) {
				el.ctx.beginPath()
					.moveTo(0, 0)
					.lineTo(props.x2 - props.x1, props.y2 - props.y1);
				return el.fillAndStroke(props);
			},
			quadLine: function (el, props) {
				el.ctx.beginPath()
					.moveTo(0, 0)
					.quadraticCurveTo(props.qx, props.qy, props.x2 - props.x1, props.y2 - props.y1);
				return el.fillAndStroke(props);
			},
			image: function (el, props) {
				var image = el.images[props.id] || getFallbackImage();

				// if this image is not loaded yet, then don't try to draw it
				if (!(image instanceof Image)) {
					return;
				}
				el.ctx.fillAndStroke('empty', props.opacity);

				if (props.sprite) {
					// sprite image, copy only a part of the full image
					el.ctx.drawImage(image,  props.sprite.x,  props.sprite.y, props.sprite.width, props.sprite.height,
						0, 0, props.width, props.height);
				} else {
					// normal image option
					if (props.rounded) {
						// rounded image addition
						_util.shapes.roundRect(el, 0, 0, props.width, props.height, props.rounded);
						el.ctx.clip();
					}

					el.ctx.drawImage(image, 0, 0, props.width, props.height);
				}
				el.ctx.fillAndStroke(props.style, 'empty');
			},
			text: function (el, props) {
				el.ctx.fillAndStroke('empty', props.opacity);
				var maxWidth = undefined;

				if (props.maxWidth) {
					// there is a limiter for text width, so scale down text to fit it
					maxWidth = props.maxWidth;
					var textWidth = el.ctx.measureText(props.text).width;
					if (props.maxWidth < textWidth) {
						var yScale = props.maxWidth / textWidth;
						el.ctx.scale(1, yScale);
					}
				}
				if (props.style.strokeStyle) {
					el.ctx.strokeText(props.text, 0, 0, maxWidth);
				}
				el.ctx.fillText(props.text, 0, 0, maxWidth);
			},
			shape: function (el, props) {
				var func = (typeof props.customShape == "function") ? props.customShape : el.customShapes[props.customShape];
				func(el);
				el.fillAndStroke(props);
			},
			svg: function (el, props) {
				if (props.__cachedPoints !== props.points) {
					//rebuild points only if the supplied are new points
					props.__cachedFunction = _util.parseSvgPathData(props, el.ctx);
					// now assign the old points to be the new points so we dont need to repeat this function
					props.__cachedPoints = props.points;
				}

				props.__cachedFunction();
				el.fillAndStroke(props);
			}
		},
		/**
		 * add an object to my list of things to draw
		 * This is the method that gets called by all the methods like rect, circle, etc.
		 */
		addObject: function (props, objectType) {
			objectType = objectType || (props && props.type);
			props = _util.mergeDefaultProperties(props, objectType);
			this.initFuncs[props.type] && this.initFuncs[props.type].bind(this)(props);
			this.objects.push(props);
			return props;
		},
		/**
		 * draw all my objects.  the "update" function on an instance is a bound version of this
		 * so it can be passed as a callback without losing context.
		 */
		__update: function () {
			if (this.firstFrame) {
				_util.addParents(this.objects);
				this.sortByZIndex();
			}
			this.ctx.clearRect(0, 0, 9999, 9999);
			/*
			 * For loops with a fixed limit is the fastest method for looping
			 * based off all research I've found and for the amount of data to go trough
			 * this should be the most optimal way
			 */
			var objectsCount = this.objects.length;
			for (var i = 0; i < objectsCount; i++) {
				this.draw(this.objects[i]);
			}
			this.firstFrame = false;
		},
		/**
		 * sort all my objects so higher z-index come later
		 */
		sortByZIndex: function () {
			this.objects.sort(function (a, b) {
				return a.zIndex - b.zIndex;
			});
		},
		/**
		 * remove an object, or array of objects, from my list.
		 * Will also remove any children of that object, so no orphans
		 */
		remove: function (objOrArray) {
			if (Array.isArray(objOrArray)) {
				objOrArray.forEach(this.remove.bind(this));
				return;
			}
			var obj = objOrArray;
			// remove children
			if (obj.childNodes) {
				this.remove(obj.childNodes);
				obj.childNodes = null;
			}
			var idx = this.objects.indexOf(obj);
			if (idx > -1) {
				// then parent
				this.objects.splice(idx, 1);
			}
		},
		addEventListener: function (event, callback) {
			var target = this.container;
			var el = this;
			target.addEventListener(event, function (e) {
				var  style = target.currentStyle || window.getComputedStyle(target, null),
					borderLeftWidth = parseInt(style['borderLeftWidth'], 10),
					borderTopWidth = parseInt(style['borderTopWidth'], 10),
					rect = target.getBoundingClientRect(),
					scaleX = rect.width / el.width, scaleY = rect.height / el.height,
					offsetX = (e.clientX - borderLeftWidth - rect.left) / scaleX,
					offsetY = (e.clientY - borderTopWidth - rect.top) / scaleY;
				e.canvasX = offsetX, e.canvasY = offsetY;
				// the benefit of canvasX, canvasY is they're accurate to position with taking account canvas scaling
				callback(e);
			});
		},
		addResizeListener: function (callback) {
			var el = this;
			var resizeListen = _util.debounce(callback);
			window.addEventListener('resize', function () {
				// update canvas sizing
				el.container.width =  el.container.parentNode.offsetWidth;
				el.container.height = el.container.parentNode.offsetHeight;
				el.width = el.container.width
				el.height = el.container.height
				resizeListen('debounced');
			}, false);
		},
		/**
		 * @return a Promise that resolves when all pending images have loaded
		 */
		ready: function () {
			return Promise.all(Object.values(this.images).filter(function (image) {
				return image instanceof Promise;
			}));
		}
	};

	// Add functions for all object types
	objectTypes.forEach(function (objectType) {
		elCanvas.prototype[objectType] = function (suppliedProps) {
			return this.addObject(suppliedProps, objectType);
		}
	});

	return elCanvas;
}());
