// the images need to be loaded first as base64 before anything else happens
var imageURLs=[
   {id:'nose',url:'nose.png'}
]
var images = el_imageLoad(imageURLs,animate);
function animate(props){
  //declare  where the canvas goes
  var canvas_container = document.getElementById('elCanvas');
  // create an instance
  this.el = new elCanvas(canvas_container,{images:props,AlignToCenter:true});

  // create custom shapes for future use
  new el_util_custom_shapes(this.el);

  var starShape = el.shape({customShape:this.el.customShapes.starShape})

  var bannerShape = el.shape({y:50,customShape:this.el.customShapes.banner_50})


  // create a timeline, have the canvas update on update
  var tl = new TimelineMax({onUpdate: el.update})
  // when the parent moves the child moves



  // link for interactive animation
  canvas_container.addEventListener('click',function(){ tl.play(0);});
}
