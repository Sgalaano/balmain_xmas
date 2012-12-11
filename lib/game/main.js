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
    gravity: 500,
    camera: null,
    spawnPointName: 'door_A',

	init: function() {
		// Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");
        ig.input.bind(ig.KEY.SPACE, "jump");
        ig.input.bind(ig.KEY.UP_ARROW, "jump");

        this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
        this.camera.trap.size.x = ig.system.width/10;
        this.camera.trap.size.y = ig.system.height/3;
        this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
        this.loadLevel(LevelRoom1);


	},
    loadLevel: function( level ) {
        this.parent( level );
        var spawnPoint = ig.game.getEntityByName(this.spawnPointName);
        if(spawnPoint) {
            ig.game.spawnEntity(EntityPlayer, spawnPoint.pos.x,spawnPoint.pos.y);
        }
        this.setupCamera();
        ig.game.sortEntitiesDeferred();

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
