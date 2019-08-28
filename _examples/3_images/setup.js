// the images need to be loaded first as base64 before anything else happens
// var imageURLs=[
//    {id:'nose',url:'nose.png'}
// ]
function setup(){
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
  this.el = new elCanvas(canvas_container,{AlignToCenter:true});


  // importing via image object
  el.importImages({head:'head.png'})
  var imageViaID = el.image({debug:1,id:'head'})
  //instancing test via ID
  var imageViaID_instance = el.image({x:-400,id:'head'})

  //importing via url
  var imageViaURL = el.image({x:170,y:240,id:'nose',url:'nose.png'})
  //instancing test via URL
  var imageViaURL_instance = el.image({x:170-400,y:240,id:'nose'})
  var  tl = new TimelineMax({onUpdate: el.update,paused:true})
    .to(imageViaID,10,{scaleX:1.3,rotation:90})

  //when using images, you should wait for the images to load in order to start animating
  el.ready().then(tl.play());

  // link for interactive animation
  canvas_container.addEventListener('click',function(){ tl.play(0);});
}
