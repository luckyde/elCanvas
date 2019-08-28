function el_animation(el){

  var test = el.textSprite({font:'Text_sprite',	text:'BADASS ASS', x:88,width:600,	y:33,letterSpacing:0,lineHeight:1,align:'right',scale:0.4, "null": false, style: {strokeStyle:"black", lineWidth: 2, fillStyle: false} })

	var test2 = el.textSprite({font:'Text_sprite',	text:'COWBOYS', x:88,  y:300,  letterSpacing:-10,  lineHeight:1,scale:1, "null": false, style: {fillStyle:"orange"} })

	var test3 = el.textSprite({font: 'Text_sprite', text: 'IS THIS\nCENTERED?', x:100, y:100, width: 800, height: 100, align: 'center', lineHeight: 1.1, scale: 0.5, "null": false, style: {fillStyle:"#88ff88"} });

  var bot_message_tl= new TimelineMax({onUpdate:el.update})
 

  return bot_message_tl;
}
