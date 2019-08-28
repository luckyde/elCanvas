function setup(){
  //declare  where the canvas goes
  var canvas_container = document.getElementById('elCanvas');
  // create an instance
  this.el = new elCanvas(canvas_container,{AlignToCenter:true});

  console.log(this.el);
  // create an object
  var myCoolRectangle = el.rect()
  // create a timeline, have the canvas update on update
  el.update()
  // var tl = new TimelineMax({onUpdate: el.update})

  // link for interactive animation
  // canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
