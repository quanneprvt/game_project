class SpriteObject
{
    constructor()
    {
        this.Init();
    }

    Init()
    {
        this.sprite = new PIXI.Sprite(Resources.bunny.texture);
        this.sprite.anchor.set(0.5);
    }
}

class PhysicsObject
{
    constructor()
    {
        this.Init();
    }

    Init()
    {
        let x = Utils.RandInt(APP.GetWidth(), 0),
            y = Utils.RandInt(APP.GetHeight() - 60, 0),
            vertices = Resources.spriteData.data.vertices;
        this.sprite = Matter.Bodies.fromVertices(x,y,vertices);
    }
}

class Sprite
{
    constructor()
    {
        let s = new SpriteObject(),
            p = new PhysicsObject();
        //
        this.sprite         = s.sprite;
        this.physicsSprite  = p.sprite;
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
        this.mPhysicsSprites = [];
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
                1,
                APP.GetHeight(), 
                {isStatic: true}),
            Matter.Bodies.rectangle(APP.GetWidth(), 
                0.5*APP.GetHeight(), 
                1,
                APP.GetHeight(), 
                {isStatic: true})
        ];
        let sprites = this._CreateSprites();
        //
        this.mBg.beginFill(0x1099bb, 1).drawRect(0,0,APP.GetWidth(), APP.GetHeight());
        this.mSprites       = sprites.map(s => s.sprite);
        this.mPhysicsSprites= sprites.map(s => s.physicsSprite);
        this.mPhysicsSprites.push(this.mGround, ...this.mWalls);
        //
        this.addChild(this.mBg);
        this.addChild(...this.mSprites);
        //
        Matter.World.add(this.mEngine.world, this.mPhysicsSprites);
        Matter.Engine.run(this.mEngine);
    }

    Update(dt)
    {
        this.mSprites.forEach(function(s, i){
            s.position = this.mPhysicsSprites[i].position;
            s.rotation = this.mPhysicsSprites[i].angle;
        }.bind(this));
    }

    _CreateSprites()
    {
        let sArr = [];
        for (let i = 0; i< 200; i++)
        {
            let s = new Sprite();
            sArr.push(s);
        }
        return sArr;
    }
}

module.exports = new GameTwo();