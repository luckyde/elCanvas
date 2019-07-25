function el_animation(el, params){
  var containerSize = el.container.offsetWidth
  var size = el.width/2;
  var center= {x:size,y:size}
  var mult = size/400;
  // to add to global custom shapes
  var org_gr = el.ctx.createLinearGradient(20,-20,0,50);
    org_gr.addColorStop(0, '#FFEE4A');
    org_gr.addColorStop(0.3, '#E1A955');
    org_gr.addColorStop(1, '#BF5110');
  var org_gr2 = el.ctx.createLinearGradient(20,-20,0,50);
    org_gr2.addColorStop(0, '#FFF881');
  org_gr2.addColorStop(1, '#FB9B0A');
  var org_gr3 = el.ctx.createLinearGradient(0,-50,0,10);
    org_gr3.addColorStop(0, '#F4CD05');
    org_gr3.addColorStop(1, '#BF5110');
      // create
  var out= new el.circle({x:center.x,y:center.y,radius:(size*0.99)/2,style:{fillStyle:"rgba(255,255,255,0.5)"}})
  var inStroke= new el.circle({x:center.x,y:center.y,radius:(size*0.79)/2,style:{fillStyle:"#066DB2"}})
  var inFill= new el.circle({x:center.x,y:center.y,radius:(size*0.74)/2,style:{fillStyle:"#103670"}})
  var starTL = new makeStars();
  var crc_bg= new el.circle({radius:105*mult,x:center.x,y:center.y,style:{fillStyle:'#BF5110'}})

  var crc= new el.circle({scaleX:1,scaleY:1,radius:105*mult,x:center.x,y:center.y,style:{fillStyle:org_gr}})
  var crc2= new el.circle({scaleX:1,scaleY:1,x:center.x,y:center.y,radius:100*mult,style:{fillStyle:org_gr2}})
  var crc3= new el.circle({scaleX:1,scaleY:1,x:center.x,y:center.y,radius:79*mult,style:{fillStyle:'#BF5110'}})
  var crc4= new el.circle({scaleX:1,scaleY:1,x:center.x,y:center.y,radius:71*mult,style:{fillStyle:org_gr3}})
  var text_w = new el.text({scaleX:1,scaleY:1,text:'W',x:center.x,y:center.y + size*0.11,style:{lineWidth:14*mult,strokeStyle:"#BF5110",fillStyle:"#FEEF2A",font:size/3.9+"px museo700"}})

 // animate
  var spinParts= [crc,crc2,crc3,crc4,text_w]
  var coin_in = new TimelineMax()
    .staggerFrom([crc_bg,[crc,crc2,crc3,crc4,text_w]],1,{scaleX:0,stagger:{amount:0.05,ease:Power3.easeIn},ease:Elastic.easeOut.config(0.5,0.4)},0)
    .to(spinParts,0.3,{y:"+=30",ease:Power2.easeIn},0.1)
    .from(text_w,0.3,{rotation:42,ease:Power3.easeOut},0)
    .to(crc_bg,0.3,{y:"+=28",ease:Power2.easeIn},0.1)
    .to(crc_bg,0.50,{y:"-=37",ease:Power2.easeOut},0.4)
    .to(spinParts,0.5,{y:"-=40",ease:Power2.easeOut},0.4)
    .to(spinParts,0.3,{y:"+=10",ease:Sine.easeIn},0.9)
    .to(crc_bg,0.3,{y:"+=5",ease:Sine.easeIn},0.9)
    .staggerTo([[inStroke,inFill],out],0.2,{y:"+=10",ease:Power2.easeOut},0.02,0.35)
    .staggerTo([[inStroke,inFill],out],0.6,{y:"-=10",ease:Back.easeOut},0.02,0.55)

  var bubble_tl = new TimelineMax({onUpdate:el.update,onRestart:function(){clearProps:"al"}})
    .add(coin_in,0.2)
    .add(starTL,0)
    .staggerTo([spinParts,crc_bg],2,{scaleX:"+=0.06",scaleY:"+=0.06",stagger:0.04,repeat:-1,yoyo:true,ease:Power1.easeInOut},0,1.5)
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
