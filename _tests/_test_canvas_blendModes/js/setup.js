var canvas_container;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');

  // edit this to edit the content on the page
  var dynamicInfo = {
    test_value:"Test123",
  }

  var el = new elCanvas(canvas_container, {images:[],AlignToCenter:true});

  el_animation(el);

	window.EL = el;


}
