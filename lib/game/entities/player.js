ig.module(
    'game.entities.player'
)
    .requires(
    'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

    size: {x: 30, y: 110},
    offset: {x: 17, y: 16},

    animSheet: new ig.AnimationSheet('media/player_sprite.png' , 64, 128),

    maxVel: {x: 200, y: 400},
    friction: {x: 600, y: 0},
    accelGround: 250,
    accelAir:100,
    jump: 270,
    flip: false,
    jumps: 0,
    maxJumps: 2,
    falling: false,
    jumping: false,
    walking: false,
    attacking: false,
    slipping: false,
    sticking: false,
    canJump: true,
    type: ig.Entity.TYPE.A, // Player friendly group
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,
    slipTimer: null,

    startPosition: null,
    currentCheckpoint: 'check1',

    sfxJump: new ig.Sound('media/jump.mp3'),
    sfxFall: new ig.Sound('media/sfx/fall.mp3'),

    init: function(x, y, settings){
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [8]);
        this.addAnim('jump', 1, [6]);
        this.addAnim('fall', 1, [7]);
        this.addAnim('kick', 0.08, [9,10,11,10]);
        this.addAnim('walk', 0.08, [0,1,2,3,4,5,6,7]);
        this.addAnim('slipping', 0.08, [0,1,2,3,3,3,3,4,3,3,5,6,3,3,3,7]);
        this.addAnim('stick', 0.08, [0,1,2,2,2,3,4,5,5,5,6,7]);
        this.addAnim('slide', 1, [12]);
        this.currentAnim = this.anims.idle;

        this.startPosition = {x: x, y: y};
        this.slipTimer = new ig.Timer();
    },

    update: function() {

        if(this.slipping) {
            this.canJump = false;
            this.friction = {x: 0, y: 0};
            this.maxVel.x = 400;

        } else if(this.sticking) {
            this.friction = {x: 1200, y: 0};
            this.maxVel.x = 10;
            this.jump = 100;
        }
        else {
            this.canJump = true;
            this.friction = {x: 600, y: 0};
            this.maxVel.x = 200;
            this.jump = 270;
        }

        //are you falling
        this.falling = ((!this.standing) && (this.vel.y > 0));
        this.jumping = ((!this.standing) && (this.vel.y < 0))

        // move left or right
        var accel = this.standing ? this.accelGround : this.accelAir;
        if( ig.input.state('left') ) {
            this.accel.x = -accel;
            this.flip = true;
            if(this.standing)
                this.walking = true;
        }
        else if( ig.input.state('right') ) {
            this.accel.x = accel;
            this.flip = false;
            if(this.standing)
                this.walking = true;
        }
        else {
            this.accel.x = 0;
            this.walking = false;
        }
        if(ig.input.pressed('jump') && this.canJump) {
            if (!this.falling && (this.jumps < this.maxJumps)) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.jump;
                this.jumps++;
                this.jumping = true;
                this.walking = false;
                this.sfxJump.play();
                console.log(this.jumps);
            } else {
                if(this.standing)
                    this.jumps = 0;
            }
        };

        if(ig.input.state('attack')) {
            this.attacking = true;

        } else {
            this.attacking = false;
        }

            if(this.vel.y == 0) {
            this.jumps = 0;
        }





        // move!

// set the current animation, based on the player's speed
        if( this.jumping ) {
            this.currentAnim = this.anims.jump;
        }
        else if( this.falling ) {
            this.currentAnim = this.anims.fall;
        }

        else if (this.attacking) {
            this.currentAnim = this.anims.kick;
        } else if( this.slipping ) {
            if(this.vel.x < 10) {
                this.currentAnim = this.anims.slipping;

            } else {
                this.currentAnim = this.anims.slide;
            }

        } else if (this.sticking) {
            if(this.vel.x == 0) {
                this.currentAnim = this.anims.idle;

            } else {
                this.currentAnim = this.anims.stick;
            }

        }
        else if( this.walking ) {
            this.currentAnim = this.anims.walk;
        }
        else {
            this.currentAnim = this.anims.idle;
            this.anims.kick.rewind();
        }

        this.currentAnim.flip.x = this.flip;

        this.parent();

    },

    receiveDamage: function (amount, from) {


            this.parent(amount,from);

    },

    kill: function(){
        this.parent();
        console.log("your dead");
        var checkpoint = ig.game.getEntityByName(this.currentCheckpoint);
        if(checkpoint)
            ig.game.spawnEntity(EntityPlayer, checkpoint.pos.x,  checkpoint.pos.y);
        else
            ig.game.spawnEntity(EntityPlayer, this.startPosition.x, this.startPosition.y);

        ig.game.setupCamera();
        ig.music.volume = 0.5;
        ig.game.sortEntitiesDeferred();
    }



});

});