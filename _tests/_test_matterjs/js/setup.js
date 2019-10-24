function gE(e){ return document.getElementById(e)};

var canvas_container;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');


  // setup canvas information
  /* create a el_canvas reference, which has the same properties as a canvas
  but allows chaining and has extra properties to help speed up drawing */

  this.el = new elCanvas(canvas_container, {AlignToCenter:false});

  // create custom shapes for future use
  this.customShapes = new el_util_custom_shapes(this.el);

  var test_tl = new el_animation(this.el);

  canvas_container.addEventListener('click',function(){ test_tl.play(0);});

  // Matter.js module aliases
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Render = Matter.Render
        ;

    // create a Matter.js engine
    var engine = Engine.create({
      options: {
               width: 500,
               height: 500,
               showAngleIndicator: true,
               showVelocity: true,
               wireframes: false
             }
           } );

    // create two boxes and a ground
    var el_test = el.rect({x:40,y:0,centerAligned:true,width:80,height:80})
    var el_ground = el.rect({x:0,y:400,centerAligned:true,width:800,height:80})
    var el_circle = el.circle({x:90,y:-20,centerAligned:true,radius:20})
    //creat link
    var el_objects = {test:el_test,ground:el_ground,circle:el_circle}
    //create matterjs equivilants
    var matter_test = Bodies.rectangle(el_test.x, el_test.y, el_test.width, el_test.height,{id:'test'});
    var matter_circle = Bodies.circle(el_circle.x,el_circle.y,el_circle.radius,{id:'circle'});

    var matter_ground = Bodies.rectangle(el_ground.x, el_ground.y, el_ground.width, el_ground.height, {id:'ground', isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [matter_test,  matter_ground,matter_circle]);

    //adding temporary render to compare
    var render = Render.create({
        canvas: gE('matterCanvas'),
          engine: engine,
          options: {
              height: 500,
              width: 500
          }
      });
       Render.run(render);
    draw();

    function draw(){
      var bodies = Composite.allBodies(engine.world);
      //match the canvas objects to the matterjs objects
      for (var i = 0; i < bodies.length; i += 1) {
        var b = bodies[i];
        //all the bodies have ids anyway but they're numbered 0,1,2, 3, this only updates the ids we've purposely given
        if( typeof b.id === 'string' ){
          el_objects[b.id].x = b.position.x
          el_objects[b.id].y = b.position.y
        }

      }
        Engine.update(engine, 1000/60, 1);

        requestAnimationFrame(draw);
    }


}
