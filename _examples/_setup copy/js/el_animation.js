function el_animation(el, params){


  // var bg= new el.image({id:'background'})

  // var spinLine2 = new el.line({x1:0,y1:0,x2:33,y2:33,opacity:1, rotation:0,style:{}})
  // var rect = new el.rect({x:500,y:50,zIndex:4,scaleX:1,radius:20,opacity:0.6,style:{fillStyle:"black"}})
  // var circ = new el.circle({opacity:0.5,parent:rect,style:{fillStyle:"red"}})
  // var circ2 = new el.circle({x:30,opacity:0.9,parent:circ,style:{fillStyle:"blue"}})

  var rect = new el.rect({id:'staticable',inactive:true,x:600,y:27,width:600,height:27,zIndex:4,scaleX:1,radius:21,opacity:1,style:{fillStyle:"black"}})
  // el.update()
  // var circ3 = ne w el.circle({style:{fillStyle:"#ff0000"}})
  var rect3 = new el.rect({id:'moveable',style:{fillStyle:"red"}})
  var deleteme = new el.rect({y:100,style:{fillStyle:"blue"}})
  var deletemeChild = new el.rect({scale:.50,parent:deleteme,style:{fillStyle:"orange"}})
  // var text = new el.text({y:100,x:200,zIndex:4,text:'sdfkfsd',style:{ fillStyle:"#ff0000",font:"63px museo500"}})

  // var head = new el.image({id:'head',x:180,y:70,transformOrigin:"50% 90%"})
  // var nose = new el.image({id:'nose',x:150,y:200,scale:1,parent:head,transformOrigin:"50% 50%"})

  //
  // var circ = new el.circle()
  // var rect = new el.rect({id:'rect',parent:circ})
  // var rect2 = new el.rect({id:'rect2',parent:circ})
// nose.rotation=90;
  var bot_message_tl= new TimelineMax({onUpdate:el.update})
  .to(rect3,10,{x:200}, 0)
  .to(deleteme,10,{y:200},0)
  .add(function(){el.remove(deleteme)},1)
  // .to(rect,1,{radius:20,ease:Linear.easeNone},0)
    // .to(nose,0.3,{y:40,ease:Back.easeOut,repeat:-1,yoyo:true},0)



  return bot_message_tl;
}
