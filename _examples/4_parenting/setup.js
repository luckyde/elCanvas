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
  // create an object
  var red_limb = new el.rect({transformOrigin:"100% 50%" ,y:300,width:300,x:-200,height:50,style:{fillStyle:'red'}})

  // create a child, linking it to the parent, it's word space is now based off the parent
  var blue_limb = new el.rect({parent:red_limb,width:50,height:200,style:{fillStyle:'blue'}})
  // create a timeline, have the canvas update on update
  var tl = new TimelineMax({onUpdate: el.update})
  // when the parent moves the child moves
  .to(red_limb,1,{rotation:90,x:30,y:30})


  // link for interactive animation
  canvas_container.addEventListener('click',function(){ test_tl.play(0);});
}
