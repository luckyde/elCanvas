function gE(e){ return document.getElementById(e)};

var canvas;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas = document.getElementById('elCanvas');
  // canvas_container.width = canvas_container.parentNode.offsetWidth;
  // canvas_container.height = canvas_container.parentNode.offsetHeight;


    this.el = new elCanvas(canvas, {AlignToCenter:false});

  var world = Physics();
  var renderer = Physics.renderer('elCanvas', {
      el: [],
      width: canvas.width,
      height: canvas.height,
      meta: true
  });

  world.add([
      Physics.behavior('edge-collision-detection', {aabb: Physics.aabb(0, 0, canvas.width, canvas.height)}),
      Physics.behavior('body-collision-detection'),
      Physics.behavior('body-impulse-response'),
      Physics.behavior('sweep-prune'),
      Physics.behavior('constant-acceleration'),
      renderer
  ]);

  world.on('step', function(){
      world.render();
  });
  Physics.util.ticker.on(function(t){
      world.step(t);
      el.update();
  }).start();
  // add a square
  var elSquare=el.rect({x:200,y:80,center:{x:-50,y:-50},style:{fillStyle:getRandomColor()}});
  var physics_square = Physics.body('rectangle',{
    el_obj:elSquare,
    x: elSquare.x,
    y: elSquare.y,
    width: elSquare.width,
    height: elSquare.height,
    vx:0.3

  });
  world.add(physics_square);

  // add a circle which acts like a circle
  var elSprite=el.circle({x:300,width:64,height:64,center:{x:-32,y:-32},frameIn:0,frameOut:22,fps:12,id:'ring_circle', zIndex:2,playing:'on'})
  var physics_circle = Physics.body('circle',{
    el_obj:elSprite,
    x: elSprite.x,
    y: elSprite.y,
    radius:elSprite.width/2,
    vx:0.3

  });
  world.add(physics_circle);

  function addCircle(){
    var size=Math.random()*20+10;
    var velocity= {x:Math.random()*0.3, y:Math.random()}
    var elCircle=el.circle({x:200,y:80,radius:size,style:{fillStyle:getRandomColor()}});

    var physicsCircle = world.add( Physics.body('circle', {
        el_obj:elCircle,
        x: elCircle.x+Math.random()*10,
        y: elCircle.y,
        vx: velocity.x,
        cy:velocity.y,
        radius: elCircle.radius
    }));
  };

  var circles=400;
  for(var z=0;z<circles;z++){
    addCircle();
  };

  canvas.addEventListener('click',addCircle);


  // utility
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
