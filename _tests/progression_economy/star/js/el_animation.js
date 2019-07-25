function el_animation(el, params){
  var containerSize = el.container.offsetWidth
  var size = el.width/2;
  var center= {x:size,y:size}
  var mult = size/400;
  el.customShapes.roundedStar_icon =   function(){
      el.ctx
      .translate(5,-26).beginPath().moveTo(92,29).lineTo(133,-66).bezierCurveTo(134,-67,134,-68,134,-69).bezierCurveTo(134,-71,134,-74,132,-76).bezierCurveTo(131,-76,131,-77,130,-77).bezierCurveTo(130,-77,130,-78,129,-78).bezierCurveTo(129,-78,128,-78,128,-78).bezierCurveTo(128.,-78,127,-79,127,-79).bezierCurveTo(127.,-79,126,-79,126,-79).bezierCurveTo(125.,-79,125,-79,125,-79).bezierCurveTo(124.,-79,123,-79,123,-79).lineTo(21,-53).lineTo(-56,-121).bezierCurveTo(-57,-122,-58,-122,-59,-123).bezierCurveTo(-59,-123,-59,-123,-59,-123).bezierCurveTo(-59,-123,-59,-123,-59,-123).bezierCurveTo(-60,-123,-61,-124,-62,-124).bezierCurveTo(-62,-124,-63,-124,-63,-124).bezierCurveTo(-63,-124,-63,-124,-64,-124).bezierCurveTo(-64,-123,-64,-123,-65,-123).bezierCurveTo(-65,-123,-65,-123,-66,-123).bezierCurveTo(-66,-123,-66,-123,-66,-123).bezierCurveTo(-67,-123,-67,-123,-67,-122).bezierCurveTo(-67,-122,-67,-122,-67,-122).bezierCurveTo(-68,-122,-68,-122,-68,-122).bezierCurveTo(-69,-121,-69,-121,-69,-120).bezierCurveTo(-70.,-120,-71,-119,-71,-118).bezierCurveTo(-71,-117,-72,-116,-72,-115).lineTo(-78,-11).lineTo(-168,42).bezierCurveTo(-171,43,-173,47,-173,50).bezierCurveTo(-173,52,-172,53,-172,54).bezierCurveTo(-171,55,-171,55,-170,56).bezierCurveTo(-169,57,-168,58,-167,59).lineTo(-70,97).lineTo(-46,199).bezierCurveTo(-46,200,-46,201,-45,202).bezierCurveTo(-45,202,-45,202,-45,202).bezierCurveTo(-44,203,-44,203,-43,204).bezierCurveTo(-43,204,-43,204,-43,204).bezierCurveTo(-42,205,-41,205,-40,205).bezierCurveTo(-40,206,-40,206,-40,206).bezierCurveTo(-39,206,-38,206,-37,206).bezierCurveTo(-37,206,-37,206,-37,206).bezierCurveTo(-36,206,-36,206,-35,206).bezierCurveTo(-35,206,-35,206,-35,206).bezierCurveTo(-34,206,-33,205,-32,205).bezierCurveTo(-31,204,-31,203,-30,203).lineTo(36,122).lineTo(140,132).bezierCurveTo(140,132,140,132,141,132).bezierCurveTo(142,131,143,131,144,131).bezierCurveTo(144,131,144,131,144,131).bezierCurveTo(145,130,146,130,147,129).bezierCurveTo(147,129,147,129,147,129).bezierCurveTo(148,128,148,127,149,127).bezierCurveTo(149,126,149,126,149,126).bezierCurveTo(149,125,150,124,150,123).bezierCurveTo(150,121,149,119,148,117).lineTo(92,29).closePath();
  }
  // to add to global custom shapes
  var org_gr = el.ctx.createLinearGradient(20,-20,0,50);
    org_gr.addColorStop(0, '#FFDA69');
    org_gr.addColorStop(1, '#FBB419');
  var org_gr2 = el.ctx.createLinearGradient(20,-20,0,50);
    org_gr2.addColorStop(0, '#FFF881');
  org_gr2.addColorStop(1, '#FB9B0A');
  var org_gr3 = el.ctx.createLinearGradient(0,-50,0,10);
    org_gr3.addColorStop(0, '#F4CD05');
    org_gr3.addColorStop(1, '#BF5110');
      // create
      console.log(el.customShapes.starShape);
  var out= new el.circle({x:center.x,y:center.y,radius:(size*0.99)/2,style:{fillStyle:"rgba(255,255,255,0.5)"}})
  var inStroke= new el.circle({x:center.x,y:center.y,radius:(size*0.79)/2,style:{fillStyle:"#066DB2"}})
  var inFill= new el.circle({x:center.x,y:center.y,radius:(size*0.74)/2,style:{fillStyle:"#103670"}})
  var star = new el.shape({x:center.x,y:center.y,rotation:25,scale:0.5,customShape:'roundedStar_icon'})
  star.style=  {lineWidth:20*mult,strokeStyle:"#004B8B",fillStyle:org_gr}
  var starTL = new makeStars();
  var textBase = new el.rect({x:center.x,y:center.y,width:0,height:0})
  var text_plus = new el.text({parent:textBase,scaleX:1,scaleY:1,text:'+',x:- size*0.15,y:+ size*0.04,style:{fillStyle:"#004B8B",font:size/6.5+"px museo700"}})
  var text_number = new el.text({parent:textBase,scaleX:1,scaleY:1,text:'10',x:+ size*0.03,y: + size*0.11,style:{fillStyle:"#004B8B",font:size/4.5+"px museo700"}})

 // animate

  var bubble_tl = new TimelineMax({onUpdate:el.update,onRestart:function(){clearProps:"al"}})
  .from(star,1.1,{scale:0,rotation:-90,ease:Elastic.easeOut.config(0.9,0.6)},0)
  .from(textBase,1.2,{scale:0,ease:Elastic.easeOut.config(0.6,0.4)},0.1)
  .add(starTL,0)

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
