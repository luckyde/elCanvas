function gE(e){ return document.getElementById(e)};

var canvas_container;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');
  resizeCanvas();

   var imageURLs=[
      {id:'background',url:'images/background.jpg'} ,
      {id:'background2',url:'images/background.jpg'},
      {id:'face',url:'images/face.png'},
      {id:'ring',url:'images/ring_sprite.png'},
      {id:'head',url:'images/head.png'},
      {id:'nose',url:'images/nose.png'}



  ]
  var images = el_imageLoad(imageURLs,animate);

};
function animate(props){

  // edit this to edit the content on the page
  var dynamicInfo = {
    test_value:"Test123",
  }
  // setup canvas information
  /* create a el_canvas reference, which has the same properties as a canvas
  but allows chaining and has extra properties to help speed up drawing */

  this.el = new elCanvas(canvas_container, {images:props,AlignToCenter:false});

  // create custom shapes for future use
  this.customShapes = new el_util_custom_shapes(this.el);

  var test_tl = new el_animation(this.el,dynamicInfo);



}
var resizeCanvas = function(){
  canvas_container.width = window.innerWidth;
  canvas_container.height =window.innerHeight;
}
window.onresize=resizeCanvas;
