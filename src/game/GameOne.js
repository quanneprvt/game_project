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
        // this.SetTouchable(true);
        this.addChild(this.sprite);

        this.sprite.position.set(200, 200);
        this.sprite.interactive = true;

        this.sprite.on('pointerdown', this.TouchHandler.bind(this))
        this.sprite.on('pointermove', this.TouchHandler.bind(this))
        this.sprite.on('pointerup', this.TouchHandler.bind(this))

        this.lockMove = false;
        this.AddGUI();

        this.on('pointerdown', this.TouchHandler.bind(this))
        this.SetTouchable(true);
    }

    Update(dt)
    {
        // console.log('Updating ' + dt);
    }

    AddGUI()
    {
        this.scaleUpBtn = new PIXI.Sprite(Resources.button.texture);
        this.scaleUpBtn.SetTouchable(true);
        this.scaleUpBtn.on('pointerdown', this.TouchHandler.bind(this))
        let style = {
            fontFamily : 'MainFont', 
            fontSize: 15,
            fill : 0xffffff, 
            align : 'center',
        };
        this.scaleDownBtn = new PIXI.Sprite(Resources.button.texture);
        this.scaleDownBtn.SetTouchable(true);
        this.scaleDownBtn.x += this.scaleUpBtn.width;
        this.scaleDownBtn.on('pointerdown', this.TouchHandler.bind(this));

        this.lockMoveBtn = new PIXI.Sprite(Resources.button.texture);
        this.lockMoveBtn.SetTouchable(true);
        this.lockMoveBtn.x = this.scaleDownBtn.x + this.scaleDownBtn.width;
        this.lockMoveBtn.on('pointerdown', this.TouchHandler.bind(this));

        this.drawBtn = new PIXI.Sprite(Resources.button.texture);
        this.drawBtn.SetTouchable(true);
        this.drawBtn.x = this.lockMoveBtn.x + this.lockMoveBtn.width;
        this.drawBtn.on('pointerdown', this.TouchHandler.bind(this));

        this.AddText(this.scaleUpBtn, 'Scale Up', style)
        this.AddText(this.scaleDownBtn, 'Scale Down', style)
        this.AddText(this.lockMoveBtn, 'Lock Move', style)
        this.AddText(this.drawBtn, 'Start Draw', style)

        this.gui = [this.scaleUpBtn,this.scaleDownBtn, this.lockMoveBtn, this.drawBtn];

        for (let i = 0; i< this.gui.length; i++)
            this.addChild(this.gui[i]);
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
        switch (e.type)
        {
            case 'pointerdown':
                let scaleDelta = 0.1;
                switch (e.target)
                {
                    case this.scaleDownBtn:
                        // console.log('scale down');
                        this.sprite.scale.x -= scaleDelta;
                        this.sprite.scale.y -= scaleDelta;
                    break;

                    case this.scaleUpBtn:
                        this.sprite.scale.x += scaleDelta;
                        this.sprite.scale.y += scaleDelta;
                        // console.log('scale up');
                    break;

                    case this.lockMoveBtn:
                        this.lockMove = !this.lockMove;
                        this.lockMoveBtn.text.text = this.lockMove ? 'Unlock Move' : 'Lock Move';
                    break;

                    case this.drawBtn:
                        this.canDraw
                        this.lockMove = !this.lockMove;
                        this.lockMoveBtn.text.text = this.lockMove ? 'Unlock Move' : 'Lock Move';
                    break;

                    case this.sprite:
                        this.isTouch = true;
                    break;

                    case this:
                        console.log('container');
                    break;
                }
            break;

            case 'pointermove':
                if (this.isTouch && !this.lockMove)
                {
                    this.sprite.position.set(e.data.global.x, e.data.global.y);
                }
            break;

            case 'pointerup':
                this.isTouch = false;
            break;
        }
    }
}

module.exports = new GameOne();