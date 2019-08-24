function gE(e){ return document.getElementById(e)};

var canvas_container, el;

function setup(){
  // resize canvas to parent width and height, work around so the canvas size doesnt need to be hard typed in html
  canvas_container = document.getElementById('elCanvas');
  canvas_container.width = canvas_container.parentNode.offsetWidth;
  canvas_container.height = canvas_container.parentNode.offsetHeight;
   var imageURLs=[
      {id:'Text_sprite',url:'fonts/font4/Text_sprite.png'} ,



  ]
  var images = el_imageLoad(imageURLs,animate);

};
function animate(props){

  // setup canvas information
  /* create a el_canvas reference, which has the same properties as a canvas
  but allows chaining and has extra properties to help speed up drawing */



  var treeData;

 var oReq = new XMLHttpRequest();
 oReq.onload = reqListener;
 oReq.open("get", "fonts/font4/Text_sprite.json", true);
 oReq.send();

 function reqListener(e) {
     treeData = JSON.parse(this.responseText);
     el = new elCanvas(canvas_container, {images:props,spriteFonts:[treeData],AlignToCenter:false});
     console.log(el);
     var test_tl = new el_animation(el);

 }



  canvas_container.addEventListener('click',function(){ test_tl.play(0);});

}
