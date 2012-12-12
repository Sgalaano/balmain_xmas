ig.module(
    'game.entities.giftbag'
)
    .requires(
    'game.entities.collectable',
    'impact.entity'
)
    .defines(function () {

        EntityGiftbag = EntityCollectable.extend({

        sfx: new ig.Sound('media/sfx/CASH.mp3'),

        check: function (other) {
            this.sfx.play();
            this.kill();
            ig.game.collectedGiftBags.push(this);
            console.log(ig.game.collectedGiftBags);
        }

    });
});