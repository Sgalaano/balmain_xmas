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

	init: function() {
		// Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");
        ig.input.bind(ig.KEY.SPACE, "jump");
        ig.input.bind(ig.KEY.UP_ARROW, "jump");

        // Now add the file to the playlist
        ig.music.add( this.bgtune );

        // Ready to Rock!
        ig.music.play();
        ig.music.volume = 0;

        this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
        this.camera.trap.size.x = ig.system.width/10;
        this.camera.trap.size.y = ig.system.height/3;
        this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
        this.loadLevel(LevelRoom3);



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
        //get all the giftbags
        var giftbags = ig.game.getEntitiesByType(EntityGiftbag);

        for(var i = 0; i < this.collectedGiftBags.length; i++) {
            var collectedbag = this.collectedGiftBags[i];
            for(var x = 0; x < giftbags.length; x++) {
                var bag = giftbags[x];
                if(bag.pos.x == collectedbag.pos.x &&  bag.pos.y == collectedbag.pos.y)
                    bag.kill();
            }

        }
        }



        ig.game.sortEntitiesDeferred();
        ig.music.volume = 0.5;
    },


    update: function() {
        this.camera.follow( this.player );
		// Update all entities and backgroundMaps
		this.parent();

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


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 960, 640, 1 );

});
