function gE(e){ return document.getElementById(e)};

var canvas_circle ;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_circle = document.getElementById('elCanvas');
   var imageURLs=[
     {id:'coin',url:'images/icn_coin.png'},
     {id:'wr',url:'images/icn_wr.png'}
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
  this.el = new elCanvas(canvas_circle, {images:props,AlignToCenter:false});

  // create custom shapes for future use
  this.customShapes = new el_util_custom_shapes(this.el);

  var test_tl = new el_animation(this.el,dynamicInfo);


  canvas_circle.addEventListener('click',function(){ test_tl.play(0);});

}
