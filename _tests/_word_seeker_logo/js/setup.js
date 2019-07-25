function gE(e){ return document.getElementById(e)};

var canvas_container;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');
   var imageURLs=[
     {id:'h1',url:'images/heading_1.png'}  ,
     {id:'h2',url:'images/heading_2.png'}  ,
     {id:'h3',url:'images/heading_3.png'}  ,
     {id:'h4',url:'images/heading_4.png'}  ,
     {id:'s1',url:'images/subheading_1.png'}  ,
     {id:'s2',url:'images/subheading_2.png'}  ,
     {id:'s3',url:'images/subheading_3.png'}  ,
     {id:'s4',url:'images/subheading_4.png'}  ,
     {id:'s5',url:'images/subheading_5.png'}  ,
     {id:'s6',url:'images/subheading_6.png'}  
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
