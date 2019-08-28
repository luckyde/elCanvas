function el_util_custom_shapes(el){
  // custom shapes
    el.customShapes.starShape =   function(){
        el.ctx.beginPath()
        .moveTo(0,17).lineTo(17,15).lineTo(24,0).lineTo(31,15).lineTo(48,17).lineTo(36,29).lineTo(39,45).lineTo(24,37).lineTo(9,45).lineTo(12,29).lineTo(1,17)
        .closePath()
    }
  
    el.customShapes.banner_50 =   function(){
      el.ctx.beginPath()
      .moveTo(0,36).quadraticCurveTo(145,0, 295,  38).lineTo(273,99).quadraticCurveTo(145, 71, 22, 96)
      .closePath();
    }


}
