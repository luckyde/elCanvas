function setup_manual() {
	var canvas = document.getElementById('elCanvas_board_clicker');
	var el = new elCanvas(canvas, {images:[],AlignToCenter:true});


	var flameSize = 64;
	var particles = [];
	var smoke;
	for(var i = 0; i < 180; i++) {
		smoke = el.image({id:"test2", width:flameSize, height:flameSize, y:300, globalCompositeOperation:"lighter",
			radialGradient: {
				size: flameSize,
				inner: "rgba(248,64,32,1)",
				outer: "rgba(128,64,32,0)"
			}
		});
		particles.push( smoke );
	}

	var smokeTL = new TimelineMax({onUpdate:el.update})
	var smoketeTl = [];
	var startRand, endRand;
	for(var i = 0; i < particles.length; i++) {
		startRand = {x:Math.random()*80-40, y:200+Math.random()*5,scale:Math.random()*2};
		endRnd = {velocity:Math.random()*150,angle:-90+Math.random()*20-10};
		smoketeTl[i] = new TimelineMax({repeat:-1})
			.set(particles[i],  {x:startRand.x,y:startRand.y,scale:startRand.scale},0)
			.from(particles[i],0.6,{opacity:0,ease:Sine.easeOut},0)
			.to(particles[i],1,{opacity:0,ease:Sine.easeIn},0.5+Math.random()*0.5)
			.to(particles[i], 2, {physics2D:{velocity:200+endRnd.velocity, angle:endRnd.angle, gravity:00}},0);
		smokeTL.add(smoketeTl[i], i * 0.013);
	}
	window.EL = el;
}
