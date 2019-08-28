function el_animation(el, params){

  var imageURLs={
  background: 'images/background.jpg',
  arm_lower_l: 'images/sb/arm_lower_l.png',
  arm_r: 'images/sb/arm_r.png',
  arm_upper_l: 'images/sb/arm_upper_l.png',
  belt: 'images/sb/belt.png',
  brow_l: 'images/sb/brow_l.png',
  cuffs: 'images/sb/cuffs.png',
  eye_l: 'images/sb/eye_l.png',
  eye_r: 'images/sb/eye_r.png',
  glasses_l: 'images/sb/glasses_l.png',
  glasses_r: 'images/sb/glasses_r.png',
  hand_l: 'images/sb/hand_l.png',
  hand_r: 'images/sb/hand_r.png',
  head: 'images/sb/head.png',
  jacket: 'images/sb/jacket.png',
  mouth: 'images/sb/mouth.png',
  mustache: 'images/sb/mustache.png',
  nose: 'images/sb/nose.png',
  tie: 'images/sb/tie.png'
  }
  el.importImages(imageURLs)
  // var bg= el.image({id:'background'})
  var bodyNull= el.rect({x:80,y:220,width:140,height:140,transformOrigin:"50% 100%",style:{fillStyle:"rgba(0,0,0,0)"}})

  var jacket = el.image({id:'jacket',zIndex:3,parent:bodyNull,transformOrigin:"50% 80%"})

  var belt = el.image({x:23,y:-3,zIndex:-1,id:'belt',parent:jacket})
  var cuffs = el.image({x:13,y:6,zIndex:2,id:'cuffs',parent:jacket})
  var tie = el.image({x:28,y:3,zIndex:5,id:'tie',parent:jacket})

  var head = el.image({zIndex:3,id:'head',x:-47,y:-195,parent:jacket,transformOrigin:"50% 80%"})
  var mouth = el.image({x:93,y:162,id:'mouth',parent:head})
      ,mustache = el.image({x:74,y:149,id:'mustache',parent:head})
      ,brow_l = el.image({x:33,y:85,id:'brow_l',parent:head})
      ,eye_r = el.image({x:152,y:132,id:'eye_r',parent:head})
      ,eye_l = el.image({x:72,y:134,id:'eye_l',parent:head})
      ,glasses_r = el.image({x:137,y:106,id:'glasses_r',parent:head})
      ,nose = el.image({x:95,y:122,id:'nose',parent:head})
      ,glasses_l = el.image({x:35,y:108,id:'glasses_l',parent:head})

  var arm_upper_l = el.image({x:-40,y:10,zIndex:1,id:'arm_upper_l',parent:jacket,transformOrigin:"98% 9%"})
  var arm_lower_l = el.image({x:-3,y:35,zIndex:2,id:'arm_lower_l',parent:arm_upper_l,transformOrigin:"23% 22%"})
  var hand_l = el.image({x:23,y:39,zIndex:-1,id:'hand_l',parent:arm_lower_l,transformOrigin:"50% 50%"})

  var arm_r = el.image({x:100,y:5,zIndex:0,id:'arm_r',parent:bodyNull,transformOrigin:"0% 34%"})
  var hand_r = el.image({x:48,y:-26,zIndex:2,id:'hand_r',parent:arm_r,transformOrigin:"39% 89%"})

  var bot_message_enter= new TimelineMax({onUpdate:el.update})
  // .from(bodyNull,0.3,{y:"+=50"},0)
  .add('headnod',1.4)

  .add('headnod_right',4.4)
  .from(bodyNull,0.5,{scaleX:2,ease:Elastic.easeOut.config(0.3,0.4)},0)
  .from(bodyNull,1,{scaleY:0,ease:Elastic.easeOut.config(0.6,0.4)},0)
  .from(bodyNull,1.4,{rotation:10,ease:Elastic.easeOut.config(0.5,0.4)},0)
  .from(head,1.4,{rotation:20,ease:Elastic.easeOut.config(0.5,0.4)},0)
  .from(arm_r,2.3,{rotation:60,ease:Elastic.easeOut.config(0.5,0.4)},0)
  // .from(hand_r,2.3,{rotation:-20,ease:Elastic.easeOut.config(0.5,0.4)},0.5)
  .from([brow_l,glasses_r,glasses_l],1.8,{y:"+=20",ease:Elastic.easeOut.config(0.4,0.3)},0)
  .from([mustache,nose],1,{scaleX:0.8,y:"-=10",ease:Back.easeOut},0)
  .from(tie,1,{rotation:60,ease:Expo.easeOut},0)
  .from(arm_upper_l,1,{rotation:-30,ease:Power2.easeOut},0)
  .from(arm_lower_l,1.4,{rotation:50,ease:Power4.easeOut},0.3)
  .from(hand_r,0.6,{rotation:20,ease:Power1.easeInOut,yoyo:true,repeat:8},1.3)
  .to(arm_r,0.5,{rotation:-10,ease:Sine.easeInOut},1.5)

  .to([eye_l,eye_r],0.3,{scaleY:0,ease:Back.easeIn},0+0.6)
  .to([eye_l,eye_r],0.3,{scaleY:1,ease:Back.easeOut},0.34+0.6)

  .to([eye_l,eye_r],0.3,{scaleY:0,ease:Back.easeIn},'headnod+=01.4')
  .to([eye_l,eye_r],0.3,{scaleY:1,ease:Back.easeOut},'headnod+=1.74')

  .to([eye_l,eye_r],0.3,{scaleY:0,ease:Back.easeIn},'headnod+=03.4')
  .to([eye_l,eye_r],0.3,{scaleY:1,ease:Back.easeOut},'headnod+=3.74')
  .to([brow_l,glasses_r,glasses_l,eye_l,eye_r],2,{x:"-=2",ease:Expo.easeInOut},'headnod+=0')

  .to(head,1.8,{x:"-=4",y:"+=4",rotation:-10,ease:Expo.easeInOut},'headnod')
  .to(bodyNull,1.8,{rotation:-4,ease:Expo.easeInOut},'headnod')
  .to(arm_upper_l,1,{rotation:-4,ease:Power2.easeOut},'headnod')
  .to(arm_lower_l,1.4,{rotation:-3,ease:Power4.easeOut},'headnod+=0.3')


  .to([brow_l,glasses_r,glasses_l,eye_l,eye_r],2,{x:"+=4",ease:Expo.easeInOut},'headnod_right+=0')
  .to([eye_l,eye_r],0.3,{scaleY:0,ease:Back.easeIn},'headnod_right+=01.4')
  .to([eye_l,eye_r],0.3,{scaleY:1,ease:Back.easeOut},'headnod_right+=1.74')

  .to(head,1.8,{x:"+=4",y:"-=4",rotation:0,ease:Expo.easeInOut},'headnod_right')
  .to(bodyNull,1.8,{rotation:0,ease:Expo.easeInOut},'headnod_right')
  .to(arm_upper_l,1,{rotation:0,ease:Expo.easeInOut},'headnod_right')
  .to(arm_lower_l,1.4,{rotation:0,ease:Expo.easeInOut},'headnod_right+=0.3')

  var bot_message_tl= new TimelineMax({onUpdate:el.update,paused:true})

  .add(bot_message_enter,0.1)
  el.ready().then(bot_message_tl.play())

  return bot_message_tl;
}
