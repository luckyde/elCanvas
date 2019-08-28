// the images need to be loaded first as base64 before anything else happens
var imageURLs=[
   {id:'nose',url:'nose.png'}
]
var images = el_imageLoad(imageURLs,animate);
function animate(props){
  //declare  where the canvas goes
  var canvas_container = document.getElementById('elCanvas');
  // create an instance
  this.el = new elCanvas(canvas_container,{images:props,AlignToCenter:true});

  this.styles={
  outline:"#dd9030",
  fill_top:"#f0ab43",
  fill_bottom:"#f7e90a",
  highlight:"#F9E077",
  reflection:"#fae77f",
  reflection_bottom:"#f2bf3c",
  lineWidth:4,
  line_color: "#066DB2",
  radius:120
  }
  this.normal_gradient = this.el.ctx.createLinearGradient(0,0, 0,  70);
  this.normal_gradient.addColorStop(.3, this.styles.fill_top);
  this.normal_gradient.addColorStop(0.85, this.styles.fill_bottom);

  this.normal_gradient_highlight = this.el.ctx.createLinearGradient(0,0, 0,  22);
  this.normal_gradient_highlight.addColorStop(0, this.styles.reflection);
  this.normal_gradient_highlight.addColorStop(0.6,  this.styles.reflection_bottom);


  // create custom tile
  var makeTile = function(params) {
    var shell=this.el.rect({
    transformOrigin:"-00% 20%",zIndex:2,id:params.letter,numb:params.value,width:90,height:90,style:{fillStyle:"rgba(0,0,0,0)"}});
    var bg_storke=this.el.rect({scale:0,radius:Math.round(23),width:90,height:90,x:-90/2,y:-90/2,parent:shell,id:'tile',style:{fillStyle:this.styles.line_color}});
    var bgStyle =     {fillStyle:this.normal_gradient,strokeStyle:this.styles.outline,lineWidth:this.styles.lineWidth}
    var bg=this.el.rect({width:90,height:90,x:-90/2,y:-90/2,parent:shell,radius:22,id:'tile',name:params.letter,style:bgStyle});
    var reflection = this.el.rect({ parent:bg  ,width:bg.width*0.75, height:bg.height*0.2,
      x:bg.width*0.125,radius:10,
      y:bg.height*0.1,parent:bg,style:{fillStyle:this.normal_gradient_highlight}})
    var letter=this.el.text({transformOrigin:"-50% 0%",parent:bg,x:43,y:73,text:params.letter, style:{font:"65px museo700",  fillStyle:"#4C1900"}})
    var value=this.el.text({parent:bg,x:74,y:26,text:params.value, style:{font:"22px museo500",  fillStyle:"#4C1900"}})
    return [shell,bg,bg_storke];
  }
  makeTile({x:0,y:0,letter:"A",value:1})

  // create a timeline, have the canvas update on update
  var tl = new TimelineMax({onUpdate: el.update})
  // when the parent moves the child moves



  // link for interactive animation
  canvas_container.addEventListener('click',function(){ test_tl.play(0);});
}
