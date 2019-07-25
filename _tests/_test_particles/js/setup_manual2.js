function setup_manual2() {
  console.log('hi');
  var canvas = document.getElementById('elCanvas_board_clicker');
  var el = new elCanvas(canvas, {images:[],AlignToCenter:true});


  var flameSize=32;
  var myImage = new el._util.generateRadialGradientBitmap("test",flameSize, "rgba(204,86,151,1)", "rgba(204,86,151,0)");
  // var test= new el.image({id:"test",width:32,height:32})
  var particles={obj:[],count:130}
  for(var i=0;i<particles.count;i++){
    console.log('hi');
    var smoke= new el.image({id:"test",width:flameSize,height:flameSize,y:300,globalCompositeOperation:"lighter"})
    particles.obj.push( smoke );
  }

  var smokeTL = new TimelineMax({onUpdate:el.update})
  var smoketeTl={};
  for(var i=0;i<particles.count;i++){
  var startRand= {x:Math.random()*flameSize*1.5-flameSize*0.75, y:Math.random()*5,scale:Math.random()*0.8+0.2};
  var endRnd={velocity:Math.random()*50,angle:-90+Math.random()*40-20}
   smoketeTl[i] = new TimelineMax({repeat:-1})
  .set(particles.obj[i],  {x:startRand.x,y:startRand.y+37,scale:startRand.scale},0)
  .from(particles.obj[i],Math.random()*0.4+0.2,{opacity:0,ease:Sine.easeOut},0)
  .to(particles.obj[i],1,{opacity:0,ease:Sine.easeIn},0.5+Math.random()*0.5)
  .to(particles.obj[i], 2, {physics2D:{velocity:100+endRnd.velocity, angle:endRnd.angle, gravity:00}},0)

  smokeTL.add(smoketeTl[i],i*0.018)
  }

  TweenMax.ticker.addEventListener("tick", el.update);

  // canvas.onmousemove = canvas.addEventListener("click", moveMouse, false);
  // canvas.onmousemove = canvas.addEventListener("touchstart", startPos, false);
;



}
