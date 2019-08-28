function gE(e){ return document.getElementById(e)};

var canvas_container;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');
  canvas_container.width = canvas_container.parentNode.offsetWidth;
  canvas_container.height = canvas_container.parentNode.offsetHeight;
 animate();
};
function animate(){

  // edit this to edit the content on the page
  var dynamicInfo = {
    heading:"Lets Play!",
    scale:0.5
  }
  // setup canvas information
  /* create a el_canvas reference, which has the same properties as a canvas
  but allows chaining and has extra properties to help speed up drawing */

  this.el = new elCanvas(canvas_container, {AlignToCenter:false});

  // create custom shapes for future use
  this.customShapes = new el_util_custom_shapes(this.el);

  var test_tl = new el_animation(this.el,dynamicInfo);
  // canvas_container.width=300
  var capturer = new CCapture( { format: 'gif', workersPath: 'js/lib/' ,timeLimit: 4,framerate: 25})

  test_tl.eventCallback("onStart", startRecording);
  test_tl.eventCallback("onUpdate", drawFrame);
  test_tl.eventCallback("onComplete", stopRecoring);
  console.log(el);
  function startRecording(){
    console.log('start recording');
    capturer.start()
  }
  function drawFrame(event) {

    // this is required in order to update the canvas
    el.update();

    capturer.capture(canvas_container)
  }
  function stopRecoring(){
    console.log('stop recording');
    capturer.stop();
    capturer.save()
  }

  canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
