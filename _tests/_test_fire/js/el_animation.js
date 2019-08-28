function el_animation(el, params){

  var style_userBorder = {lineWidth:15,strokeStyle:"#ffffff"};
  var user = el.image({x:-150,y:-80,id:"user",url:"images/user_image_1.jpg",rounded:40,zIndex:2,style:style_userBorder})

  var flameSize=64;
  var flameIMG = el.image({id:"flame", width:flameSize, height:flameSize,
  			radialGradient: {
  				size: flameSize,
  				inner: "rgba(128,64,10,1)",
  				outer:  "rgba(128,64,32,0)"
  			}
  		});
  var user={x:user.x+130,y:user.y+110,width:330,height:250}


  var allPins=[]
  var circle={x:0,y:0,radius:13}
    for(var x=circle.x-circle.radius; x<circle.x+circle.radius; x++) {
      var yspan = circle.radius*Math.sin(Math.acos((circle.x-x)/circle.radius));
      for(var y=circle.y-yspan; y<circle.y+yspan; y++) {
          // (x,y) is inside the circle
          // console.log(x,y);
          allPins.push(
             el.image({scale:0.3+Math.random()*2,x:user.x,y:user.y,id:"flame",width:flameSize,height:flameSize,globalCompositeOperation:"lighter"})
          )
      }
  }
  var smokeTL = new TimelineMax()
    var smoketeTl={};
  for(var i=0;i<allPins.length;i++){
    var obj=allPins[i];
    var xOffset=user.x-obj.x ;
    var randomizer=Math.random()*0.2;
    var startTime=Math.random()*4;
    var physicsPos={velocity:180+randomizer*20, angle:(i/allPins.length)*360, gravity:0};
    smoketeTl[i] = new TimelineMax({repeat:-1})
    // .set(obj,{scale:Math.random()*2},startTime)
    .from(obj,0.6,{opacity:0,ease:Sine.easeOut},0)
    .from(obj,0.9-randomizer,{scale:0,ease:Sine.easeIn},0)

    .to(obj,2,{physics2D:physicsPos},0)
    .to(obj,1,{opacity:0,ease:Sine.easeIn},0.5)
    smokeTL.add(smoketeTl[i],startTime)
  }

  var bot_message_tl= new TimelineMax({paused:true,onUpdate:el.update})
  .add(smokeTL,0);

  el.ready().then(bot_message_tl.play())

  return bot_message_tl;
}
