function el_animation(el, params){

  //input
  var imageURLs=[
    {id:'h2',url:'images/heading_2.png'}  ,
    {id:'h3',url:'images/heading_3.png'}  ,
    {id:'h4',url:'images/heading_4.png'}  ,
    {id:'s1',url:'images/subheading_1.png'}  ,
    {id:'s2',url:'images/subheading_2.png'}  ,
    {id:'s3',url:'images/subheading_3.png'}  ,
    {id:'s4',url:'images/subheading_4.png'}  ,
    {id:'s5',url:'images/subheading_5.png'}  ,
    {id:'s6',url:'images/subheading_6.png'}
  ]
  //import
  el.importImages(imageURLs);
  //draw
// gradients
var center={x:el.width/2,y:el.height/2}
// console.log(imageURLs);
var strokeGrd = el.ctx.createLinearGradient(0,200,100,300);
    strokeGrd.addColorStop(0, '#1A0A7E');
    strokeGrd.addColorStop(1, '#A737A1');
    var x = 140,
        y = 140,
        innerRadius = 5,
        outerRadius = 170,
        radius = 290;
    var radGrd = el.ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
        radGrd.addColorStop(0, 'rgba(0,8,182,0)');
        radGrd.addColorStop(1, 'rgba(0,3,187,0.75)');

  // CREATION
  var outer_blue_big= el.rect({width:411,height:411,x:45,y:45,radius:75,opacity:0.75,style:{fillStyle:"#93E2F9"}})
  var outer_blue_medium= el.rect({width:380,height:380,x:60,y:60,radius:75,opacity:0.7,style:{fillStyle:"#2DB3E8"}})
  var outer_blue_small= el.rect({width:335,height:335,x:82.5,y:82.5,radius:50, style:{fillStyle:"#018FD9"}})

  var tiled_sh_big= el.rect({width:345,height:345,x:77,y:77,rotation:45,radius:50,opacity:0.5,style:{fillStyle:"#3741B7"}})
  var tiled_sh_big_stroke= el.rect({x:75,y:75,width:350,height:350,radius:50,rotation:45,style:{lineWidth:3.5,strokeStyle:strokeGrd,fillStyle:'rgba(0,0,0,0)'}})

  var tiled_sh_medium= el.rect({width:291,height:291,x:104.5,y:104.5,radius:50,rotation:45,style:{fillStyle:radGrd}})
  var tiled_sh_small= el.rect({width:199,height:199,x:150,y:150,radius:40,rotation:45,style:{fillStyle:'#032A8C'}})
  var outer= [outer_blue_big,outer_blue_medium,outer_blue_small];
  var inner= [tiled_sh_big,tiled_sh_big_stroke,tiled_sh_medium,tiled_sh_small];
  var heading = [
    el.image({url:'images/heading_1.png',x:16,y:149,zIndex:25,transformOrigin:"50% 50%"}),
    el.image({id:'h2',x:175,y:157,zIndex:24,transformOrigin:"45% 40%"}),
    el.image({id:'h3',x:278,y:152 ,zIndex:23,transformOrigin:"50% 50%"}),
    el.image({id:'h4',x:374,y:161,zIndex:22,transformOrigin:"30% 50%"}),
  ]

  var subheading = [
    el.image({id:'s1',x:93,y:297,transformOrigin:"50% 98%"}),
    el.image({id:'s2',x:147,y:298,transformOrigin:"50% 98%"}),
    el.image({id:'s3',x:196,y:298,transformOrigin:"50% 98%"}),
    el.image({id:'s4',x:246,y:298,transformOrigin:"50% 98%"}),
    el.image({id:'s5',x:306,y:298,transformOrigin:"50% 98%"}),
    el.image({id:'s6',x:356,y:298,transformOrigin:"50% 98%"}),
  ]

  // function animate(){
    var heading_tl =  new TimelineMax()
      .set(subheading,{scaleX:1,scaleY:1,opacity:1},0)
      .staggerFrom(heading,1,{scaleX:4,scaleY:0.3,ease:Elastic.easeOut.config(0.6,0.2)},0.1,0)
      .staggerFrom(heading,0.9,{y:600,ease:Elastic.easeOut.config(0.5,0.3)},0.1,0.1)
      .staggerFrom(heading,0.02,{opacity:0,ease:Power3.reaseOut},0.1,0.2)

    var easeOut = new TimelineMax()
      .staggerTo([outer,inner],0.8,{scale:0.001,rotation:45,ease:Elastic.easeIn.config(0.4,0.3)},0.1,0)
      .staggerTo([heading,subheading],0.58,{scaleX:0,scaleY:0,y:200,x:250,opacity:0,ease:Elastic.easeIn.config(0.4,0.3)},0.02,0.2)

      var bot_message_tl= new TimelineMax({onUpdate:el.update})
        .staggerFrom(outer,1,{rotation:40,ease:Elastic.easeOut.config(0.5,0.3),scale:0.6,opacity:0},0.1,0)
        .staggerFrom(inner,1,{rotation:90,ease:Elastic.easeOut.config(0.5,0.5),opacity:0},0.1,0.1)
        .add(heading_tl,0.1)
        .staggerFrom(subheading,1,{y:"-=150",scaleX:0,ease:Elastic.easeOut.config(0.5,0.2)},0.05,0.6)
        .add(easeOut,3)

        return bot_message_tl;
  // }
  // el.update()

    // el.onImagesReady(animate);

}
