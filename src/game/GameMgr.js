const GameOne           = require('./GameOne');
const GameTwo           = require('./GameTwo');

class GameMgr extends PIXI.Application
{
    constructor()
    {
        let options = {
            antialias: true,
            resolution: 1
        };
        super(options);
        this.width = 1000;
        this.height = 600;
        this.renderer.resize(this.width, this.height);
        //
        this.loader
            .add('bunny','assets/image/bunny.png')
            .add('spriteData', 'assets/json/sprite.json')
            .add('button', 'assets/image/button.png')
            .add('MainFont', 'font/RobotoCondensed.ttf')
            .on('progress', (loader, resource) =>{
                Utils.Log("Loading: " + resource.name);
                Utils.Log("Loading Progress: " + loader.progress + "%");
                Utils.RevokeObjectURL(resource.url);
            })
            .load((loader, resources) => {
                global.Resources = resources;
                this.Init();
            });
        //
        this.Game = [];
        this.gui = [];
        this.gameMenu = new PIXI.Container();
    }

    Init()
    {
        // Listen for frame updates
        this.ticker.add(() => {
            let deltaTime = this.ticker.elapsedMS/1000;
            this.Update(deltaTime);
        });

        this.AddGUI();
        this.gameMenu.position.set(0.5*APP.GetWidth() - 0.5*this.gameMenu.width, 0.5*APP.GetHeight() - 0.5*this.gameMenu.height);
        this.stage.addChild(this.gameMenu);
    }

    Update(dt)
    {
        for (let i = 0; i< this.Game.length; i++)
        {
            if (this.Game[i].isInit)
                this.Game[i].Update(dt);
        }
    }

    AddGUI()
    {
        let style = {
            fontFamily : 'MainFont', 
            fontSize: 15,
            fill : 0xffffff, 
            align : 'center',
        };

        let spaceY = 50;

        this.menuText = new PIXI.Text('Game Menu', style);
        
        this.menuText.position.set(0.45*this.menuText.width, 0.5*this.menuText.height);

        this.gameOneBtn = new PIXI.Sprite(Resources.button.texture);
        this.gameOneBtn.SetTouchable(true);
        this.gameOneBtn.y += spaceY;
        this.gameOneBtn.on('pointerdown', this.TouchHandler.bind(this))

        this.gameTwoBtn = new PIXI.Sprite(Resources.button.texture);
        this.gameTwoBtn.SetTouchable(true);
        this.gameTwoBtn.y = this.gameOneBtn.y + spaceY;
        this.gameTwoBtn.on('pointerdown', this.TouchHandler.bind(this))

        Utils.AddText(this.gameOneBtn, 'Game 1', style);
        Utils.AddText(this.gameTwoBtn, 'Game 2', style);

        this.gui = [this.menuText, this.gameOneBtn, this.gameTwoBtn];
        this.gameMenu.addChild(...this.gui);
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

    TouchHandler(e)
    {
        switch (e.type)
        {
            case 'pointerdown':
                switch (e.target)
                {
                    case this.gameOneBtn:
                        this.Game.push(GameOne);
                        GameOne.Init();
                        GameOne.isInit = true;
                        this.stage.removeChild(this.gameMenu);
                        this.stage.addChild(GameOne);
                    break;

                    case this.gameTwoBtn:
                        this.Game.push(GameTwo);
                        GameTwo.Init();
                        GameTwo.isInit = true;
                        this.stage.removeChild(this.gameMenu);
                        this.stage.addChild(GameTwo);
                    break;
                }
            break;
        }
    }
}

module.exports = new GameMgr();