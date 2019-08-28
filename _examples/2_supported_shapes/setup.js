function setup(){
  //declare  where the canvas goes
  var canvas_container = document.getElementById('elCanvas');
  // create an instance
  this.el = new elCanvas(canvas_container,{AlignToCenter:true});
  // create an object
  var rectangle = el.rect()
  var rectangleWithRadius = el.rect({radius:20,x:120});
  var rectangleWithPartialRadius = el.rect({radius:{tl:0,tr:0,bl:20,br:0},x:240});
  var circle = el.circle({x:-90})

  var line = el.line({x1:140,y1:40,x2:100,y2:200})

  var quadLine = el.quadLine({x1:240,y1:240,qx:-50,qy:-50,x2:200,y2:150})

  // images need to be preloaded into the images list as base64 for them to work
  var image = el.image({id:'test'})

  var shape = el.shape({x:200,y:20})
  // a custom shape must be specified otherwise you will get errors
  shape.customShape=function(){
        el.ctx.beginPath()
        .moveTo(0,17).lineTo(17,15).lineTo(24,0).lineTo(31,15).lineTo(48,17).lineTo(36,29).lineTo(39,45).lineTo(24,37).lineTo(9,45).lineTo(12,29).lineTo(1,17)
        .closePath()
    }

  // create a timeline, have the canvas update on update
  var tl = new TimelineMax({onUpdate: el.update})



  // link for interactive animation
  canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
