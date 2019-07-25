// the images need to be loaded first as base64 before anything else happens
var imageURLs=[
   {id:'nose',url:'nose.png'}
]
var images = el_imageLoad(imageURLs,animate);
function animate(props){
  console.log(props);
  var starShape = function(){
        el.ctx.beginPath()
        .moveTo(0,17).lineTo(17,15).lineTo(24,0)
        .lineTo(31,15).lineTo(48,17).lineTo(36,29)
        .lineTo(39,45).lineTo(24,37).lineTo(9,45)
        .lineTo(12,29).lineTo(1,17)
        .closePath()
    }

  //declare  where the canvas goes
  var canvas_container = document.getElementById('elCanvas');
  // create an instance
  this.el = new elCanvas(canvas_container,{images:props,AlignToCenter:true});
  // create an object
  var rectangle = new el.rect({y:-300,width:300,x:-200,height:200})
  var circle = new el.circle({x:-90})
  var circle2 = new el.circle({x:90})

  // images need to be preloaded into the images list as base64 for them to work
  var image = new el.image({id:'nose'})
  console.log(this.el);
  var shape = new el.shape({x:0,y:120,customShape:starShape,scale:2})
  // a custom shape must be specified otherwise you will get errors 
  // create a timeline, have the canvas update on update
  var tl = new TimelineMax({onUpdate: el.update})



  // link for interactive animation
  canvas_container.addEventListener('click',function(){ test_tl.play(0);});
}
