ig.module(
    'game.entities.player'
)
    .requires(
    'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

    size: {x: 64, y: 128},

    animSheet: new ig.AnimationSheet('media/player_sprite.png' , 64, 128),

    maxVel: {x: 200, y: 400},
    friction: {x: 600, y: 0},
    accelGround: 250,
    accelAir:150,
    jump: 350,
    flip: false,

    type: ig.Entity.TYPE.A, // Player friendly group
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,


    init: function(x, y, settings){
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [8]);
        this.addAnim('jump', 1, [6]);
        this.addAnim('fall', 1, [7]);
        this.addAnim('walk', 0.1, [0,1,2,3,4,5,6,7]);
        this.currentAnim = this.anims.idle;
    },

    update: function() {

        // move left or right
        var accel = this.standing ? this.accelGround : this.accelAir;
        if( ig.input.state('left') ) {
            //this.accel.x = -accel;
            this.vel.x = -accel;
            this.flip = true;
        }
        else if( ig.input.state('right') ) {
            //this.accel.x = accel;
            this.vel.x = accel;
            this.flip = false;
        }
        else {
            this.vel.x = 0;
        }
        // jump
        if( this.standing && ig.input.pressed('jump') ) {
            this.vel.y = -this.jump;
            console.log(this.vel.y);
        }
        // move!

// set the current animation, based on the player's speed
        if( this.vel.y < 0 ) {
            this.currentAnim = this.anims.jump;
        }
        else if( this.vel.y > 0 ) {
            this.currentAnim = this.anims.fall;
        }
        else if( this.vel.x != 0 ) {
            this.currentAnim = this.anims.walk;
        }
        else {
            this.currentAnim = this.anims.idle;
        }

        this.currentAnim.flip.x = this.flip;

        this.parent();

    }

});

});