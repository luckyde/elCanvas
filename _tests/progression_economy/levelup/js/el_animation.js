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
  el.customShapes.badge =   function(){
      el.ctx.translate(-101,-105)
      .beginPath().moveTo(186,175).lineTo(117,215).bezierCurveTo(108,220,93,220,84,215).lineTo(15,175).bezierCurveTo(6,170,-0.5,158,-0.5,148).lineTo(-0.5,70).bezierCurveTo(-0.5,59,6,47,15,42).lineTo(84,3).bezierCurveTo(93,-1,108,-1,117,3).lineTo(186,42).bezierCurveTo(195,47,202,59,202,70).lineTo(202,148).bezierCurveTo(202,158,195,170,186,175).closePath()
      .translate(101,105)
  }

  var blue_gr = el.ctx.createLinearGradient(0,0,200,0);
    blue_gr.addColorStop(0, '#013571');
    blue_gr.addColorStop(1, '#027CC3');
  var blue_gr_b = el.ctx.createLinearGradient(0,180,-180,80);
    blue_gr_b.addColorStop(0, '#027CC3');
    blue_gr_b.addColorStop(1, '#4894C7');
  var blue_gr_d = el.ctx.createLinearGradient(0,-100,0,120);
    blue_gr_d.addColorStop(0, '#027CC3');
    blue_gr_d.addColorStop(1, '#013571');
    // create
  var rays= new el.image({ x:-400+center.x,y:-400+center.y,scale:mult, id:"rays"})
var out= new el.circle({x:center.x,y:center.y,radius:(size*0.99)/2,style:{fillStyle:"rgba(255,255,255,0.5)"}})
var inStroke= new el.circle({x:center.x,y:center.y,radius:(size*0.79)/2,style:{fillStyle:"#066DB2"}})
var inFill= new el.circle({x:center.x,y:center.y,radius:(size*0.74)/2,style:{fillStyle:"#103670"}})
var starTL = new makeStars();

var badge= new el.shape({x:center.x,y:center.y,customShape:'badge',scaleX:mult,scaleY:mult,style:{
lineWidth:10*mult,strokeStyle:"#ffffff",fillStyle:blue_gr}})
var badge_b= new el.shape({x:center.x,y:center.y,customShape:'badge',scaleX:0.9*mult,scaleY:0.9*mult, style:{ fillStyle:blue_gr_b}})

var badge_c= new el.shape({x:center.x,y:center.y,customShape:'badge',scaleX:0.62*mult,scaleY:0.62*mult, style:{ fillStyle:'#013571'}})
var badge_d= new el.shape({x:center.x,y:center.y,customShape:'badge',scaleX:0.50*mult, scaleY:0.50*mult,style:{ fillStyle:blue_gr_d}})

var text= new el.text({x:center.x,y:center.y+size*0.065,text:"10",style:{lineWidth:6*mult,strokeStyle:"#013571",fillStyle:"#ffffff",font:size/6+"px museo700"}})
var badgeParts = [badge,badge_b,badge_c,badge_d]
var all = [badge,badge_b,badge_c,badge_d,text]


  var badge_tl= new TimelineMax()
  .staggerFrom(badgeParts,1,{scaleY:0.2,y:center.y+20,scaleX:0,opacity:0,stagger: 0.07,ease:Elastic.easeOut.config(0.4,0.3)},0)
.from(text,1.1,{scale:1.6,y:center.y,opacity:0,ease:Elastic.easeOut.config(0.5,0.4)},0.2)
.staggerTo(all,2,{scaleX:"+=0.06",scaleY:"+=0.06",stagger:0.04,repeat:-1,yoyo:true,ease:Power1.easeInOut},0,0.5)
// .from(badgeParts,0.5,{y:30,ease:Elastic.easeOut.config(0.5,0.3)},0)
// .from(badge_d,1.2,{scaleX:-1},0)
  var bubble_tl = new TimelineMax({onUpdate:el.update})
  .add(starTL,0)
  .from(rays,1,{scale:0,ease:Expo.easeOut},0)

  .to(rays,40,{rotation:359,repeat:-1,ease:Linear.easeNone},0)
  .add(badge_tl,0.1)
  .from(out,0.4,{scale:0,ease:Power4.easeOut},0)
  .staggerFrom([inStroke,inFill],1,{scale:0,ease:Elastic.easeOut.config(0.3,0.4)},0.1,0)

  return bubble_tl;

  function makeStars(){
    var starSpec={size:3,count:9,fill:'#ffffff',obj:[]}
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
      .to(star,2+delay,{ease:Sine.easeOut,x:center.x+(xPos*2.4),y:center.y*0.8+yPos*2.8},delay)
    }


      return starTL
  }

}
