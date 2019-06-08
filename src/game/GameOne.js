class GameOne extends PIXI.Container
{
    constructor()
    {
        super();
    }

    Init()
    {
        console.log('Game One Init');
        this.points = [];
        this.sprite = new PIXI.Sprite(Resources.bunny.texture);
        this.sprite.anchor.set(0.5,0.5);
        this.background = new PIXI.Container();
        this.background.interactive = true;
        this.background.hitArea = new PIXI.Rectangle(0,0,APP.GetWidth(), APP.GetHeight());

        this.sprite.position.set(200, 200);
        this.sprite.interactive = true;

        this.sprite.on('pointerdown', this.TouchHandler.bind(this));
        this.sprite.on('pointermove', this.TouchHandler.bind(this));
        this.sprite.on('pointerup', this.TouchHandler.bind(this));
        this.background.on('pointerdown', this.TouchHandler.bind(this));

        this.lockMove = false;
        this.AddGUI();

        this.addChild(this.background);
        this.addChild(this.sprite);
        this.addChild(...this.gui);
    }

    Update(dt)
    {
        // console.log('Updating ' + dt);
        this.sortChildren();
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

        this.rmPointBtn = new PIXI.Sprite(Resources.button.texture);
        this.rmPointBtn.SetTouchable(true);
        this.rmPointBtn.position.set(0, APP.GetHeight() - this.rmPointBtn.height);
        this.rmPointBtn.on('pointerdown', this.TouchHandler.bind(this));
        this.rmPointBtn.visible = false;

        this.rmAllPoint = new PIXI.Sprite(Resources.button.texture);
        this.rmAllPoint.SetTouchable(true);
        this.rmAllPoint.x = this.drawBtn.x + this.drawBtn.width;
        this.rmAllPoint.on('pointerdown', this.TouchHandler.bind(this));

        this.exportBtn = new PIXI.Sprite(Resources.button.texture);
        this.exportBtn.SetTouchable(true);
        this.exportBtn.x = this.rmAllPoint.x + this.drawBtn.width;
        this.exportBtn.on('pointerdown', this.TouchHandler.bind(this));

        this.fullScr = new PIXI.Sprite(Resources.button.texture);
        this.fullScr.SetTouchable(true);
        this.fullScr.y = this.fullScr.y + this.drawBtn.height;
        this.fullScr.on('pointerdown', this.TouchHandler.bind(this));

        this.coordText = new PIXI.Text('', style);
        this.coordText.anchor.set(0.5,0.5);
        this.coordText.position.set(APP.GetWidth()-60, APP.GetHeight() - 0.5*this.coordText.height)

        this.AddText(this.scaleUpBtn, 'Scale Up', style)
        this.AddText(this.scaleDownBtn, 'Scale Down', style)
        this.AddText(this.lockMoveBtn, 'Lock Move', style)
        this.AddText(this.drawBtn, 'Start Draw', style)
        this.AddText(this.rmPointBtn, 'Remove Point', style)
        this.AddText(this.rmAllPoint, 'Remove All', style)
        this.AddText(this.exportBtn, 'Export Vertices', style)
        this.AddText(this.fullScr, 'Full Sprite', style)

        this.gui = [this.scaleUpBtn,this.scaleDownBtn, this.lockMoveBtn, this.drawBtn, 
                    this.rmPointBtn, this.rmAllPoint, this.exportBtn, this.coordText,
                    this.fullScr];
    }

    AddText(obj,text,style)
    {
        obj.text = new PIXI.Text(text,style);
        obj.text.anchor.set(0.5,0.5);
        obj.text.x += 0.5*obj.width;
        obj.text.y += 0.5*obj.height;
        obj.addChild(obj.text);
    }

    MovePoint(dX, dY)
    {
        for (let i = 0; i< this.points.length; i++)
        {
            let point = this.points[i];
            point.x +=dX;
            point.y +=dY;
        }
    }

    //button handler
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
                        this.isTouch = false;
                        this.lockMove = !this.lockMove;
                        this.sprite.interactive = !this.lockMove;
                        this.lockMoveBtn.text.text = this.lockMove ? 'Unlock Move' : 'Lock Move';
                    break;

                    case this.drawBtn:
                        this.canDraw = !this.canDraw;
                        this.drawBtn.text.text = this.canDraw ? 'Lock Draw' : 'Unlock Draw';
                        this.setChildIndex(this.background, this.canDraw);
                    break;

                    case this.sprite:
                        this.isTouch = true;
                        this.startX = e.data.global.x;
                        this.startY = e.data.global.y;
                    break;

                    case this.background:
                        if (this.canDraw)
                        {
                            let graph = new PIXI.Graphics();
                            graph   .beginFill(0xffffff, 1)
                                    .drawCircle(0, 0, 4)
                                    .on('pointerdown', this.TouchHandler.bind(this))
                                    .interactive = true;
                            graph.position.set(e.data.global.x, e.data.global.y);
                            this.background.addChild(graph);
                            this.points.push(graph);
                        }
                    break;

                    case this.rmPointBtn:
                        this.background.removeChild(this.selectedPoint);
                        this.points.splice(this.selectedPoint, 1);
                        this.selectedPoint = null;
                        this.rmPointBtn.visible = false;
                        // console.log(this.points);
                    break;

                    case this.rmAllPoint:
                        this.background.removeChildren();
                        this.points = [];
                    break;

                    case this.exportBtn:
                        let vertices = [];
                        for (let i = 0; i < this.points.length; i++)
                        {
                            let point = {x:0, y:0};
                            // console.log(this.points[i].x,this.points[i].y);
                            point.x = (this.points[i].x - (this.sprite.x - 0.5*this.sprite.width))/this.sprite.scale.x;
                            point.y = (this.points[i].y - (this.sprite.y - 0.5*this.sprite.height))/this.sprite.scale.y;
                            vertices.push(point);
                        }
                        console.log(vertices);
                    break;

                    case this.fullScr:
                        this.sprite.scale.set(APP.IsLandscape() ? APP.GetWidth()/this.sprite.width : APP.GetHeight()/this.sprite.height);
                        this.sprite.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight());
                    break;

                    default:
                        for (let i = 0; i< this.points.length; i++)
                        {
                            let point = this.points[i];
                            if (e.target.x == point.x &&
                                e.target.y == point.y)
                            {
                                this.selectedPoint = e.target;
                                this.rmPointBtn.visible = true;
                                break;
                            }
                        }
                    break;
                }
            break;

            case 'pointermove':
                // console.log('pointer move');
                this.coordText.text = `${e.data.global.x.toFixed(3)}, ${e.data.global.y.toFixed(3)}`;
                if (this.isTouch && !this.lockMove)
                {
                    let dX = e.data.global.x - this.startX;
                    let dY = e.data.global.y - this.startY;
                    this.startX += dX;
                    this.startY += dY;
                    
                    this.sprite.x += dX;
                    this.sprite.y += dY;
                    this.MovePoint(dX, dY);
                }
            break;

            case 'pointerup':
                this.isTouch = false;
            break;
        }
    }
}

module.exports = new GameOne();