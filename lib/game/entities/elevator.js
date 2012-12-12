/*
Simple Mover that visits all its targets in an ordered fashion. You can use
the void entities (or any other) as targets.


Keys for Weltmeister:

speed
	Traveling speed of the mover in pixels per second.
	Default: 20
	
target.1, target.2 ... target.n
	Names of the entities to visit.
*/

ig.module(
	'game.entities.elevator'
)
.requires(
	'impact.entity',
    'game.entities.mover'
)
.defines(function(){
	
EntityElevator = EntityMover.extend({
	size: {x: 186, y: 32},
    offset: {x: 2, y: 192},
	zIndex: 100,
	speed: 100,
    roofTargets: {},
    roofDif: 186,
	animSheet: new ig.AnimationSheet( 'media/elevator.png', 192, 256 ),
    tune: new ig.Sound( 'media/sfx/ipanema.*', false ),


    init: function( x, y, settings ) {

		this.parent( x, y, settings );
        //this.tune.play();
	}



});
        EntityElevatorRoof = EntityMover.extend({
            size: {x: 186, y: 8},
            offset: {x: 2, y: 0},
            zIndex: 100,
            speed: 100,
            parentObjectName: null,

            //animSheet: new ig.AnimationSheet( 'media/elevator.png', 192, 256 ),
            init: function( x, y, settings ) {
               this.parent( x , y, settings );


            }



        });



});