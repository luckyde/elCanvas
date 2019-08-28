function el_animation(el, params){
  var make= function(e){
    return Object.assign({}, e);
  }
    var stageSize = {w:el.width,h:el.height}

  var rectSize = stageSize.w*0.005
  var styling = {fillStyle:"#ffffff"}
  var rectangle = {width:rectSize,height:rectSize,xid:'staticable',style:styling};



  var objAmount= 400;
  var objects = []
  var test_tls = new TimelineMax()
  var moveTweens=[]
  for(var i=0;i<objAmount;i++){
    var rect = el.rect(rectangle)
    rect.x = Math.random()*stageSize.w
    rect.width=Math.random()*rectSize+rectSize
    rect.height=Math.random()*rectSize*1+rectSize

      rect.scale=Math.random()*5+1
    objects.push(rect )
    var locY = [
      -stageSize.h*0.2, stageSize.h
    ]
    var randY = locY[Math.floor(Math.random()*locY.length)]

    var test_tl = new TimelineMax({repeat:-1})
    .set(rect,{y:randY},0)
    .from(rect,3,{rotation:Math.random()*600 - 300,ease:Sine.easeIn},0)
    .from(rect,1,{scale:0,ease:Elastic.easeOut.config(0.6,0.4),repeat:1,yoyo:true},1)

var moveTween =     TweenMax.to(rect,3,{y:stageSize.h*1.2,ease:Quad.easeIn},0)
  test_tl.add(moveTween,0)
  moveTweens.push(moveTween)
    test_tls.add(test_tl,Math.random()*(objAmount*0.01))
  }
  // var text = el.text({y:100,x:200,zIndex:4,text:'sdfkfsd',style:{ fillStyle:"#ff0000",font:"63px museo500"}})

  // var head = el.image({id:'head',x:180,y:70,transformOrigin:"50% 90%"})
  // var nose = el.image({id:'nose',x:150,y:200,scale:1,parent:head,transformOrigin:"50% 50%"})

  //
  // var circ = el.circle()
  // var rect = el.rect({id:'rect',parent:circ})
  // var rect2 = el.rect({id:'rect2',parent:circ})
// nose.rotation=90;
  var bot_message_tl= new TimelineMax({onUpdate:el.update})
  .add(test_tls,0)
  // .to(objects,1,{scale:10},0)
  // .to(rect.style,1,{fillStyle:"red"},0)
  // .to(rect,1,{radius:20,ease:Linear.easeNone},0)
    // .to(nose,0.3,{y:40,ease:Back.easeOut,repeat:-1,yoyo:true},0)



    canvas_container.addEventListener('mousemove',function(e){
      for(var i=0;i<moveTweens.length;i++){

          moveTweens[i].seek(0)
        moveTweens[i].updateTo({x:e.clientX,y:e.clientY})
      }
  });


  return bot_message_tl;




}
