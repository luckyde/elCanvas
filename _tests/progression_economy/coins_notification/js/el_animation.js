function el_animation(el, params){
  var containerSize = el.container.offsetWidth
  var size = el.width;
  var center= {x:size/2,y:size/2}
  var coinEnd= {x:160,y:180}
  var mult = size/800;

  var rings=[
    new el.circle({x:center.x,y:center.y,radius:170*mult,style:{fillStyle:"rgba(255,255,255,0.1)"}}),
    new el.circle({x:center.x,y:center.y,radius:281*mult,style:{fillStyle:"rgba(255,255,255,0.1)"}}),
    new el.circle({x:center.x,y:center.y,radius:382*mult,style:{fillStyle:"rgba(255,255,255,0.1)"}})
  ];

 // animate
 var coin_small= new el.image({x:340,y:380,rotation:-28,scale:0.3,id:'coin'})

 var wordradar= new el.image({x:450,y:390,id:'wr'})
 var coin= new el.image({x:coinEnd.x,y:coinEnd.y,zIndex:5,rotation:14,id:'coin',width:308,height:307})
var flameSize=64;
var flameIMG = new el._util.generateRadialGradientBitmap("flame",flameSize, "rgba(252,191,55,1)", "rgba(255,231,106,0)");
var coinGlow =  new el.image({scale:5,x:130+coin.width/2,y:150+coin.height/2,id:"flame",width:flameSize,height:flameSize,globalCompositeOperation:"lighter"})
var coinGlow2 =  new el.image({scale:5.2,x:136+coin.width/2,y:138+coin.height/2,id:"flame",width:flameSize,height:flameSize,globalCompositeOperation:"lighter"})
var coinGlow3 =  new el.image({scale:5.3,x:126+coin.width/2,y:158+coin.height/2,id:"flame",width:flameSize,height:flameSize,globalCompositeOperation:"lighter"})
  var glows = [coinGlow,coinGlow2,coinGlow3 ]

  var starSpec={
    count:90,
    fill:'#ffe568',
    radius:4,
    obj:[],
    distance:coin.width/2.2,
    maxDistance:190
  }
  var starTL = new makeTinyDots()

  var bubble_tl = new TimelineMax({onUpdate:el.update,onRestart:function(){clearProps:"all"}})
  .set(starSpec.obj,{opacity:0},0)
      .add(starTL,0.1)
  return bubble_tl;

  function makeTinyDots(){

    var starTL = new TimelineMax()
    var starGlow = new TimelineMax()
    .staggerFrom([wordradar,coin_small],1,{x:center.x,y:center.y,scale:0,ease:Elastic.easeOut.config(0.5,0.4)},0.1,0)

    .from(coin,2,{x:center.x,y:center.y,scale:0.2,ease:Elastic.easeOut.config(0.2,0.6)},0.1)
    .from(coin,0.5,{opacity:0,ease:Sine.easeIn},0.2)
    .staggerFrom(glows,2,{x:center.x+200,y:center.y+100,opacity:0,scale:0,ease:Elastic.easeOut.config(0.2,0.6)},0.05,0)
      .staggerTo(glows,2,{scale:5.8,repeat:-1,yoyo:true},1.4,0)
    for(i=0;i<starSpec.count;i++){
      var angle = (i/starSpec.count)*360+Math.random()*3;
      var xPos = coinEnd.x+coin.width/2+ Math.cos(angle)*starSpec.distance;
      var yPos = coinEnd.y+coin.height/2+Math.sin(angle)*starSpec.distance;
      var entranceDelay = 0.5;
      var delayInt = Math.random()*2
      var delay = Math.random()*3

      var star= new el.circle({
        opacity:0,
        x:xPos,y:yPos,
        scaleX:1+Math.random()*0.5,
        scaleY:1+Math.random()*0.5,
        radius:starSpec.radius,
        style:{fillStyle:starSpec.fill}
      });
      //coming in
      starGlow
      .set(star,{opacity:0,x:xPos,y:yPos})
      .set(star,{opacity:1},delayInt*0.2)
      .from(star,entranceDelay*1.4,{opacity:0,scale:0,x:xPos*0.2+400+Math.random()*100,y:yPos*0.2+360+Math.random()*100,ease:Quad.easeOut  },delayInt*0.2)
      //movin around
      starSpec.obj.push(star);
      starGlow.to(star, 2, {opacity:0,repeat:-1,yoyo:false,ease:Linear.easeNone}, entranceDelay+delayInt)
      .to(star, 2, {
        scale:0.7-Math.random()*0.7,
        x:coinEnd.x+coin.width/2+Math.random()*120-60+ Math.cos(angle)*starSpec.maxDistance,
        y:coinEnd.y+coin.height/2+Math.random()*120-60+ Math.sin(angle)*starSpec.maxDistance,
        repeat:-1,yoyo:false,ease:Quad.easeOut}, entranceDelay+delayInt);
    }


    starTL
    .staggerFrom(rings,1,{opacity:0,scale:0.7,ease:Elastic.easeOut.config(0.5,0.4)},0.05,0)
    .staggerFrom(['#info_text','#info_subtext'],1,{y:20,opacity:0,ease:Quad.easeOut},0.1,0.3)
       .add(starGlow,0.1)
      return starTL;
  }

};
