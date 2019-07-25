Physics.renderer('canvasT', function( parent ){

    var defaults = {
        width: 200,
        height: 200,
        fontSize: 4
    };

    function isInside(pos, body){
        var scratch = Physics.scratchpad()
            ,T = scratch.transform().setRotation(body.state.angular.pos).setTranslation(body.state.pos)
            ,ret = false
            ;

        pos.translateInv(T).rotateInv(T);
        if (body.geometry.name === 'circle'){
            ret = pos.norm() < body.geometry.radius;
        } else {
            throw "unrenderable body type";
        }

        pos.rotate(T).translate(T);
        scratch.done();
        return ret;
    }

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
              bodies[i].el_obj.x = bodies[i].state.pos.x;
              bodies[i].el_obj.y = bodies[i].state.pos.y;
            }
        }
    };
});
