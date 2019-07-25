// Put this file in Program Files\Adobe\Photoshop\Presets\Scripts\
// In PhotoShop menu File > Automate > Scripts: layersToSprite.js

// Arrange layers into a sprite sheet. 

if (documents.length > 0) 
{
	
	// --------------------------
	docRef = activeDocument;    
	var activeLayer = docRef.activeLayer;

	numLayers = docRef.artLayers.length; 	
	var cols = docRef.width;
	
 	var spriteX = docRef.width;
 	
	// put things in order
	app.preferences.rulerUnits = Units.PIXELS;
	
	// resize the canvas
 	newX = numLayers * spriteX;
 	
 	docRef.resizeCanvas( newX, docRef.height, AnchorPosition.TOPLEFT );
 	 	
	// move the layers around
 	for (i=0; i < numLayers; i++)
 	{ 	
 		docRef.artLayers[i].visible = 1;
 		
  		var movX = spriteX*i;
  		
 		docRef.artLayers[i].translate(movX, 0);
 		
  	}
}	
