/*
 This entity calls ig.game.loadLevel() when its triggeredBy() method is called -
 usually through an EntityTrigger entity.


 Keys for Weltmeister:

 level
 Name of the level to load. E.g. "LevelTest1" or just "test1" will load the
 'LevelTest1' level.
 */

ig.module(
    'game.entities.exit'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityExit = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0, 0, 255, 0.7)',

            size: {x: 128, y: 164},
            displayTimer: null,
            message: null,
            animSheet: new ig.AnimationSheet( 'media/exit.png', 64, 128 ),
            init: function(x,y,settings) {

                this.parent(x,y,settings);
                this.displayTimer = new ig.Timer();

            },

            triggeredBy: function( entity, trigger ) {

                if(ig.game.collectedGiftBags) {


                    var completed = ig.game.collectedGiftBags.length;
                    if (completed > 10) {
                        this.message = "Well Done.";
                    } else {
                        this.message = "You can't finish yet. You've only collected " + completed + " of your gifts.";
                    }


                } else {
                    this.message = "you can't finish yet";
                }
                $("#message2").text(this.message).show();
                this.displayTimer.set(2);

            },

            update: function(){
                if(this.displayTimer.delta() >= 0) {
                    $("#message2").hide();
                }
            }
        });

    });