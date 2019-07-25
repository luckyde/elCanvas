function setup(){
  //declare  where the canvas goes
  var canvas_container = document.getElementById('elCanvas');
  // create an instance
  this.el = new elCanvas(canvas_container);
  // create an object
  var myCoolRectangle = new el.rect({x:0,zIndex:2,y:200})
  var myCoolRectangle = new el.rect({x:35,y:201,zIndex:1,style:{fillStyle:"red"}})
  // create a timeline, have the canvas update on update
  var tl = new TimelineMax({onUpdate: el.update})
  .to(myCoolRectangle,1,{x:500,ease:Expo.easeInOut,yoyo:true,repeat:-1})

  // Supported properties:
  //  x,y       | yes
  // top, left  | no
  // scale      | yes
  // scaleX, ScaleY | yes (But only if NOT animating scale, and vice-versa)
  // rotation   | yes
  // opacity    | yes
  // skew       | no
  // parent     | yes(specifiy only another el object)
  // globalcompositeoperation | yes
  // zIndex     | yes (Only on Creation)


  // link for interactive animation
  canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
