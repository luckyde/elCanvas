
function el_animation(el, params){
//   var polySynth = new Tone.PolySynth(0.1, Tone.Synth).toMaster();
// polySynth.triggerAttack(['C4'])
// var synth = new Tone.MembraneSynth().toMaster();
// synth.triggerAttackRelease("C2", "8n");
var synth = new Tone.Synth();
synth.oscillator.type = 'sine';
synth.envelope.attack = 0.001;
synth.envelope.sustain = 0.5;
var gain  = new Tone.Gain(0.7);
synth.connect(gain);
gain.toMaster();
var pattern = new Tone.Pattern((t,n) => {
  // noteEl.innerHTML = n
	synth.triggerAttackRelease(n, "8n", t)
}, ["C4", "E4", "G4", "B4"], "upDown")



Tone.Transport.bpm.value = 200
// pattern.start();
//  Tone.Transport.start();
  //VARIABLE DECLARATION
  var   originalHeight = parseInt(gE('view').getAttribute('data-size-h')),
        originalWidth = parseInt(gE('view').getAttribute('data-size-w'));
  var rows=14,columns = 14;
  var buttonScale = 1.03;
  var smallestSize = el.width<el.height ? el.width: el.height;

  var buttonSize = {interactable:true,
    width:el.width/columns,
    height:el.height/rows,
    scaleX:buttonScale,
    scaleY:buttonScale,radius:0};

    var swatches=[
      '#f6f7c6','#94c492','#769075','#9aa081','#f3f0c6','#f2d6be','#efc1ad','#bda5c1',
      '#c3a6c8','#f9dbfb','#c4b2de','#c5c7f4','#afbcc8','#acc8c8','#e6f8fa','#ffffff'
    ]
    // var swatches=[
    // '#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'
    // ]
  var buttonStyles={
    off:"#252420",
    on:"#ffffff"
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
      var track = 0;
      if(r==2 || r==3){
        track=c;
      }
      soundFiles[r][c] = new Howl({
       src: ['audio/'+r+'/'+track+'.mp3']
     });
     var button = new el.rect(buttonSize)
     var img = new el.image({id:r,opacity:0.2,width:button.width,height:button.width,scale:0.6,parent:button})
     button.img  =img;
      // button.childNodes=[img];
      button.id=r+"_"+c;
      button.style.fillStyle=swatches[r];

      button.on=false;
      button.row=r;
      button.column = c;
      objects2d[r][c]=button;

    }

  }
  var purpleGradient = el.ctx.createLinearGradient(0,0,el.width*0.04,0);
  purpleGradient.addColorStop(0, 'rgba(255,255,255,0)');
  purpleGradient.addColorStop(0.2, 'rgba(255,255,255,0.48)');
  purpleGradient.addColorStop(0.4, 'rgba(255,255,255,1)');
  purpleGradient.addColorStop(0.7, 'rgba(255,255,255,1)');
  purpleGradient.addColorStop(1, 'rgba(255,255,255,0)');
    var lineVertical = new el.rect({style:{fillStyle:purpleGradient}, width:el.width*0.15,height:el.height})


  var alighButtonsAndText = function(){
  var body={w:document.body.offsetWidth,h:document.body.offsetHeight}
  var canvas={w:canvas_container.offsetWidth,h:canvas_container.offsetHeight}
  var textMultiplier;
    var heightDifference = Math.abs(body.h/canvas.h),
        widthDifference = Math.abs(body.w/canvas.w)

  heightDifference>widthDifference?  textMultiplier= body.w/originalWidth: textMultiplier = body.h/originalHeight;
    document.querySelectorAll('.fs').forEach(function(f){
      f.style.fontSize =  f.getAttribute('data-fs')*textMultiplier+"px";
    });

    buttonSize.width = el.width/columns;
    buttonSize.height = el.height/rows;
    lineVertical.width=el.width*0.15
    lineVertical.height=el.height

    for(var r=0;r<rows;r++){
      currentY=r*buttonSize.height;
      for (var c = 0; c < columns; c++) {
        var button = objects2d[r][c];
        button.x = c*buttonSize.width;
        button.y = currentY;
        button.width =  buttonSize.width
        button.height = buttonSize.height
          var smallestSize = button.width<button.height ? button.width: button.height;
        button.img.width = smallestSize
        button.img.height = smallestSize
        button.img.x =   (button.width -   button.img.height)/2
        button.img.y =   (button.height -   button.img.width)/2
      }
    }
  }
  alighButtonsAndText()
  //align the items based off canvas size
  el.addResizeListener(alighButtonsAndText)
  //resize checker

  //check if you've entered with a custom song hash
  var premade_song = window.location.hash.substr(1);
  var premadeRC=[[],[]]
  if(premade_song){
    //premade song is onn
    premade_song = premade_song.split(',').map(function(item,index) {

      // index of 0 is reserved for speed
      if(index==0){
        currentPercent=Number(item);
        speedBar.style.width = currentPercent*100+"%"
      }else{
        var even = index % 2 === 0  ;
        if(even){
          premadeRC[0].push(Number(item))
        }else{
          premadeRC[1].push(Number(item))
        }
      }
    });
    // THIS IS REALLY NOT OPTIMAL BUT IM NOT GOOD AT .MAP, HALP
    for(var i=0;i<premadeRC[0].length;i++){
      var c = premadeRC[0][i],r = premadeRC[1][i]
      objects2d[r][c].style.fillStyle=buttonStyles.on;
      objects2d[r][c].img.opacity=1
      // console.log(objects2d[r][c].childNodes[0]);
      // console.log(r,c);
      objects2d[r][c].on=true;

    }
    //get rid of speed
    premade_song.shift()

  }


  var bot_message_tl= new TimelineMax({onUpdate:el.update})
  markBox = function(e){
    el.hitTest({x:e.canvasX,y:e.canvasY,width:50,height:50},objectHit)
   }

  function objectHit(object){
    var objectHitTL = new TimelineMax({onUpdate:el.update})

    // GET YOUR NEIGHBOURS FOR REFERENCE
    var pos={x: object.column,y: object.row}
    var neighbours = [
    objects2d[pos.y+1]? objects2d[pos.y+1][pos.x] :null,
     objects2d[pos.y-1]? objects2d[pos.y-1][pos.x] :null,
     objects2d[pos.y][pos.x+1],
       objects2d[pos.y][pos.x-1],
    ]
    var newFillStyle;
      if(object.on){
        //DISABLE
          object.on=false;
          objectHitTL.fromTo(object.childNodes[0],0.3,{opacity:1},{opacity:0.2,ease:Power3.easeOut},0)
          // .fromTo(object.childNodes[0],0.5,{scale:buttonScale*0.6,},{scale:buttonScale*0.4,ease:Back.easeOut},0)

           newFillStyle = swatches[object.row]
           // get top bottom left right neighbours
           for(var i=0;i<4;i++){
             // if the neighbour exists(edge tile)
             if(neighbours[i]){
               //resets the neighbours position
               neighbours[i].x=neighbours[i].column*buttonSize.width
               neighbours[i].y=neighbours[i].row*buttonSize.height
               neighbours[i].rotation= 0
               // only the non highlighted ones
               if(!neighbours[i].on){
                 objectHitTL.to(neighbours[i].img,2,{
                  rotation:0,
                   ease:Back.easeOut},0)
               }
             }
           }
      }else if(!object.on){
        //ENABLE
        object.on=true;
        newFillStyle = buttonStyles.on;
        objectHitTL.fromTo(object.childNodes[0],0.5,{opacity:0.2,},{opacity:1,ease:Power3.easeOut},0)
        .fromTo(object.childNodes[0],0.5,{scale:buttonScale*0.4,},{scale:buttonScale*0.6,ease:Back.easeOut},0)
        // get top bottom left right neighbours
        for(var i=0;i<4;i++){
          // if the neighbour exists(edge tile)
          if(neighbours[i]){
            //resets the neighbours position
            neighbours[i].x=neighbours[i].column*buttonSize.width
            neighbours[i].y=neighbours[i].row*buttonSize.height
            neighbours[i].rotation= 0
            // only the non highlighted ones
            if(!neighbours[i].on){
              objectHitTL.to(neighbours[i].img,0.5,{
                rotation:"360",
                // scale:buttonScale*0.8,
                ease:Sine.easeOut},0)
            }
            // objectHitTL.from(neighbours[i],0.5,{opacity:0.9,ease:Sine.easeOut},0)
          }
        }

      }
      objectHitTL.scaleX= buttonScale
      objectHitTL.scaleY= buttonScale

      // objectHitTL.fromTo(object,0.5,{rotation:20,},{rotation:0,ease:Back.easeOut},0)
      objectHitTL.to(object.style,0.3,{fillStyle:newFillStyle,ease:Sine.easeOut},0)

      updateText();

  }

