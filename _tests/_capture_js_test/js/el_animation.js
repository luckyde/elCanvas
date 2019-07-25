function el_animation(el, params){
  
  var bg= new el.image({id:'background'})
  var tile_bg= new el.image({id:'tile_bg'})
  //

  var tilesPos = [
    {x: 866, y: 272, scale:0.745}
    ,{x: 1076, y: 66, scale:0.5}
    ,{x: 778, y: 178, scale:0.5},
    {x: 684, y: 36, scale:0.63},
    {x: 1016, y: 188,  scale:0.5},
    {x: 590, y: 168,  scale:0.75},
    {x: 926, y: 166, scale:0.8},
    {x: 808, y: 98, scale:0.5},
    {x: 848, y: 58, scale:1},
    {x: 1120, y: 130,  scale:0.3},
    {x:710, y: 258,  scale:0.45}
  ]
  var tileCount=tilesPos.length;
  var tiles=[];
  for(var i=0;i<tilesPos.length;i++){
    var offset= {x:0,y:0}
    var tile =  new makeTile(el,{x:tilesPos[i].x+offset.x,y:tilesPos[i].y+offset.y,scale_tl:tilesPos[i].scale})
    var tile2 =  new makeTile(el,{x:tilesPos[i].x+offset.x+Math.random()*50-100,y:tilesPos[i].y+offset.y+Math.random()*50-100,scale_tl:tilesPos[i].scale*0.8})
    var tile3 =  new makeTile(el,{x:tilesPos[i].x+offset.x+Math.random()*450-100,y:tilesPos[i].y+offset.y+Math.random()*150-300,scale_tl:tilesPos[i].scale*0.6})
    tiles.push(tile,tile2,tile3)
  }
   var get_ready_pos = {x:366,y:470}
  var txt_just_shadow = new el.text({ x: get_ready_pos.x, y: get_ready_pos.y, text:params.heading,style:{font:"90px museo700",   textAlign:"left", fillStyle:"rgba(0,0,0,0.5)"}})
  var txt_just = new el.text({ x:  get_ready_pos.x-5, y: get_ready_pos.y-5, text:params.heading,style:{font:"90px museo700",   textAlign:"left", fillStyle:"white"}})

  var user_picture= new el.image({x:42,y:204,id:'user_l',rounded:90 ,scale:1,style:{lineWidth:9,strokeStyle:"#ffffff"}})

  var smileys = [new el.image({x: 936, y: 470,id:'right_img_1'}), new el.image({x: 1116, y: 372,id:'right_img_3'}), new el.image({x: 1042, y: 436,id:'right_img_2'})]

  var elements= [bg,tile_bg]

  var tile_tls=[]
  for(var y=0;y<tileCount*3;y++){
    var tileLoop= new TimelineMax({repeat:-1})
      var rand = y*0.6
      var speed = 2+Math.random();
      var t = tiles[y];
      var randX=Math.random()*240
      tileLoop
      .from(t,speed,{x:"-="+randX,y:"+=350",ease:Sine.easeIn},0+rand )
      .from(t,speed*.8,{opacity:0,ease:Power3.easeIn},0+rand )
      .to(t,speed,{x:"+="+randX,y:"-=350",ease:Sine.easeOut} ,speed+rand )
      .to(t,speed*1.4,{opacity:0,ease:Sine.easeOut} ,speed+rand )
      tile_tls.push(tileLoop)
  }


  // .to(tile,3,{scale_tl:1,yoyo:true,repeat:-1})

  var bot_message_tl= new TimelineMax()
  .from(tile_bg,1,{y:-400,ease:Power2.easeOut},0)
  .from(user_picture,0.7,{y:570,ease:Back.easeOut.config(1.2)},0.3)
  .staggerFrom([txt_just,txt_just_shadow],1,{y:"+=600",ease:Back.easeOut.config(0.5)},0.02,0.1)
  .staggerFrom(smileys,1,{x:"+=30",y:"+=200",ease:Elastic.easeOut.config(0.5,0.3)},0.2,0)
  .add(tile_tls,-1)
  return bot_message_tl;
}

function makeTile(el,props){
  var tiles = [],
      tilePos = {x:props.x,y:props.y},
      letters_txt = '?',
      letters_numb = Math.round(Math.random()*4);
    var fam = '"Helvetica Neue",Helvetica,sans-serif';
    var size = props.scale_tl;
    var letterPx = 140;
    var scorePx = 46;
        // var tile = new el.image({id:'tile',x: tilePos.x, scale_tl:3,y: tilePos.y,width:200*size,height:198*size})
        var tile = new el.image({id:'tile',x: tilePos.x, scale_tl:props.scale_tl,y: tilePos.y,width:200 ,height:198 })
        var tile_text = new el.text({text:letters_txt,x: tilePos.x+100*size, y: tilePos.y +150*size , scale:size, style:{font:"bold " + letterPx + "px " + fam,  textAlign:"center",   fillStyle:"#39180B"}})
         var tile_text_score = new el.text({text:letters_numb,x: tilePos.x+180*size, y: tilePos.y+50*size, scale:size ,style:{font:"" + scorePx + "px " + fam, textAlign:"right",  fillStyle:"#39180B"}})
        return [tile,tile_text,tile_text_score]


}
