// SEMI WORKING ALPHA , Made by Lucky Dee designwaffle@gmail.com

// MAIN
function elCanvas(container, props) {

	// "use strict";

	var el = this;

	// ctx command chainer
	this._chain_ctx = function(obj) {

		var _this = this;
		this.passthrough = [
		 "createImageData", "createLinearGradient", "createPattern", "createRadialGradient", "getImageData", "getLineDash", "isPointInPath", "isPointInStroke", "measureText"
		]
		this.obj = obj;
		var _loop = function(method) {
			if (typeof obj[method] === 'function') {
				_this[method] = function() {
					_this.obj[method].apply(_this.obj, arguments);
					if (_this.passthrough.indexOf(method) > -1) {
						return _this.obj[method].apply(_this.obj, arguments);
					} else {
						return _this;
					}
				};
			}
		};
		for (var method in obj) {
			_loop(method);
		}
		_this.set = function(prop, val) {
			this.obj[prop] = val;
			return this;
		};

	}

	// if no props have been supplied create an empty container for future props instead
	if(!props){props={images:{}}}
	// supply an empty image object in case none is specified
	if(!props.images){props.images={}}

	// allows chaining
	this.ctx = new this._chain_ctx(container.getContext('2d'))
	this.ctx.canvas = container;

	// setup custom canvas properties
	this.width = props.width ? props.width : container.offsetWidth;
	this.height = props.height ? props.height : container.offsetHeight;

	this.center = {
		x: this.width / 2,
		y: this.height / 2
	}

	this.images = props ? props.images : {};
	// if you want to start animating from the center turn this on
	this.AlignToCenter = props ? props.AlignToCenter : false;
 	//refference point for container canvas
	this.container=container;

	// container for keeping objects which will loop
	this.objects = [];
	this.objectsCount = 0;
	this.interactableObjects = [];
	this.interactableObjectCount = 0;
	this.firstFrame = true;

	// list of custom shapes you can push a custom shape key into
	this.customShapes = {};

	// utility function container
	this._util = {};


	// declaration of all objects on stage, must add to this array to create future ones
	this.objectTypes = ['rect', 'circle', 'line', 'quadLine','image', 'shape', 'text','svg' ];


	// fall back styling for when no shape_styles are made
	this.defaultStyles = {
		fallback: {

			lineWidth: 0.001,
			fillStyle: '#' + Math.floor(Math.random() * 16777215).toString(16),
			strokeStyle: "#ffffff"
		},
		rect: {
			fillStyle: '#' + Math.floor(Math.random() * 16777215).toString(16),
		},
		svg: {
			fillStyle: '#' + Math.floor(Math.random() * 16777215).toString(16),
		},
		text: {
			fillStyle: '#' + Math.floor(Math.random() * 16777215).toString(16),
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
			src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA+CAMAAABeI7j4AAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDIYgjAAAAL3RSTlMA+/kEUo+SouQeRw3FBvLhpjOfl3EWq3NMJNzCjIRa0bpOQy8rCep+ZmM5LtLMs4FqBYIAAAHLSURBVEjH5dTbcoIwEIDh3YRa1FKqFOr5rLXadt//7bqs6KqDSfS2/zgchG8Ckyg80LrpLQew56QVx2nsiq++X5qIAqqMEvRkTkYJf8zNiEiNEl9qlMTDl/qGP+bCKMmgXR+sYsKD+SiNkhHcKk/5uholDbC1JdCXUdScyBPUZ6EpRI2f6ChqgkZRsw0hKRmU2CAVIQ/2Suc9+wiXj966ZdkMCYOItjBk7iIWWveSxEWsBc2GjFIDfARWHb0tX4hzEJmHQdzhnRwnBX2JcRFYfRMNxCSQvBEZNm6ynJIxYipBZusmybD8WowI5GPcgXUQmLweTLoHEXwpa3veZS4GaToTIVesm0CvMufCSawY5O+QVNwgauab6neowrtgouODdcvZCSFJRhLSdAngJ/YwH9W7pB3vg6kgUuMZZX0URjal8ZC2CL40jja8E+MmtiBkIedRtXbivXuNjfismkFZB3zy0ncT+NQZPKy3Ye5eY1bMiA+Oa2eWB6yxcUN2spkUzZA1JhvNv8b0Ls1Pwv/66vsPBB8hDbCJdbWG3hUZg7fd1bv8tiJPi/EVwYDkRiXBKUFzFpq65FmOxGBwQiZ0VwWTZda4o2wCj/QHW46eA37RLLEAAAAASUVORK5CYII=",
			object: {}
		}
	}
	// fallback properties for when drawing shapes
	this.defaultProps = {
		fallback: {
			globalCompositeOperation: "source-over",
			transformOrigin: "50% 50%",
			x: 0,
			y: 0,
			skewX:0,
			skewY:0,
			xOffset: el.AlignToCenter ? el.center.x : 0,
			yOffset: el.AlignToCenter ? el.center.y : 0,
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
			__cachedPoints:"",
			__cachedFunction:function(){},
			width: 100,
			height: 100,
			points:"93.8,11.7 82.1,0 46.9,35.2 11.7,0 0,11.7 35.2,46.9 0,82.1 11.7,93.8 46.9,58.6 82.1,93.8 93.8,82.1 58.6,46.9"
		},
		image: {
			rounded: false
		},
		text:{
			width:0,
			height:0
		},
			textSprite:{
			letterSpacing:0,
			lineHeight:1, size:1,
			x:0,y:0,
			width:container.width,
			height:container.height,
				rounded: false,
				align:'left'
		}
	};
	// 0 -  self execututing on init function, this will create all of the dynamic functions to create shapes
	this.constructor = function() {
		// -- DRAW SHAPE BASED OFF PROPS --
		el.objectTypes.forEach(function(item) {

			// if theres no default props for me yet, make an empty object for them
			el.defaultProps[item] = el.defaultProps[item] ? el.defaultProps[item] : el.defaultProps.fallback;

			// same with styling
			el.defaultStyles[item] = el.defaultStyles[item] ? el.defaultStyles[item] : el.defaultStyles.fallback;


			el[item] = function(suppliedProps, arrayPosition) {

				/*now using object assign so each item is individual,
				even if they both use the same  object passed. Reduces code when animating*/
				if(!suppliedProps){
					suppliedProps={}
				}
				suppliedProps.style = Object.assign({}, suppliedProps.style);
				props = el._util.init_check_props_push( Object.assign({}, suppliedProps), item);

					return props;

			}
		});

	}();
	// 1 - apply styling to item
	this.styleShape = function(shape_styles, type) {
		Object.keys(shape_styles).forEach(function(key) {
			el.ctx.set(key, shape_styles[key])
		});
	};
	// loop trough all the parent levels and translate based of that
	this.recursiveLoop_checkForParent = function(props) {
		var parentExists = props.parent.id != 'dummyParent';
		if (parentExists) {
			el.recursiveLoop_checkForParent(props.parent);
			el.translateScaleRotate(props.parent);
		}
	};

	// apply this to this, all the parents first! , the context translation doesn't need to be reset yet
	this.translateScaleRotate = function(props,parentLevel) {
		//circle variation
		if(props.type=="circle"){
			props.width=props.height = props.radius/2;
		}
		if(!props.width){
			props.width=0;
		}
		if(!props.height){
			props.height=0;
		}

		// get center points
			var tO = props.transformOrigin.replace(/%/g, "").split(' ');
			props.centerX = props.width * (Number(tO[0]) / 100)
			props.centerY =  props.height * (Number(tO[1]) / 100)
			if(!props.width && !props.height){
				props.width = props.height = 0;
			}

			// setup a new translation matrix
			var matrix= new el._util.matrix(0,0);
			//the below is all still in code, doesnt get applied to canvas context yet



			/*
			Translate the element to the center if the center is on.
			Only translate level 0 objects to the center position, which
			which prevents from doubling up offsets for the center position
			*/
			if(props.parent.id==='dummyParent' ){
				matrix.translate(el.defaultProps.fallback.xOffset,el.defaultProps.fallback.yOffset);
			}

			matrix.translate(props.x,props.y);
			//translate to the object's center point
			matrix.translate(props.centerX,props.centerY);
			matrix.skew(props.skewX,props.skewY);
			matrix.rotate(props.rotation * Math.PI / 180);
			matrix.scale(props.scaleX, props.scaleY);
			matrix.translate(-props.centerX,-props.centerY);
			// matrix.translate(-el.defaultProps.fallback.xOffset,-el.defaultProps.fallback.yOffset);


			//got all the data now apply to context!


			el.ctx.transform(matrix.data[0],matrix.data[1],matrix.data[2],matrix.data[3],matrix.data[4],matrix.data[5]);

	};
	// 2 - Draw item
	this.drawShape = function(props) {

		// save current context
		el.ctx.save();

		el.ctx.set("globalCompositeOperation", props.globalCompositeOperation)
		// loop trough parents and apply their transformations first, this is for parenting
		el.recursiveLoop_checkForParent(props);
		el.translateScaleRotate(props);


	};
	// 3 - fill/stroke item
	this.fillAndStroke = function(style, opacity) {
		el.ctx.set("globalAlpha", opacity);
		if (style.fillStyle) {
			el.ctx.fill();
		}
		if (style.strokeStyle) {
			el.ctx.stroke();
		}
	};
	// SHAPE functions
	this.shapes = {
		rect: function(p) {

				el.drawShape(p);


			if (p.radius) {
				el._util.shapes.roundRect(0, 0, p.width, p.height, p.radius)
			} else {
				el._util.shapes.normalRect(0, 0, p.width, p.height)
			};
			// if its a null label dont bother rendering it, this is for controler objects
			if(!p.null){
					el.fillAndStroke(p.style, p.opacity);
			}

		},
		circle: function(p) {

			el.drawShape(p);

			el._util.shapes.circle(0, 0, p.radius);
			el.fillAndStroke(p.style, p.opacity);

		},
		line: function(p) {
			p.x = p.x1;
			p.y = p.y1;

			el.drawShape(p);
			// translate back
			el.ctx.beginPath()
				.moveTo(0, 0)
				.lineTo(p.x2 - p.x1, p.y2 - p.y1);
			el.fillAndStroke(p.style, p.opacity);

		},
		quadLine: function(p) {

				p.x = p.x1;
				p.y = p.y1;
			el.drawShape(p);
			// translate back
			el.ctx.beginPath()
				.moveTo(0, 0)
				.quadraticCurveTo( p.qx,p.qy,p.x2 - p.x1,p.y2 - p.y1);
			el.fillAndStroke(p.style, p.opacity);

		},
		image: function(p) {
			// if there is an image in the array use it, otherwise use the fallback
			var image = el.images[p.id] || el.defaultStyles.image.object;
			// if there are no predefined width/height use the image ones
			p.width = p.width ? p.width : image.width;
			p.height = p.height ? p.height : image.height;
				if(p.textProps){
					p.width=p.textProps.w;
					p.height=p.textProps.h;
				}
			el.drawShape(p);
			el.fillAndStroke('empty', p.opacity);

			if(p.textProps){
				// textSprite option
				// console.log(p.textProps.size);
					el.ctx.drawImage(image,  p.textProps.x,  p.textProps.y, p.textProps.w, p.textProps.h,0,0, p.textProps.w*p.textProps.scale, p.textProps.h *p.textProps.scale)
					// console.log(p.textProps.letterSpacing);
			}else{
				// normal image option
				// rounded image addition
				if (p.rounded) {
					el._util.shapes.roundRect(0, 0, p.width, p.height, p.rounded)
					el.ctx.clip();
				}
					el.ctx.drawImage(image, 0, 0, p.width, p.height)
			}

			el.fillAndStroke(p.style, 'empty');

		},

		text: function(p) {

			el.drawShape(p);

			// its here on purpose to be before every other command since filltext behaves difernetly
			el.fillAndStroke('empty', p.opacity);

			// if theres a limiter for text width scale down text to fit it
			if (p.maxWidth) {
				var textWidth = el.ctx.measureText(p.text).width;
				if (p.maxWidth < textWidth) {
					var yScale = p.maxWidth / textWidth;
					el.ctx.scale(1, yScale);
				}
				if (p.style.strokeStyle) {
					el.ctx.strokeText(p.text, 0, 0, p.maxWidth);
				}
				el.ctx.fillText(p.text, 0, 0, p.maxWidth)
			} else {
				if (p.style.strokeStyle) {
					el.ctx.strokeText(p.text, 0, 0);
				}
				el.ctx.fillText(p.text, 0, 0)
			}
		},

		shape: function(p) {
			el.drawShape(p)
			/* it can either take the function directly
			or if it's a string it can check if it matches to
			any of the pre built shapes id and fire it
			*/
			if (typeof p.customShape === "function") {
				p.customShape(this);
			}else if(el.customShapes[p.customShape]){
				el.customShapes[p.customShape]();
			}
			el.fillAndStroke(p.style, p.opacity);
		},
		svg: function(p) {
			el.drawShape(p)
			/*
				cache system so unless we're morphing something it repeats the last function to
				convert the svg points to canvas points
			*/
			if(p.__cachedPoints!==p.points){
				//rebuild points only if the supplied are new points
				p.__cachedFunction = el._util.parseSvgPathData(p,p.points,el.ctx);
				// now assign the old points to be the new points so we dont need to repeat this function
				p.__cachedPoints=p.points
			}

			p.__cachedFunction()
			//__cachedFunction
			// el.ctx.fill()
			el.fillAndStroke(p.style, p.opacity);
		}
	};

	// SPRITE FONTS FUNCTIONALITY v
	this.spriteFonts=props.spriteFonts? props.spriteFonts:[]

	//utility function to make custom spritefonts
	var spriteFonts_rearanged = [];
	for(var i=0;i<	this.spriteFonts.length;i++){
		var font = 	this.spriteFonts[i]
		var newFont = this.spriteFonts[i].meta.image;
		var newFontDictionary = this.spriteFonts[i].frames
		spriteFonts_rearanged[newFont] = newFontDictionary;
	}
	this.spriteFonts=spriteFonts_rearanged;

	// special case function, this one will get made once, this builds on the image function
	this.textSprite= function(props){
		// utility
		this.breakLine = function(){
			positionData.x=0;
			positionData.y+=(dynamicInfo.h*props.lineHeight)*props.scale;

		}
		// warn if theres no dictionary map associated first
		if(!el.spriteFonts[props.font]){
			console.error('please run el.addSpriteFont(fontID, dictionary for for font) before using a sprite font')
		}

		var splitSentence = props.text.split('')
		//parent container
		var spriteContainer = new el.rect({x:props.x,y:props.y,null:true})
		// reset create position reference so the xy is based off container
		var positionData = {x:0,y:0,scale:props.scale}

		// fall back to default props if undefined
		for(var key in el.defaultProps.textSprite){
			if(!props[key]){
				props[key] = el.defaultProps.textSprite[key]
			}
		}
		var individualSprites=[];
		for(var y=0;y<splitSentence.length;y++){
					// console.log(props.scale);
				// get letter
			var letter = splitSentence[y];
			//fake newline breaker, wil llook at other way to do this later

			if( letter=="^"){
			this.breakLine();
			}
			//dictionary,  get data from letter
			var dictionaryData = el.spriteFonts[props.font][letter]
			if(dictionaryData){;
				// because we'll be scaling items on draw i'm passing the scale there too

				// gotta make a new object out of the base so that manipulation doesn't affect other objects
				 var dynamicInfo = Object.assign({}, 	dictionaryData.frame);

		 		dictionaryData.frael.letter =letter;
		 		dynamicInfo.scale = props.scale;
				// check if its getting too long, if so make it go to a new line
				// console.log(newline);
				if(positionData.x>(props.x+props.width)){
						this.breakLine();
				 }


				// using the already existing image funciton make an series of images we can also access as individiual elements
					individualSprites[y] = new el.image({ parent:spriteContainer,x:positionData.x,y:positionData.y,id:props.font, textProps:dynamicInfo})

					//increase the x based off the width of the current letter AFTER its drawn it

					positionData.x+=(dynamicInfo.w+props.letterSpacing)*props.scale;

			}
		}
		spriteContainer.letters = individualSprites

		return spriteContainer;
	}
	// SPRITE FONTS END HERE ^

	// UPDATE loop function
	this.update = function() {
		// rearange zindex on first loop
		if (el.firstFrame) {

			el._util.addParents(el.objects);
			el.objects.sort(function(a, b) {
				return (b.zIndex - a.zIndex) * -1;
			});

		}
		// clear stage
		el.ctx.clearRect(0, 0, 9999, 9999);
		// loop through objects and draw them, objects have been defined  and pushed to array in the _util.init_check_props_push functiton
		for (var update_i = 0; update_i < el.objectsCount; update_i++) {


			var activeObject = el.objects[update_i];

			// scale object
			el._util.setObjectScale(activeObject);
			// style object
			el.styleShape(el.objects[update_i].style, el.objects[update_i].type);
			// draw object
			el.shapes[activeObject.type](activeObject);

			//DEBUGGER, show center positions if debug is on
			if(activeObject.debug){
				el._util.shapes.circle(activeObject.centerX,activeObject.centerY,10)
				el.ctx.set("globalCompositeOperation", 'difference')
				// el.ctx.globalCompositeOperation = "difference"

				el.ctx.fill();

			}
			//restore to what the canvas was, most object functions contain a .save so this resets them
			el.ctx.restore();
		}

		el.firstFrame = false;
	};
	// resorts objects in the Update loop
	this.resetZIndex = function(){
		el.objects.sort(function(a, b) {
			return (b.zIndex - a.zIndex) * -1;
		});
	}
	// REMOVE function, removes object and cleans the stage up for future loops from object
	this.remove = function(obj){
		var objectIndex = this.objects.indexOf(obj);
		if(obj instanceof Array){
			for(var i=0;i<obj.length;i++){
				this.remove(obj[i])
			}
		}else if(objectIndex<0){
			console.warn("EL: Object you're trying to remove is not in elCanvas");
		} else{
			// remove children
			if(obj.childNodes){
				for(var i=0;i<obj.childNodes.length;i++){
					var childObject = obj.childNodes[i]
					var childIndex = this.objects.indexOf(childObject);
					this.objects.splice(childIndex, 1);
					this.objectsCount--;
				}
			}
			// then parent
			this.objects.splice(objectIndex, 1);
			this.objectsCount--;
		}
	}
	// utlitiy funcitons
	// on creating an object e.g. el.rect it this will check its propertiers innitially and it to the objects array
	this._util = {
			matrix:function(){

			this.data = [1,0,0,1,0,0]
				this.translate = function(x,y){

						this.data[4] += this.data[0] * x + this.data[2] * y;
						this.data[5] += this.data[1] * x + this.data[3] * y;
				}
				this.scale = function(x,y){
						this.data[0] *= x;
						this.data[1] *= x;
						this.data[2] *= y;
						this.data[3] *= y;
				}
				this.rotate = function(radians){
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
				}
				this.skew = function(degX,degY){
					var tanX=Math.tan(degX* Math.PI / 180);
					var tanY=Math.tan(degY* Math.PI / 180);
					var matrix0=this.data[0];
					var matrix1=this.data[1]
					this.data[0] += tanY*this.data[2];
					this.data[1] += tanY*this.data[3];
					this.data[2] += tanX*matrix0;
					this.data[3] += tanX*matrix1
				}
				return this;
		}
		,
		shapes: {
			circle: function(x, y, r) {
				return el.ctx.beginPath().arc(x, y, r, 0, 2 * Math.PI, false).closePath();
			},
			normalRect: function(x, y, w, h) {
				return el.ctx.beginPath().rect(x, y, w, h).closePath();
			},
			roundRect: function(x, y, w, h, r) {
        var cornerRadius={ tl: r, tr: r, bl: r, br: r };
        if(typeof r=='object'){
          cornerRadius=r;
        }
        return el.ctx.beginPath()
              .moveTo(x + cornerRadius.tl, y)
              .lineTo(x + w - cornerRadius.tr, y)
              .quadraticCurveTo(x + w, y, x + w, y + cornerRadius.tr)
              .lineTo(x + w, y + h - cornerRadius.br)
              .quadraticCurveTo(x + w, y + h, x + w - cornerRadius.br, y + h)
              .lineTo(x + cornerRadius.bl, y + h)
              .quadraticCurveTo(x, y + h, x, y + h - cornerRadius.bl)
              .lineTo(x, y + cornerRadius.tl)
              .quadraticCurveTo(x, y, x + cornerRadius.tl, y)
              .closePath();
			}
		},
		init_check_props_push: function(props, type, count) {
			// check if any custom values are written, if not use the default props
			if (!props) {
				props = {}
			}
			if (!props.style) {
				props.style = {}
			}
			props.type = type;
			// check for missing props, swap with default props
			el._util.replaceIfDoesntExist(props, el.defaultProps.fallback);
			// check for missing props unique to this object type
			el._util.replaceIfDoesntExist(props, el.defaultProps[type]);
			el._util.replaceIfDoesntExist(props.style, el.defaultStyles[type]);

			// SAFARI FIX
			if (type == 'text') {
				if (props.style['textBaseline'] == 'safari') {
					delete props.style['textBaseline'];
				}
			};

			if (type == 'image'  ) {

				if (!el.images[props.id]) {
					// if there is a missing image create a backup image
					var img = new Image();
					img.src = el.defaultStyles.image.src;
					img.id = 'backup';
					el.defaultStyles.image.object = img;
				}
			};
			el.objects.push(props);
			// interactable objects have their seperate list as well as the original
			if(props.interactable || props.debug){
				el.interactableObjects.push(props)
			}
			el.interactableObjectCount=el.interactableObjects.length

			el.objectsCount = el.objects.length;

			return props;
		},
		replaceIfDoesntExist: function(providedObject, newObject) {
			Object.keys(newObject).forEach(function(key, value) {
				if (!providedObject[key] && providedObject[key] !== 0) {
					providedObject[key] = newObject[key];
				}
			})
		},
		setObjectScale: function(props) {
			if (props.scale != 1) {
				props.scaleX = props.scale;
				props.scaleY = props.scale;
			}
		},
		shuffleArray: function(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		},
		addParents: function(objects) {
			// go through every object searching for objects that have parents
			for (var i = 0; i < objects.length; i++) {

				//if there isnt a childnodes object add one
				if (objects[i].parent.id != "dummyParent") {
					// the children inherit its parent's z
					objects[i].zIndex += objects[i].parent.zIndex;
					if (!objects[i].parent.childNodes) {
						objects[i].parent.childNodes = []
					}
					//  push all new kids into its object
					objects[i].parent.childNodes.push(objects[i]);
				}
			}
		},
		/*  Generate an Image for a radial gradient, with the given inner and outer colour stops.
             Useful to generate quick sprite images of blurred spheres for explosions, particles etc.
       */
		generateRadialGradientBitmap: function(id, size, innerColour, outerColour) {
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
			el.images[id] = img;
		},
		hitTestMath:function(rect1,rect2){
			return rect1.x < rect2.x + rect2.width &&
			   rect1.x + rect1.width > rect2.x &&
			   rect1.y < rect2.y + rect2.height &&
			   rect1.y + rect1.height > rect2.y? true : false;
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
		/*Thank you Stefan Goessner
		https://github.com/goessner/parseSvgPathData for the amazing parser for IE!
		I had to modify this so i can have a cached system*/
		parseSvgPathData:function(object,data,ctx) {
			var positions={x:[],y:[]}
			var calls = [];
		  var ifc = {
		      init : function() {
		          this.x=this.x0=this.x1=this.x2=this.y=this.y0=this.y1=this.y2 = 0;
								calls.push([el.ctx.beginPath, []])
		      },
		      A : function(rx,ry,rot,fA,fS,x,y) {
		          var x12 = x-this.x, y12 = y-this.y,
		              phi = rot/180*Math.PI,
		              cp = phi ? Math.cos(phi) : 1, sp = phi ? Math.sin(phi) : 0,
		              k = ry/rx,
		              dth_sgn = fS ? 1 : -1,
		              Nx = dth_sgn*(-x12*cp - y12*sp), Ny = dth_sgn*(-x12*sp + y12*cp),
		              NN = Math.hypot(Nx, Ny/k),
		              R = 2*rx > NN ? rx : NN/2, // scale R to a valid value...
		              dth = 2*dth_sgn*Math.asin(NN/2/R),
		              th1, ct, st;

		          if (fA)
		              dth = dth > 0 ? 2*Math.PI - dth : -2*Math.PI - dth;
		          th1 = Math.atan2(k*Nx,Ny) - dth/2,
		          ct = Math.cos(th1); st = Math.sin(th1);
							calls.push([el.ctx.ellipse, [this.x - R*(cp*ct - sp*k*st),
							this.y - R*(sp*ct + cp*k*st),
							R, R*k, phi, th1, th1 + dth, dth_sgn === -1]]);
		          this.x = x; this.y = y;
							positions.x.push(x);
							positions.y.push(y);
		      },
		      M : function(x,y) {
						positions.x.push(x);
						positions.y.push(y);
						calls.push([el.ctx.moveTo, [this.x=this.x0=x, this.y=this.y0=y]]);
					},
		      L : function(x,y) {
						positions.x.push(x);
						positions.y.push(y);
						calls.push([el.ctx.lineTo, [this.x=x, this.y=y]]);
					},
		      H : function(x)   {
						positions.x.push(x);
						calls.push([el.ctx.lineTo, [this.x=x, this.y ]]);
					},
		      V : function(y)   {
						positions.y.push(y);
						calls.push([el.ctx.lineTo, [this.x,   this.y=y]]);
					},
		      C : function(x1,y1,x2,y2,x,y) {
						positions.x.push(x);
						positions.y.push(y);
						calls.push([el.ctx.bezierCurveTo, [this.x1=x1,this.y1=y1,this.x2=x2,this.y2=y2,this.x=x,this.y=y]]);
		      },
		      S : function(x2,y2,x,y) {
						positions.x.push(x);
						positions.y.push(y);
						calls.push([el.ctx.bezierCurveTo, [this.x1=2*this.x-this.x2,this.y1=2*this.y-this.y2,
																	 this.x2=x2,this.y2=y2,this.x=x,this.y=y]]);
		      },
		      Q : function(x1,y1,x,y) {
						positions.x.push(x);
						positions.y.push(y);
						calls.push([el.ctx.quadraticCurveTo, [this.x1=x1,this.y1=y1,this.x=x,this.y=y]]);
		      },
		      T : function(x,y) {
						positions.x.push(x);
						positions.y.push(y);
							calls.quadraticCurveTo([el.ctx.quadraticCurveTo, [this.x1+=2*(this.x-this.x1),this.y1+=2*(this.y-this.y1),
		                                    this.x=x,this.y=y]]);
		      },
		      Z : function() {
							calls.push([el.ctx.closePath, []])
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
		      x0:0,y0:0, x:0,y:0, x1:0,y1:0, x2:0,y2:0,
		      // el.ctx:false
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
		    var segment = function(ifc,type,args)  {
		        if (type in seg) {

								if (args.length === seg[type].n) {
								 var _ifc;

								 (_ifc = ifc)[type].apply(_ifc, args);
								} else if (args.length > seg[type].n) {
								 var _ifc2;

								 (_ifc2 = ifc)[type].apply(_ifc2, args);

								 args.splice(0, seg[type].n);
								 segment(ifc, seg[type].f, args);
								}
		        }
		    };
		    var match;

		    if (!ifc) ifc = parseSvgPathData.defaultIfc;
		    ifc.init(el.ctx);
		    // for each explicit named segment ...
		    while (match = rex.exec(data)) {
		        segment(ifc, match[1], match[2].replace(/^\s+|\s+$/g,'')  // trim whitespace at both ends (str.trim .. !)
		                                       .replace(/(\d)\-/g,'$1 -') // insert blank between digit and '-'
		                                       .split(/[, \t\n\r]+/g)     // as array
		                                       .map(Number))
				}
				var drawSVGShape = function(){
					var minX=Math.min.apply(null,positions.x),
							maxX = Math.max.apply(null,positions.x),
							minY= Math.min.apply(null,positions.y),
							maxY = Math.max.apply(null,positions.y);

						object.width = (minX+(maxX-minX)/2)*2;
						object.height = (minY+(maxY-minY)/2)*2;

					calls.forEach(function (a) { a[0].apply(el.ctx, a[1]); });
				}
			 return drawSVGShape;
		}

	};


	//INTERACTIVITY
	// experimentation with click events
	this.addEventListener=function(event,response){
		var target = this.container;

		this.container.addEventListener(event,function(e){
		// crossbrowser get xy with taking possible scale into account
		e = e || window.event;
		 var  style = target.currentStyle || window.getComputedStyle(target, null),
				 borderLeftWidth = parseInt(style['borderLeftWidth'], 10),
				 borderTopWidth = parseInt(style['borderTopWidth'], 10),
				 rect = target.getBoundingClientRect(),
				 scaleX = rect.width/el.width,scaleY = rect.height/el.height,
				 offsetX = (e.clientX - borderLeftWidth - rect.left)/scaleX,
				 offsetY = (e.clientY - borderTopWidth - rect.top)/scaleY;

			 e.canvasX = offsetX, e.canvasY = offsetY;
			 // the benefit of canvasX, canvasY is they're accurate to position with taking account canvas scaling
			 response(e);

		})
	};
	this.hitTest=function(mousePosition,returnFunction){

		// for(var i=0;i<el.objectsCount;i++){
		for(var i=0;i<el.interactableObjectCount;i++){
			var obj = el.interactableObjects[i];
			var hit = el._util.hitTestMath(mousePosition,obj)
			if(hit){
				returnFunction(obj);
				break;
			}

		}
	}
	this.addResizeListener = function(callback){
		//add a debounce level for the listener
		var resizeListen = this._util.debounce(callback);

		window.addEventListener('resize', function () {
			// update canvas sizing
			el.container.width =  el.container.parentNode.offsetWidth;
			el.container.height = el.container.parentNode.offsetHeight
			el.width = el.container.width
			el.height =el.container.height
			resizeListen('debounced');
		}, false);
		};
	}

//utility solely for testing, will never be called in the game but will be used in testing
function el_imageLoad(imageURL, completeFunction) {
	if (imageURL.length == 0) {
		// ('no images');
		completeFunction([]);
	}
	var imagesLoaded = 0;
	var imageOBJ = {};
	[].forEach.call(imageURL, function(imageURL, index) {
		var img = new Image();
		img.src = imageURL.url;
		img.id = imageURL.id;
		img.addEventListener('load', imageLoad_check, false);
	});

	function imageLoad_check() {
		imageOBJ[this.id] = this;
		imagesLoaded++;
		if (imagesLoaded == imageURL.length) {
			completeFunction(imageOBJ);
			return imageOBJ;
		}
	}
}