// this function makes a hash which updates at the top of the browser
  function updateText(){

    var binaryExport=[currentPercent]
    for(var row=0;row<rows;row++){
      for(var column=0;column<columns;column++){
        // binaryExport.push(objects2d[row][column].on?1:0)
        // binaryExport.push(objects2d[row][column].on?1:
          if(objects2d[row][column].on){

            binaryExport.push(objects2d[row][column].row+','+objects2d[row][column].column)
          }
      }
    }
    window.location.hash= binaryExport;
    return binaryExport;
  }

  //interactive
  el.addEventListener('click',markBox)


  function play(){
    clippy.innerHTML = " >Copy link to clipboard<";

    function playSound(i){
      var pos=fakeControl.position;
      /*loop trough the currently active row (up down) and if theres an active sound play it
      also animate in a button, also animate out any button that doesnt belong to that row*/
      for(var row=0;row<rows;row++){
        if(row!=pos){
          for(c=0;c<objects2d[row].length;c++){
            if(objects2d[row][c].img.scale!=buttonScale*0.6){

              TweenMax.to(objects2d[row][c].img,0.3,{scale:buttonScale*0.6,rotation:0,ease:Back.easeOut})
            }

          }

        }
        if(objects2d[row][pos].on){
          var sound  = soundFiles[row][[pos]];
          sound.play()
          TweenMax.to(objects2d[row][pos].img,0.5,{scale:buttonScale*1.2,rotation:Math.random()*20,ease:Elastic.easeOut.config(0.4,0.2)})

        }
      }
    }
    // if theres a master already kill it
    if(masterTL){
      masterTL.kill()
    }


    // with a fake controler you can link i to the position
    var fakeControl={position:0}

    masterTL.timeScale(currentPercent*8)
    for(var i=0;i<columns;i++){
      masterTL.set(fakeControl,{position:i},i)
              .add(playSound,i)
    }

      masterTL.fromTo(lineVertical,columns,{x:0},{x:el.width,ease:Linear.easeNone},0)

      masterTL.play()

  }
  function stop(){
      masterTL.seek(0).pause();
      el.update();
  }
  function clear(){
    var clearTL  = new TimelineMax({onUpdate:el.update})
      for(var row=0;row<rows;row++){
        for(var col=0;col<columns;col++){
          var object = objects2d[row][col];
          if(object.on){
            object.on=false;

            // object.style.fillStyle=swatches[object.row]
            clearTL.to(object.style,0.3,{fillStyle:swatches[object.row],ease:Sine.easeOut},0)
            clearTL.to(object,0.5,{ scale:buttonScale, ease:Elastic.easeOut.config(0.4,0.3)},0)
            clearTL.to(object.img,0.5,{rotation:0,opacity:0.2, ease:Elastic.easeOut.config(0.4,0.3)},0)

          }
        }

      }
      updateText()

  };
  function changeSpeed(e){
      var l = speedBtn.offsetLeft, w= speedBtn.offsetWidth;
      var mouseLeft = e.touches[0].clientX;
      var percent = (mouseLeft-l)/w;
      speedBar.style.width = percent*100+"%"
      currentPercent= percent.toFixed(2);
      if(masterTL){
        masterTL.timeScale(currentPercent*8)
      }

  };
  function changeVolume(e){
    var l = volumeBtn.offsetLeft, w= volumeBtn.offsetWidth;
    var mouseLeft = e.touches[0].clientX;
    var volumePercent = (mouseLeft-l)/w;
      volumeBar.style.width = volumePercent*100+"%"
      volume= volumePercent.toFixed(2);
     Howler.volume(volume);

  };
  playBtn.addEventListener('click',play);
  stopBtn.addEventListener('click',stop);
  clearBtn.addEventListener('click',clear);


  // scrubber
  speedBtn.addEventListener('touchmove',changeSpeed)
  volumeBtn.addEventListener('touchmove',changeVolume)
  //called so the binary gets updated with the updated speed

  speedBtn.addEventListener('touchend',updateText)
  var clipboard = new ClipboardJS('.copyToClipboard',{
    text: function(trigger) {
      clippy.innerHTML = "Copied to clipboard!"
      var url = window.location.protocol+'//'+window.location.host+window.location.pathname+window.location.hash;
      // console.log(window.location.hash);
        return url;
    }
  });
  clipboard.on('success', function(e) {
      e.clearSelection();

  });

}
