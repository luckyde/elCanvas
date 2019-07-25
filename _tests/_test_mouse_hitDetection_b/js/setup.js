function gE(e){ return document.getElementById(e)};
var masterTL;
var canvas_container;
var playBtn,stopBtn,clearBtn, speedBtn,speedBar,volumeBar,volumeBtn,clippy;
var currentPercent = 0.5;
var currentVolume = 0.2;
function setup(){
  TouchEmulator();
  playBtn = document.getElementById('play');
  stopBtn = document.getElementById('stop');
  clippy = document.getElementById('clippy');
  clearBtn = document.getElementById('clear');
  speedBtn = document.getElementById('speed');
  speedBar = document.getElementById('speedBar');
  volumeBtn = document.getElementById('volume');
  volumeBar = document.getElementById('volumeBar');

  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');
  var smallerSize = canvas_container.parentNode.offsetWidth<canvas_container.parentNode.offsetHeight?  canvas_container.parentNode.offsetWidth: canvas_container.parentNode.offsetHeight
  // canvas_container.style.left = (window.innerWidth-smallerSize)/2+'px';
  // canvas_container.style.left = (window.innerWidth-smallerSize)/2+'px';
  // canvas_container.width = smallerSize;
  // canvas_container.height = smallerSize;
  canvas_container.width = canvas_container.parentNode.offsetWidth;
  canvas_container.height = canvas_container.parentNode.offsetHeight;

  speedBar.style.width = currentPercent*100+"%"
  volumeBar.style.width = currentVolume*100+"%"

   var imageURLs=[
     {id:'0',url:'audio/0/0.png'},
     {id:'1',url:'audio/1/0.png'},
     {id:'2',url:'audio/2/0.png'},
     {id:'3',url:'audio/3/0.png'},
     {id:'4',url:'audio/4/0.png'},
     {id:'5',url:'audio/5/0.png'},
     {id:'6',url:'audio/6/0.png'},
     {id:'7',url:'audio/7/0.png'},
     {id:'8',url:'audio/8/0.png'},
     {id:'9',url:'audio/9/0.png'},
     {id:'10',url:'audio/10/0.png'},
     {id:'11',url:'audio/11/0.png'},
     {id:'12',url:'audio/12/0.png'},
     {id:'13',url:'audio/13/0.png'},
  ]
  var images = el_imageLoad(imageURLs,animate);

};
function animate(props){

  // edit this to edit the content on the page
  // setup canvas information
  /* create a el_canvas reference, which has the same properties as a canvas
  but allows chaining and has extra properties to help speed up drawing */

  this.el = new elCanvas(canvas_container, {images:props,AlignToCenter:false});

  // create custom shapes for future use
  this.customShapes = new el_util_custom_shapes(this.el);

  // setup the masterTL playhead
  masterTL= new TimelineMax({repeat:-1,onUpdate:el.update});

  var test_tl = new el_animation(this.el);

}
