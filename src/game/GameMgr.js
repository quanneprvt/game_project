const GameOne           = require('./GameOne');

class GameMgr extends PIXI.Application
{
    constructor()
    {
        super();
        this.width = 1000;
        this.height = 600;
        this.renderer.resize(this.width, this.height);
        this.loader
            .add('bunny','assets/bunny.png')
            .add('button', 'assets/button.png')
            .add('MainFont', 'font/RobotoCondensed.ttf')
            .load((load, resources) => {
                global.Resources = resources;
                this.Init();
            })
        this.Game = [];
    }

    Init()
    {
        this.Game.push(GameOne);
        for (let i = 0; i< this.Game.length; i++)
        {
            this.Game[i].Init();
            this.stage.addChild(this.Game[i]);
        }

        // Listen for frame updates
        this.ticker.add(() => {
            let deltaTime = this.ticker.elapsedMS/1000;
            // each frame we spin the bunny around a bit
            this.Update(deltaTime);
        });

        // this.stage.interactive = true;
        // this.stage.hitArea = new PIXI.Rectangle(0,0,1000,600);
        // this.stage.on('pointerdown', this.TouchHandler.bind(this));
        // this.stage.on('pointerup', this.TouchHandler.bind(this));
    }

    Update(dt)
    {
        for (let i = 0; i< this.Game.length; i++)
        {
            this.Game[i].Update(dt);
        }
    }

    GetWidth()
    {
        return this.width;
    }

    GetHeight()
    {
        return this.height;
    }

    IsLandscape()
    {
        return this.height/this.width > 1;
    }
}

module.exports = new GameMgr();