

elCanvas.prototype.debug = function(el){
	var dragObject;
	var dragOffset={};

	//enable polyfill for cross browser
	TouchEmulator()

	function getX(e){return e.touches[0].clientX - el.container.offsetLeft;};
	function getY(e){return e.touches[0].clientY - el.container.offsetTop;};

	function startDrag(e) {

		 var hitTestArea = {x:getX(e),y:getY(e),width:50	,height:50	}
		 //fetch the object in the area
		 el.hitTest(hitTestArea,function(obj){
			 dragObject=obj;
			 dragOffset.x = obj.x - hitTestArea.x;
			 dragOffset.y = obj.y - hitTestArea.y;
		 })
		}
		function moveDrag(e){
			// if there is an object drag it
			if(dragObject){

				dragObject.x = getX(e)+dragOffset.x;
				dragObject.y =	getY(e)+dragOffset.y;

				updateAndDebug();
			}
		}

		function endDrag(){
			if(dragObject){
				updateAndDebug()
			}
			//reset drag
			dragObject=null;
		}

		//display debugger at the bottom of screen
		function updateAndDebug(){
			el.update()

			var debugRect = {w:500,h:50}
			el._util.shapes.normalRect(el.width-debugRect.w, el.height - debugRect.h, debugRect.w, debugRect.h)

			el.ctx.set('fillStyle','gray')
			el.ctx.fill()
			el.ctx.set('font',"30px Verdana")
			el.ctx.set('fillStyle','black')

			var message = "x: "+dragObject.x+" y: "+dragObject.y;

			el.ctx.fillText(message, el.width-debugRect.w+200,el.height - debugRect.h+35);
			console.info({x:dragObject.x,y:dragObject.y})
		}

		el.addEventListener('touchstart', startDrag, false);
		el.addEventListener('touchmove', moveDrag, false);
		el.addEventListener('touchend', endDrag, false);

};

/*
Touch Emulator polyfill used from
https://github.com/hammerjs/touchemulator

*/
!function(e,t,n,o){"use strict";var i,r,c=!1,u={};function s(e,t,n,o,i){o=o||0,i=i||0,this.identifier=t,this.target=e,this.clientX=n.clientX+o,this.clientY=n.clientY+i,this.screenX=n.screenX+o,this.screenY=n.screenY+i,this.pageX=n.pageX+o,this.pageY=n.pageY+i}function a(){var e=[];return e.item=function(e){return this[e]||null},e.identifiedTouch=function(e){return this[e+1]||null},e}function d(e){e.preventDefault(),e.stopPropagation()}function h(e){return function(t){d(t),1===t.which&&(("mousedown"==t.type||!r||r&&!r.dispatchEvent)&&(r=t.target),c&&!t.shiftKey&&(l("touchend",t),c=!1),l(e,t),!c&&t.shiftKey&&(c=!0,i={pageX:t.pageX,pageY:t.pageY,clientX:t.clientX,clientY:t.clientY,screenX:t.screenX,screenY:t.screenY},l("touchstart",t)),"mouseup"==t.type&&(i=null,c=!1,r=null))}}function l(e,n){var o=t.createEvent("Event");o.initEvent(e,!0,!0),o.altKey=n.altKey,o.ctrlKey=n.ctrlKey,o.metaKey=n.metaKey,o.shiftKey=n.shiftKey,o.touches=p(n,e),o.targetTouches=p(n,e),o.changedTouches=function(e,t){var n=f(e);!c||"mouseup"==e.type||"touchstart"!=t&&"touchend"!=t||n.splice(0,1);return n}(n,e),r.dispatchEvent(o)}function f(e){var t=new a;if(c){var n=m.multiTouchOffset,o=i.pageX-e.pageX,u=i.pageY-e.pageY;t.push(new s(r,1,i,-1*o-n,-1*u+n)),t.push(new s(r,2,i,o+n,u-n))}else t.push(new s(r,1,e,0,0));return t}function p(e,t){if("mouseup"==e.type)return new a;var n=f(e);return c&&"mouseup"!=e.type&&"touchend"==t&&n.splice(1,1),n}function v(e){var n,o,i,r;for(o=0;o<e.touches.length;o++)for(var c in n=e.touches[o],(i=u[n.identifier])||(i=u[n.identifier]=t.createElement("div"),t.body.appendChild(i)),r=m.template(n))i.style[c]=r[c];if("touchend"==e.type||"touchcancel"==e.type)for(o=0;o<e.changedTouches.length;o++)n=e.changedTouches[o],(i=u[n.identifier])&&(i.parentNode.removeChild(i),delete u[n.identifier])}function m(){"ontouchstart"in e||e.Modernizr&&e.Modernizr.touch||(navigator.msMaxTouchPoints||navigator.maxTouchPoints)>2||(!function(){for(var n=[e,t.documentElement],i=["ontouchstart","ontouchmove","ontouchcancel","ontouchend"],r=0;r<n.length;r++)for(var c=0;c<i.length;c++)n[r]&&n[r][i[c]]==o&&(n[r][i[c]]=null)}(),e.addEventListener("mousedown",h("touchstart"),!0),e.addEventListener("mousemove",h("touchmove"),!0),e.addEventListener("mouseup",h("touchend"),!0),e.addEventListener("mouseenter",d,!0),e.addEventListener("mouseleave",d,!0),e.addEventListener("mouseout",d,!0),e.addEventListener("mouseover",d,!0),e.addEventListener("touchstart",v,!0),e.addEventListener("touchmove",v,!0),e.addEventListener("touchend",v,!0),e.addEventListener("touchcancel",v,!0))}t.createTouch||(t.createTouch=function(t,n,i,r,c,u,a,d,h){return d!=o&&h!=o||(d=r-e.pageXOffset,h=c-e.pageYOffset),new s(n,i,{pageX:r,pageY:c,screenX:u,screenY:a,clientX:d,clientY:h})}),t.createTouchList||(t.createTouchList=function(){for(var e=new a,t=0;t<arguments.length;t++)e[t]=arguments[t];return e.length=arguments.length,e}),m.multiTouchOffset=75,m.template=function(e){var t="translate("+(e.clientX-15)+"px, "+(e.clientY-15)+"px)";return{position:"fixed",left:0,top:0,background:"#fff",border:"solid 1px #999",opacity:.6,borderRadius:"100%",height:"30px",width:"30px",padding:0,margin:0,display:"block",overflow:"hidden",pointerEvents:"none",webkitUserSelect:"none",mozUserSelect:"none",userSelect:"none",webkitTransform:t,mozTransform:t,transform:t,zIndex:100}},"function"==typeof define&&define.amd?define(function(){return m}):"undefined"!=typeof module&&module.exports?module.exports=m:e.TouchEmulator=m}(window,document);
