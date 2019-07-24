class SpriteObject
{
    constructor()
    {
        this.Init();
    }

    Init()
    {
        this.sprite = new PIXI.Sprite(this._CreateTexture());
        this.sprite.anchor.set(0.5);
    }

    _CreateTexture()
    {
        let shape = new PIXI.Graphics();
        shape.beginFill(0xCC5533);
        shape.lineStyle(1, 0xFFFFFF);
        shape.drawRect(0, 0, 40, 40);
        return APP.renderer.generateTexture(shape);
    }
}

class PhysicsObject
{
    constructor(sprite)
    {
        this.Init(sprite);
    }

    Init(sprite)
    {
        let x = Utils.RandInt(APP.GetWidth(), 0),
            y = Utils.RandInt(APP.GetHeight() - 60, 0);
        this.sprite = Matter.Bodies.rectangle(x,y,sprite.width, sprite.height);
    }
}

class Sprite
{
    constructor()
    {
        let s = new SpriteObject(),
            p = new PhysicsObject(s.sprite);
        //
        this.sprite         = s.sprite;
        this.physicSprite   = p.sprite;
    }
}

class GameTwo extends PIXI.Container
{
    constructor()
    {
        super();
        this.mEngine         = null;
        this.mGround         = null;
        this.mSprites        = [];
        this.mPhysicSprites  = [];
    }

    Init()
    {
        console.log('Game Two Init');
        //
        this.mBg = new PIXI.Graphics();
        this.mEngine = Matter.Engine.create();
        this.mGround = Matter.Bodies.rectangle(0.5*APP.GetWidth(), 
                                                APP.GetHeight(), 
                                                APP.GetWidth(),
                                                10, 
                                                {isStatic: true});
        this.mWalls = [
            Matter.Bodies.rectangle(0, 
                0.5*APP.GetHeight(), 
                10,
                APP.GetHeight(), 
                {isStatic: true}),
            Matter.Bodies.rectangle(APP.GetWidth(), 
                0.5*APP.GetHeight(), 
                10,
                APP.GetHeight(), 
                {isStatic: true})
        ];
        let sprites = this._CreateSprites();
        //
        this.mBg.beginFill(0x1099bb, 1).drawRect(0,0,APP.GetWidth(), APP.GetHeight());
        this.mSprites = sprites.map(s => s.sprite);
        this.mPhysicSprites = sprites.map(s => s.physicSprite);
        this.mPhysicSprites.push(this.mGround, ...this.mWalls);
        //
        this.addChild(this.mBg);
        this.addChild(...this.mSprites);
        //
        Matter.World.add(this.mEngine.world, this.mPhysicSprites);
        Matter.Engine.run(this.mEngine);
    }

    Update(dt)
    {
        this.mSprites.forEach(function(s, i){
            s.position = this.mPhysicSprites[i].position;
            s.rotation = this.mPhysicSprites[i].angle;
        }.bind(this));
    }

    _CreateSprites()
    {
        let sArr = [];
        for (let i = 0; i< 120; i++)
        {
            let s = new Sprite();
            sArr.push(s);
        }
        return sArr;
    }
}

module.exports = new GameTwo();