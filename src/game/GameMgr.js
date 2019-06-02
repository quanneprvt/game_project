const GameOne           = require('./GameOne');

class GameMgr extends PIXI.Application
{
    constructor()
    {
        super();
        this.renderer.resize(1000,600);
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

        this.stage.interactive = true;
        this.stage.hitArea = new PIXI.Rectangle(0,0,1000,600);
        this.stage.on('pointerdown', this.TouchHandler.bind(this));
        this.AddButton();
    }

    Update(dt)
    {
        for (let i = 0; i< this.Game.length; i++)
        {
            this.Game[i].Update(dt);
        }
    }

    AddButton()
    {
        this.scaleUpBtn = new PIXI.Sprite(Resources.button.texture);
        this.scaleUpBtn.buttonMode = true;
        this.scaleUpBtn.interactive = true;
        this.scaleUpBtn.on('pointerdown', this.TouchHandler.bind(this))
        let style = {
            fontFamily : 'MainFont', 
            fontSize: 15,
            fill : 0xffffff, 
            align : 'center',
        };
        this.scaleDownBtn = new PIXI.Sprite(Resources.button.texture);
        this.scaleDownBtn.buttonMode = true;
        this.scaleDownBtn.interactive = true;
        this.scaleDownBtn.x += this.scaleUpBtn.width;
        this.scaleDownBtn.on('pointerdown', this.TouchHandler.bind(this));

        this.AddText(this.scaleUpBtn, 'Scale Up', style)
        this.AddText(this.scaleDownBtn, 'Scale Down', style)

        this.stage.addChild(this.scaleUpBtn,this.scaleDownBtn);
    }

    AddText(obj,text,style)
    {
        obj.text = new PIXI.Text(text,style);
        obj.text.anchor.set(0.5,0.5);
        obj.text.x += 0.5*obj.width;
        obj.text.y += 0.5*obj.height;
        obj.addChild(obj.text);
    }

    TouchHandler(e)
    {
        console.log(e.target);
        let scaleDelta = 0.1;
        switch (e.target)
        {
            case this.scaleDownBtn:
                console.log('scale down');
                this.Game[0].sprite.scale.x -= scaleDelta;
                this.Game[0].sprite.scale.y -= scaleDelta;
            break;

            case this.scaleUpBtn:
                this.Game[0].sprite.scale.x += scaleDelta;
                this.Game[0].sprite.scale.y += scaleDelta;
                console.log('scale up');
            break;

            case this.stage:
                console.log('stage');
            break;
        }
    }
}

module.exports = new GameMgr();