class GameOne extends PIXI.Container
{
    constructor()
    {
        super();
    }

    Init()
    {
        console.log('Game One Init');
        this.sprite = new PIXI.Sprite(Resources.bunny.texture);
        this.sprite.anchor.set(0.5,0.5);
        this.addChild(this.sprite);
        this.sprite.position.set(200, 200);
    }

    Update(dt)
    {
        // console.log('Updating ' + dt);
    }
}

module.exports = new GameOne();