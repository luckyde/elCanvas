function gE(e){ return document.getElementById(e)};

var canvas_container;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');
  canvas_container.width = canvas_container.parentNode.offsetWidth;
  canvas_container.height = canvas_container.parentNode.offsetHeight;
   var imageURLs=[
      {id:'background',url:'images/background.jpg'} ,

      {id:'arm_lower_l',url:'images/sb/arm_lower_l.png'},
      {id:'arm_r',url:'images/sb/arm_r.png'},
      {id:'arm_upper_l',url:'images/sb/arm_upper_l.png'},
      {id:'belt',url:'images/sb/belt.png'},
      {id:'brow_l',url:'images/sb/brow_l.png'},
      {id:'cuffs',url:'images/sb/cuffs.png'},
      {id:'eye_l',url:'images/sb/eye_l.png'},
      {id:'eye_r',url:'images/sb/eye_r.png'},
      {id:'glasses_l',url:'images/sb/glasses_l.png'},
      {id:'glasses_r',url:'images/sb/glasses_r.png'},
      {id:'hand_l',url:'images/sb/hand_l.png'},
      {id:'hand_r',url:'images/sb/hand_r.png'},
      {id:'head',url:'images/sb/head.png'},
      {id:'jacket',url:'images/sb/jacket.png'},
      {id:'mouth',url:'images/sb/mouth.png'},
      {id:'mustache',url:'images/sb/mustache.png'},
      {id:'nose',url:'images/sb/nose.png'},
      {id:'tie',url:'images/sb/tie.png'}



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

  test_tl.eventCallback("onUpdate", drawFrame);
  function drawFrame(event) {

    // this is required in order to update the canvas
    el.update();


  }

  canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
