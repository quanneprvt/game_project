const Bezier                = require('./Bezier');

class GameOne extends PIXI.Container
{
    constructor()
    {
        super();
    }

    Init()
    {
        console.log('Game One Init');
        //
        this.interactive = true;
        this.points = [];
        this.sprite = new PIXI.Sprite(Resources.bunny.texture);
        this.sprite.anchor.set(0.5,0.5);
        this.foreground = new PIXI.Container();
        // this.foreground.interactive = true;
        this.foreground.hitArea = new PIXI.Rectangle(0,0,APP.GetWidth(), APP.GetHeight());

        this.sprite.position.set(200, 200);
        this.sprite.interactive = true;

        this.sprite.on('pointerdown', this.TouchHandler.bind(this));
        this.foreground.on('pointerdown', this.TouchHandler.bind(this));
        this.on('pointermove', this.TouchHandler.bind(this));
        this.on('pointerup', this.TouchHandler.bind(this));

        this.lockMove = false;
        this.AddGUI();

        this.addChild(this.sprite);
        this.addChild(this.foreground);
        this.addChild(...this.gui);
    }

    Update(dt)
    {
        // console.log('Updating ' + dt);
        for (let i = 0; i< this.points.length; i++)
        {
            if (this.points[i] instanceof Bezier)
            {
                this.points[i].Update(dt);
            }
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

        this.scaleUpBtn = new PIXI.Sprite(Resources.button.texture);
        this.scaleUpBtn.SetTouchable(true);
        this.scaleUpBtn.on('pointerdown', this.TouchHandler.bind(this))
        
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

        this.drawBezier = new PIXI.Sprite(Resources.button.texture);
        this.drawBezier.SetTouchable(true);
        this.drawBezier.x = this.exportBtn.x + this.drawBtn.width;
        this.drawBezier.on('pointerdown', this.TouchHandler.bind(this));

        this.fullScr = new PIXI.Sprite(Resources.button.texture);
        this.fullScr.SetTouchable(true);
        this.fullScr.y = this.fullScr.y + this.drawBtn.height;
        this.fullScr.on('pointerdown', this.TouchHandler.bind(this));

        this.loadSpriteBtn = new PIXI.Sprite(Resources.button.texture);
        this.loadSpriteBtn.SetTouchable(true);
        this.loadSpriteBtn.y = this.loadSpriteBtn.y + this.drawBtn.height;
        this.loadSpriteBtn.x += this.fullScr.width;
        this.loadSpriteBtn.on('pointerdown', this.TouchHandler.bind(this))

        this.coordText = new PIXI.Text('', style);
        this.coordText.anchor.set(0.5,0.5);
        this.coordText.position.set(APP.GetWidth()-60, APP.GetHeight() - 0.5*this.coordText.height)

        Utils.AddText(this.scaleUpBtn, 'Scale Up', style)
        Utils.AddText(this.scaleDownBtn, 'Scale Down', style)
        Utils.AddText(this.lockMoveBtn, 'Lock Move', style)
        Utils.AddText(this.drawBtn, 'Start Draw', style)
        Utils.AddText(this.rmPointBtn, 'Remove Point', style)
        Utils.AddText(this.rmAllPoint, 'Remove All', style)
        Utils.AddText(this.exportBtn, 'Export Vertices', style)
        Utils.AddText(this.fullScr, 'Full Sprite', style)
        Utils.AddText(this.drawBezier, 'Draw Bezier', style)
        Utils.AddText(this.loadSpriteBtn, 'Load Sprite', style)

        this.gui = [this.scaleUpBtn,this.scaleDownBtn, this.lockMoveBtn, this.drawBtn, 
                    this.rmPointBtn, this.rmAllPoint, this.exportBtn, this.coordText,
                    this.drawBezier,this.fullScr];
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

    /********************************PRIVATE FUNCTION***************************************************/
    /********************************DO NOT DELETE******************************************************/
    _DrawPointOnMap(x,y, type)
    {
        let graph = Utils.DrawCircle(0,0,4);
        graph.on('pointerdown', this.TouchHandler.bind(this));
        graph.on('pointerup', this.TouchHandler.bind(this));
        graph.interactive = true;
        graph.position.set(x, y);
        graph.pointType = type;
        this.foreground.addChild(graph);
        this.points.push(graph);
    }

    _GetControlPoint(p1, p2)
    {
        const dist = Utils.Distance2Point(p1, p2);
        const angle = Utils.Angle2Point(p1, p2);
        let controlA = {x: p1.x + Math.cos(angle)*dist/3,
                        y: p1.y + Math.sin(angle)*dist/3};
        let controlB = {x: p1.x + Math.cos(angle)*2*dist/3,
                        y: p1.y + Math.sin(angle)*2*dist/3};

        return [controlA, controlB];
    }

    _ResetTempValue()
    {
        this.tempBezier = null;
        this.tempP1 = null;
        this.tempP2 = null;
    }

    _ToggleDrawPoint()
    {
        this.canDraw = (this.canDraw == 'normal') ? false : 'normal';
        this.drawBtn.text.text = this.canDraw ? 'Lock Draw' : 'Unlock Draw';
    }

    _ToggleDrawBezier()
    {
        this.canDraw = (this.canDraw == 'bezier') ? false : 'bezier';
        this.drawBezier.text.text = this.canDraw ? 'Lock DrawB' : 'Unlock DrawB';
        this._ResetTempValue();
    }

    _ToggleDraw(t)
    {
        switch (t)
        {
            case this.drawBtn:
                if (this.canDraw != 'normal' && this.canDraw)
                    this._ToggleDrawBezier();
                this._ToggleDrawPoint();
            break;

            case this.drawBezier:
                if (this.canDraw != 'bezier' && this.canDraw)
                    this._ToggleDrawPoint();
                this._ToggleDrawBezier();
            break;
        }
        this.foreground.interactive = !this.canDraw ? false : true;
    }

    _SetCurrentPoint(p)
    {
        this.selectedPoint = p;
        this.rmPointBtn.visible = true;
    }

    _SetStartPoint(p)
    {
        this.startX = p.x;
        this.startY = p.y;
    }

    /************************************************************************************/
    /***********************************************************************************/

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
                    case this.drawBezier:
                        this._ToggleDraw(e.target);
                    break;

                    case this.sprite:
                        this.isTouch = true;
                        this._SetStartPoint(e.data.global);
                    break;

                    case this.foreground:
                        switch (this.canDraw)
                        {
                            case 'normal':
                                this._DrawPointOnMap(e.data.global.x, e.data.global.y, 'normal');
                            break;

                            case 'bezier':
                                if (this.tempP1)
                                {
                                    this.tempP2 = {x: e.data.global.x, y: e.data.global.y};
                                    let cP = this._GetControlPoint(this.tempP1, this.tempP2);

                                    this.tempBezier.DrawPointOnMap(cP[0]);
                                    this.tempBezier.DrawPointOnMap(cP[1]);
                                    this.tempBezier.DrawPointOnMap(this.tempP2);
                                    
                                    this.tempBezier.Init()

                                    this.points.push(this.tempBezier);

                                    this._ResetTempValue();
                                }
                                else
                                {
                                    let bezier = new Bezier();
                                    this.foreground.addChild(bezier);
                                    this.tempBezier = bezier;
                                    this.tempP1 = {x: e.data.global.x, y: e.data.global.y};
                                    bezier.DrawPointOnMap(this.tempP1);
                                }
                            break;
                        }
                    break;

                    case this.rmPointBtn:
                        this.foreground.removeChild(this.selectedPoint);
                        this.points.splice(this.points.indexOf(this.selectedPoint), 1);
                        this.selectedPoint = null;
                        this.rmPointBtn.visible = false;
                        // console.log(this.points);
                    break;

                    case this.rmAllPoint:
                        this.tempP1 = null;
                        this.tempP2 = null;
                        this.foreground.removeChildren();
                        this.points = [];
                    break;

                    case this.exportBtn:
                        let vertices = [];
                        for (let i = 0; i < this.points.length; i++)
                        {
                            let point = {x:0, y:0};
                            // console.log(this.points[i].x,this.points[i].y);
                            if (this.points[i] instanceof Bezier)
                            {
                                let points = this.points[i].GetVertices();
                                    points.map(i => {
                                        return vertices.push({
                                            x: (i.x - (this.sprite.x - 0.5*this.sprite.width))/this.sprite.scale.x,
                                            y: (i.y - (this.sprite.x - 0.5*this.sprite.width))/this.sprite.scale.x,
                                        });
                                    });
                            }
                            else
                            {
                                point.x = (this.points[i].x - (this.sprite.x - 0.5*this.sprite.width))/this.sprite.scale.x;
                                point.y = (this.points[i].y - (this.sprite.y - 0.5*this.sprite.height))/this.sprite.scale.y;
                                vertices.push(point);
                            }
                        }
                        // console.log(vertices);
                        Utils.SaveFile(JSON.stringify({vertices: vertices}), 'SpriteData.json', 'application/json');
                    break;

                    case this.fullScr:
                        this.sprite.scale.set(APP.IsLandscape() ? APP.GetWidth()/this.sprite.width : APP.GetHeight()/this.sprite.height);
                        this.sprite.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight());
                    break;

                    default:
                        // console.log();
                        this.rmPointBtn.visible = false;
                        for (let i = 0; i< this.points.length; i++)
                        {
                            let point = this.points[i];
                            if (!(point instanceof Bezier))
                            {
                                if (e.target.x == point.x &&
                                    e.target.y == point.y)
                                {
                                    this._SetCurrentPoint(point);
                                    this._SetStartPoint(e.data.global);
                                    break;
                                }
                            }
                            else
                            {
                                for (let j = 0; j< point.arrP.length; j++)
                                {
                                    if (e.target.x == point.arrP[j].x &&
                                        e.target.y == point.arrP[j].y)
                                    {
                                        this._SetCurrentPoint(point.arrP[j]);
                                        this._SetStartPoint(e.data.global);
                                        break;
                                    }
                                }
                            }
                        }
                    break;
                }
            break;

            case 'pointermove':
                // console.log('pointer move');
                if (e.data.global.x < APP.GetWidth() && e.data.global.y < APP.GetHeight())
                {
                    this.coordText.text = `${e.data.global.x.toFixed(3)}, ${e.data.global.y.toFixed(3)}`;
                    let dX = e.data.global.x - this.startX;
                    let dY = e.data.global.y - this.startY;
                    this.startX += dX;
                    this.startY += dY;
                    if (this.isTouch && !this.lockMove)
                    {
                        this.sprite.x += dX;
                        this.sprite.y += dY;
                        this.MovePoint(dX, dY);
                    }
                    if (this.selectedPoint)
                    {
                        this.selectedPoint.x += dX;
                        this.selectedPoint.y += dY;
                        // console.log(this.selectedPoint.x);
                    }
                }
            break;

            case 'pointerup':
                this.isTouch = false;
                if (this.selectedPoint)
                {
                    this.selectedPoint = null;
                    this.rmPointBtn.visible = false;
                }
            break;
        }
    }
}

module.exports = new GameOne();