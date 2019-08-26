function gE(e){ return document.getElementById(e)};

var canvas_container;

function setup(){
  canvas_container = document.getElementById('elCanvas');
  this.el = new elCanvas(canvas_container, {AlignToCenter:false});
  var test_tl = new el_animation(this.el);

  // test_tl.eventCallback("onUpdate", drawFrame);
  // function drawFrame(event) {
  //
  //   // this is required in order to update the canvas
  //   el.update();
  //
  //
  // }

  // canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
