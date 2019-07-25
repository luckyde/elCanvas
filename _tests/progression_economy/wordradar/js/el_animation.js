function el_animation(el, params){
//el.container.offsetWidth
var containerSize = el.container.offsetWidth
  var size = el.width/2;
  var center= {x:size,y:size}
// size=400
// size
var mult = size/400;
// console.log(mult);


  // to add to global custom shapes
  el.customShapes.wordRadar_icon =   function(){
      el.ctx
      .translate(-28,-28)
      .beginPath()
      .moveTo(54,43).lineTo(54,43).bezierCurveTo(54,42,54,41,54,41).bezierCurveTo(53,40,52,39,51,39).bezierCurveTo(50,40,50,40,49,40).lineTo(49,40).bezierCurveTo(45,48,37,53,28,53).bezierCurveTo(15,53,4,42,4,29).bezierCurveTo(4,15,15,5,28,5).bezierCurveTo(33,5,37,6,41,8).lineTo(41,8).bezierCurveTo(42,9,43,9,43,8).bezierCurveTo(45,8,45,6,45,5).bezierCurveTo(45,5,44,5,44,4).lineTo(44,4).bezierCurveTo(44,4,44,4,44,4).bezierCurveTo(44,4,43,4,43,4).bezierCurveTo(39,1,34,0,28,0).bezierCurveTo(12,0,0,13,0,29).bezierCurveTo(0,45,13,58,28,58).bezierCurveTo(39,58,48,52,54,43.).bezierCurveTo(54,43,54,43,54,43).bezierCurveTo(54,43,54,43,54,43).moveTo(39,35).bezierCurveTo(38,35,38,35,37,36).bezierCurveTo(35,39,32,40,28,40).bezierCurveTo(22,40,17,35,17,29).bezierCurveTo(17,22,22,17,28,17).bezierCurveTo(29,17,30,17,31,17).lineTo(31,17).bezierCurveTo(32,17,32,17,32,17).bezierCurveTo(34,17,35,16,34,15).bezierCurveTo(34,14,34,14,34,14).bezierCurveTo(34,13,33.,13,33,13).bezierCurveTo(33,13,33,13,32,13).bezierCurveTo(31,12,30,12,28,12).bezierCurveTo(19,12,12,20,12,29).bezierCurveTo(12,38,19,45,28,45).bezierCurveTo(34,45,38,43,41,39).bezierCurveTo(41,39,41,39,42,39).bezierCurveTo(42,39,42,39,42,38).bezierCurveTo(42,38,42,38,42,37).bezierCurveTo(42,36,40,35,39,35).moveTo(31,30).bezierCurveTo(30,31,28,32,27,31).bezierCurveTo(27,29,27,28,28,27).lineTo(47,12).bezierCurveTo(48,11,50,11,51,12).bezierCurveTo(52,13,51,15,50,16).lineTo(31,30)
      .closePath();
  }

  var green_gr = el.ctx.createLinearGradient(0,-50,0,50);
    green_gr.addColorStop(0, '#EBFA92');
    green_gr.addColorStop(1, '#325907');
  var green_gr_b = el.ctx.createLinearGradient(0,-50,0,50);
    green_gr_b.addColorStop(0, '#C6E657');
  green_gr_b.addColorStop(1, '#567A0F');
  var blue_gr_d = el.ctx.createLinearGradient(0,-100,0,120);
    blue_gr_d.addColorStop(0, '#027CC3');
    blue_gr_d.addColorStop(1, '#013571');
    // create
var out= new el.circle({x:center.x,y:center.y,radius:(size*0.99)/2,style:{fillStyle:"rgba(255,255,255,0.5)"}})
var inStroke= new el.circle({x:center.x,y:center.y,radius:(size*0.79)/2,style:{fillStyle:"#066DB2"}})
var inFill= new el.circle({x:center.x,y:center.y,radius:(size*0.74)/2,style:{fillStyle:"#103670"}})
var starTL = new makeStars();

var crc= new el.circle({radius:90*mult,x:center.x,y:center.y,style:{
lineWidth:21*mult,strokeStyle:"#ffffff",fillStyle:"#608622"}})
var crc_b= new el.circle({radius:75*mult,parent:crc,style:{fillStyle:green_gr}})
var crc_c= new el.circle({radius:65*mult,parent:crc,style:{fillStyle:green_gr_b}})
var wordRadar_icon_b= new el.shape({x:center.x,y:center.y,customShape:'wordRadar_icon',style:{ fillStyle:'#FFFFD7'}})
//
// var spin_c= new el.shape({x:center.x,y:center.y,customShape:'spin',scaleX:0.62*mult,scaleY:0.62*mult, style:{ fillStyle:'#013571'}})
// var spin_d= new el.shape({x:center.x,y:center.y,customShape:'spin',scaleX:0.50*mult, scaleY:0.50*mult,style:{ fillStyle:blue_gr_d}})

var spinParts= [crc,crc_c,crc_b,wordRadar_icon_b]
var zoom_tl = new TimelineMax({repeat:-1,repeatDelay:1})
.staggerTo(spinParts,1,{scaleX:"+=0.06",scaleY:"+=0.06",ease:Back.easeOut.config(0.6)},0,0)
.to(spinParts,1,{scaleX:"-=0.06",scaleY:"-=0.06",stagger:{amount:0.01,from:'start'},ease:Power1.easeInOut},1.1)

  var spin_tl= new TimelineMax()
  .staggerFrom(spinParts,1,{scaleY:0,scaleX:0,opacity:1,stagger: 0.07,ease:Elastic.easeOut.config(0.4,0.3)},0)
// .from(text,1.1,{scale:1.6,y:center.y,opacity:0,ease:Elastic.easeOut.config(0.5,0.4)},0.2)
// .staggerTo(spinParts,1,{scaleX:"+=0.06",scaleY:"+=0.06",stagger:0.04,repeat:-1,yoyo:true,ease:Power1.easeOut},0,0.5)
// // .from(spinParts,0.5,{y:30,ease:Elastic.easeOut.config(0.5,0.3)},0)
// .from(spin_d,1.2,{scaleX:-1},0)
.add(zoom_tl,1)
  var bubble_tl = new TimelineMax({onUpdate:el.update})
.add(starTL,0)
//   // .from(rays,1,{scale:0,ease:Expo.easeOut},0)
//   //
  // .to(wordRadar_icon_b,40,{rotation:-359,repeat:-1,ease:Linear.easeNone},0)
  .add(spin_tl,0.1)
  .from(out,0.4,{scale:0,ease:Power4.easeOut},0)
  .staggerFrom([inStroke,inFill],1,{scale:0,ease:Elastic.easeOut.config(0.3,0.4)},0.1,0)

  return bubble_tl;

  function makeStars(){
    var starSpec={size:3,count:6,fill:'#ffffff',obj:[]}
      var starTL = new TimelineMax()
    for(i=0;i<starSpec.count;i++){
      var starMult = ( i & 1 ) ? 1: -1;
      var xPos = 50*starMult;
      var yPos = 0+Math.random()*60-30;
      var scaleChange = Math.random()*5;
      var star= new el.rect({rotation:Math.random()*180,opacity:0,x:center.x+xPos,y:center.y+yPos, radius:-(starSpec.size),scaleX:0.8+scaleChange,scaleY:1.1+scaleChange,width:0,height:0,style:{fillStyle:starSpec.fill}})
      starSpec.obj.push(star)
      var delay = Math.random()*0.5
      starTL.fromTo(star,0.3,{opacity:0},{opacity:1},delay)
      .to(star,0.5+delay,{scaleX:0,scaleY:0},delay+0.4)
      .to(star,2+delay,{ease:Power3.easeOut,x:center.x+(xPos*2.4),y:center.y*0.8+yPos*2.8},delay)
    }


      return starTL
  }

}
