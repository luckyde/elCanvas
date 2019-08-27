
function animate(props){

  //declare  where the canvas goes
  var canvas_a = document.getElementById('elCanvas_a');
  var canvas_b = document.getElementById('elCanvas_b');
  // create an instance
  el_a = new elCanvas(canvas_a,{AlignToCenter:true});
  el_b = new elCanvas(canvas_b,{AlignToCenter:true});
  //Works
  var chosenCanvas = el_b;
  //Doesn't work
  // var chosenCanvas = el_a;
  // create custom tile
  var makeTile = function(params,canvas) {
    var shell=canvas.rect({
    transformOrigin:"-00% 20%",zIndex:2,id:params.letter,numb:params.value,width:90,height:90,style:{fillStyle:"rgba(0,0,0,0)"}});
    var bg_storke=canvas.rect({scale:0,radius:23,width:90,height:90,x:-90/2,y:-90/2,parent:shell,id:'tile',style:{fillStyle:'blue'}});
    var bgStyle =     {fillStyle:'red',strokeStyle:'blue',lineWidth:6}
    var bg=canvas.rect({width:90,height:90,x:-90/2,y:-90/2,parent:shell,radius:22,id:'tile',name:params.letter,style:bgStyle});
    var letter=canvas.text({transformOrigin:"-50% 0%",parent:bg,x:43,y:73,text:params.letter, style:{font:"65px museo700",  fillStyle:"#4C1900"}})
    var value=canvas.text({parent:bg,x:74,y:26,text:params.value, style:{font:"22px museo500",  fillStyle:"#4C1900"}})

  }
  makeTile({x:0,y:0,letter:"A",value:1},chosenCanvas)

  el_a.update();
  el_b.update();


}
window.onload = animate;
