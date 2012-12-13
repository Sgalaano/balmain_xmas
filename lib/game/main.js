ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.entities.player',
    'game.levels.main',
    'game.levels.room1',
    'game.levels.room2',
    'game.levels.room3'
    ,'game.levels.room4'
    ,'balmain.camera'
    ,'impact.debug.debug'

)
.defines(function(){

MyGame = ig.Game.extend({

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
    bgtune: new ig.Sound( 'media/sfx/JingleBells.*', false ),

    gravity: 500,
    camera: null,
    spawnPointName: 'door_A',
    collectedGiftBags: [],
    //thumbControl: new Control(),  //THIS WILL INITIALIZE YOUR CONTROL AND ALLOW IT TO BE ACCESSED FOR MOVEMENT

	init: function() {
		// Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");
        ig.input.bind(ig.KEY.SPACE, "jump");
        ig.input.bind(ig.KEY.UP_ARROW, "jump");

        ig.input.bindTouch( '#jump', 'jump' );
        ig.input.bindTouch( '#left', 'left' );
        ig.input.bindTouch( '#right', 'right' );



        // Now add the file to the playlist
        ig.music.add( this.bgtune );

        // Ready to Rock!
        ig.music.play();
        ig.music.volume = 0;

        this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
        this.camera.trap.size.x = ig.system.width/10;
        this.camera.trap.size.y = ig.system.height/3;
        this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
        this.loadLevel(LevelRoom1);



	},
    loadLevel: function( level ) {
        this.parent( level );

        // spawn the player at the correct door
        var spawnPoint = ig.game.getEntityByName(this.spawnPointName);
        if(spawnPoint) {
            ig.game.spawnEntity(EntityPlayer, spawnPoint.pos.x,spawnPoint.pos.y);
        }
        this.setupCamera();


        if(this.collectedGiftBags.length > 0) {
            for(var i = 0; i < this.collectedGiftBags.length; i++) {
                var collectedbag = this.collectedGiftBags[i];
                var bagOnLevel = ig.game.getEntityByName(collectedbag.name);
                if (bagOnLevel)
                    bagOnLevel.kill();

            }
        }

        var Elevators = ig.game.getEntitiesByType(EntityElevator);
        if (Elevators) {
            for(var i = 0; i < Elevators.length; i++) {
                Elevators[i].tune.stop();
            }


        }

        ig.game.sortEntitiesDeferred();
        ig.music.volume = 0.5;


    },


    update: function() {
        this.camera.follow( this.player );
		// Update all entities and backgroundMaps
		this.parent();
        ig.log(ig.music.volume);
		// Add your own, additional update code here
        // screen follows the player
//        var player = this.getEntitiesByType( EntityPlayer )[0];
//        if( player ) {
//            this.screen.x = player.pos.x - ig.system.width/2;
//            this.screen.y = player.pos.y - ig.system.height/2;
//        }
	},

    setupCamera: function() {
        this.player = this.getEntitiesByType( EntityPlayer )[0];

        // Set camera max and reposition trap
        this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
        this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

        this.camera.set( this.player );
    },

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
    }
});

        var ratio = 1.5;
        var gameWidth = $(window).width() > 1152 ? 1152 : $(window).width();
        var gameHeight = gameWidth/ratio > 768 ? 768 :  gameWidth/ratio;

        if( ig.ua.mobile ) {
            // Disable sound for all mobile devices
            ig.Sound.enabled = false;

        }

        if( ig.ua.iPhone4 ) {
            // The iPhone 4 has more pixels - we'll scale the
            // game up by a factor of 4
            gameWidth = $(window).width();
            gameHeight = $(window).height();
            ig.main('#canvas', MyGame, 60, gameWidth, gameHeight, 1);
        }
        else if( ig.ua.mobile ) {
            //gameWidth = $(window).width();
           // gameHeight = $(window).height();
            // All other mobile devices

            ig.main('#canvas', MyGame, 60,  gameWidth, gameHeight, 1);
        }
        else {
            // Desktop browsers
            ig.main('#canvas', MyGame, 60, gameWidth, gameHeight, 1);
            $("#controls").hide();
            window.onresize = function() {
                var gameWidth = $(window).width() > 1152 ? 1152 : $(window).width();
                var gameHeight = gameWidth/ratio > 768 ? 768 :  gameWidth/ratio;



                $("#canvas").height(gameWidth/ratio).width(gameWidth);
                console.log($(window).width() );
            };

        }





});
