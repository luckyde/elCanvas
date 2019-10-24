function el_animation(el, params){
  
  var rect = el.rect({id:'staticable',inactive:true,x:600,y:27,width:600,height:27,zIndex:4,scaleX:1,radius:21,opacity:1,style:{fillStyle:"black"}})
  var rect3 = el.rect({id:'moveable',style:{fillStyle:"red"}})

  var bot_message_tl= new TimelineMax({onUpdate:el.update})
    .to(rect3,10,{x:200}, 0)

  return bot_message_tl;
}
