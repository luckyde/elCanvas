function el_animation(el, params){
  var rows=10,columns = 10;
  var buttonScale = 0.8;
  var smallestSize = el.width<el.height ? el.width: el.height;
  console.log(smallestSize);
  var buttonSize = {interactable:true,width:smallestSize/columns,height:smallestSize/rows,scale:buttonScale,radius:10};

  var buttonStyles={
    off:"#252420",
    on:"#f2f2f2"
  }

  var currentY=0
  var objects2d=[]
  var soundFiles = [];
  //create boxes and audio
  for(var r=0;r<rows;r++){
    currentY=r*buttonSize.height
    objects2d[r]=[]
    for (var c = 0; c < columns; c++) {
      if(r==0){
          soundFiles.push([])

      }
      soundFiles[r][c] = new Howl({
       src: ['audio/'+r+'/'+c+'.wav']
     });
      var button = new el.rect(buttonSize)
      button.x = c*buttonSize.width
      button.y = currentY
      button.id=r+"_"+c;
      button.style.fillStyle=buttonStyles.off;
      button.on=false;
      button.row=r;
      button.column = c;
      objects2d[r][c]=button;

    }

  }

  var purpleGradient = el.ctx.createLinearGradient(0,0,el.width*0.04,0);
  purpleGradient.addColorStop(0, 'rgba(214,214,214,0)');
  purpleGradient.addColorStop(0.4, 'rgba(142,153,142,0.8)');
  purpleGradient.addColorStop(1, 'rgba(214,214,214,0)');
    var lineVertical = new el.rect({style:{fillStyle:purpleGradient},globalCompositeOperation:'xor',width:el.width*0.04,height:el.height})

  var bot_message_tl= new TimelineMax({onUpdate:el.update})
  markBox = function(e){
    // console.log('click clack',e);
    el.hitTest({x:e.canvasX,y:e.canvasY,width:50,height:50},objectHit)
    // TweenMax.to(redRectangle,0.5,{x:e.canvasX-redRectangle.width/2,y:e.canvasY-redRectangle.height/2,onUpdate:el.update})
  }

  function objectHit(object){

      if(object.on){
          object.on=false;

          object.style.fillStyle=buttonStyles.off;
      }else if(!object.on){
        object.on=true;
        object.style.fillStyle=buttonStyles.on;

      }
      TweenMax.fromTo(object,0.5,{scale:buttonScale*0.8},{scale:buttonScale,onUpdate:el.update,ease:Elastic.easeOut.config(0.4,0.3)})

  }

  //interactive
  el.addEventListener('click',markBox)
  var masterTL;

  function spaceTrigger(){

    function playSound(i){
      var pos=fakeControl.position;
      /*loop trough the currently active row (up down) and if theres an active sound play it
      also animate in a button, also animate out any button that doesnt belong to that row*/
      for(var row=0;row<rows;row++){
        if(row!=pos){
          TweenMax.to(objects2d[row],0.3,{scale:buttonScale,ease:Power3.easeOut})

        }
        if(objects2d[row][pos].on){
          var sound  = soundFiles[row][[pos]];
          sound.play()
          TweenMax.to(objects2d[row][pos],0.5,{scale:buttonScale*1.2,ease:Elastic.easeOut.config(0.4,0.2)})

        }
      }
    }
    // if theres a master already kill it
    if(masterTL){
      masterTL.kill()
    }
    masterTL = new TimelineMax({repeat:-1,onUpdate:el.update})

    // with a fake controler you can link i to the position
    var fakeControl={position:0}
    var speed=5;
    masterTL.timeScale(speed)
    for(var i=0;i<columns;i++){
      masterTL.set(fakeControl,{position:i},i)
              .add(playSound,i)
    }

      masterTL.fromTo(lineVertical,columns,{x:0},{x:el.width,ease:Linear.easeNone},0)

  }
  document.getElementById('play').addEventListener('click',spaceTrigger);
  document.getElementById('stop').addEventListener('click',function(){
    masterTL.seek(0).pause()
    el.update()
  });

}
