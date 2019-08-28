function gE(e){ return document.getElementById(e)};

var canvas_container;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');
  canvas_container.width = canvas_container.parentNode.offsetWidth;
  canvas_container.height = canvas_container.parentNode.offsetHeight;

  this.el = new elCanvas(canvas_container, {AlignToCenter:true});

  // create custom shapes for future use

  var test_tl = new el_animation(this.el);

  canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
