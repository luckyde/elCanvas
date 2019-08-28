function gE(e){ return document.getElementById(e)};

var canvas_container;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');

  // edit this to edit the content on the page
  var dynamicInfo = {
    test_value:"Test123",
  }

  this.el = new elCanvas(canvas_container, {images:[],AlignToCenter:true});

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
