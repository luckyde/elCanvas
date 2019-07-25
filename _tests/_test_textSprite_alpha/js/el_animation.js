function el_animation(el){

  var rect3 = new el.rect({id:'moveable',style:{fillStyle:"red"}})
  var deleteme = new el.rect({y:100,style:{fillStyle:"blue"}})
  var deletemeChild = new el.rect({scale:.50,parent:deleteme,style:{fillStyle:"orange"}})

  var test = new el.textSprite({font:'Text_sprite',	text:'BADASS',
  x:88,width:600,	y:33,letterSpacing:0,lineHeight:1,align:'center',scale:0.4 })

    var test2 = new el.textSprite({font:'Text_sprite',	text:'COWBOYS',
      x:88,  y:300,  letterSpacing:-10,  lineHeight:1,scale:1 })

  var bot_message_tl= new TimelineMax({onUpdate:el.update})
    // .to(test,2,{x:500,ease:Sine.easeInOut,repeat:-1,yoyo:true},0.2)
    // .staggerFrom(test.letters,1,{scale:0,ease:Elastic.easeOut.config(0.4,0.3)},0.2,0)
    // .staggerTo(test.letters,1,{transformOrigin:"54% 20%",scale:1.6,ease:Sine.easeOut,repeat:-1,yoyo:true},0.2,1.2)
    // .staggerTo(test2.letters,1,{y:100,ease:Back.easeOut,repeat:-1,yoyo:true},0.2,0)


  return bot_message_tl;
}
