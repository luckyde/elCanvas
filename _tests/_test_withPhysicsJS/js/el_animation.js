function el_animation(el, params){

  var bg= new el.image({id:'background'})

  var bot_message_tl= new TimelineMax({onUpdate:el.update})
  // .to(rect,2,{rotation:11,x:180,scaleX:2},0)
  // .set(sprite,{playing:'on'},1)


  return bot_message_tl;
}
