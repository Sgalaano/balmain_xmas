ig.module(
    'game.entities.giftbag'
)
    .requires(
    'game.entities.collectable',
    'impact.entity'
)
    .defines(function () {

        EntityGiftbag = EntityCollectable.extend({

       // sfx: new ig.Sound('media/sounds/collect.*'),

        check: function (other) {
            //this.sfx.play();
            this.kill();
        }

    });
});