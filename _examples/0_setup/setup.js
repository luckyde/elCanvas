function setup(){
  //declare  where the canvas goes
  var canvas_container = document.getElementById('elCanvas');
  // create an instance
  my_el = new elCanvas(canvas_container,{AlignToCenter:true});

  console.log(my_el);
  // create an object
  var myCoolRectangle = my_el.rect()
  // create a timeline, have the canvas update on update
  my_el.update()
  // var tl = new TimelineMax({onUpdate: el.update})

  // link for interactive animation
  // canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
