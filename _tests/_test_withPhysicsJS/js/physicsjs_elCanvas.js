Physics.renderer('elCanvas', function( parent ){

    var defaults = {
        width: 200,
        height: 200,
        fontSize: 4
    };

    return {
        init: function( options ){

            options = Physics.util.extend( defaults, options );
            parent.init.call(this, options);
        },
        render: function(bodies, meta) {

            this._world.emit('beforeRender', {
                renderer: this,
                bodies: bodies
            });
            this.drawScene( bodies );
        },


        drawScene: function( bodies ){
            for (var i = 0, l = bodies.length; i < l; i++) {
              // console.log(bodies[i].state.angular.pos ); 
              bodies[i].el_obj.x = bodies[i].state.pos.x;
              bodies[i].el_obj.y = bodies[i].state.pos.y;
                bodies[i].el_obj.rotation = bodies[i].state.angular.pos ;
            }
        }
    };
});
