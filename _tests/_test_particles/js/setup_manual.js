function setup_manual() {
  console.log('hi');
  var canvas = document.getElementById('elCanvas_board_clicker');
  var el = new elCanvas(canvas, {images:[],AlignToCenter:true});


  var flameSize=64;
  var myImage = new el._util.generateRadialGradientBitmap("test",flameSize, "rgba(248,64,32,1)", "rgba(128,64,32,0)");
  // var test= new el.image({id:"test",width:32,height:32})
  var particles={obj:[],count:180}
  for(var i=0;i<particles.count;i++){
    console.log('hi');
    var smoke= new el.image({id:"test",width:flameSize,height:flameSize,y:300,globalCompositeOperation:"lighter"})
    particles.obj.push( smoke );
  }

  var smokeTL = new TimelineMax({onUpdate:el.update})
  var smoketeTl={};
  for(var i=0;i<particles.count;i++){
  var startRand= {x:Math.random()*80-40, y:200+Math.random()*5,scale:Math.random()*2};
  var endRnd={velocity:Math.random()*150,angle:-90+Math.random()*20-10}
   smoketeTl[i] = new TimelineMax({repeat:-1})
  .set(particles.obj[i],  {x:startRand.x,y:startRand.y,scale:startRand.scale},0)
  .from(particles.obj[i],0.6,{opacity:0,ease:Sine.easeOut},0)
  .to(particles.obj[i],1,{opacity:0,ease:Sine.easeIn},0.5+Math.random()*0.5)
  .to(particles.obj[i], 2, {physics2D:{velocity:200+endRnd.velocity, angle:endRnd.angle, gravity:00}},0);
  smokeTL.add(smoketeTl[i],i*0.013)
  }
  // .staggerTo(particles.obj,1,{y:-300},0.03,0)
  // el.update();
  // console.log(myImage);

}
