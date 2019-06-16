class Bezier extends PIXI.Container
{
    constructor()
    {
        super();
        this.arrP = [];
    }

    Init()
    {
        this.mGraph = new PIXI.Graphics();
        this._DrawBezier(this.arrP);
        this.mGraph.position.set(this.arrP[0].x, this.arrP[0].y)
        this.addChild(this.mGraph);

        // this.arrP = arrP;
        this.isTouch = false;
        // console.log(this.arrP);
        this.GetVertices();
    }

    Update(dt)
    {
        // console.log(this.arrP[2].x);
        this.mGraph.clear();
        this._UpdatePoint();
    }

    DrawPointOnMap(p)
    {
        let point = Utils.DrawCircle(0,0,4);
        point.position.set(p.x, p.y);
        point.interactive = true;
        point.hitArea = PIXI.Rectangle(0,0,7,7);
        this.arrP.push(point);
        this.addChild(point);
    }

    GetVertices()
    {
        let avgRange = 0;
        let point = [];
        let xArr = this.arrP.map(i => i.x);
        let yArr = this.arrP.map(i => i.y);
        
        for (let i = 0; i< this.arrP.length - 1; i++)
            avgRange += Utils.Distance2Point(this.arrP[i], this.arrP[i+1])/this.arrP.length;
        for (let i = 0; i< Math.round(avgRange); i++)
        {
            let p = {x:0, y:0};
            p.x = Utils.BezierPoint((1/avgRange)*i, xArr);
            p.y = Utils.BezierPoint((1/avgRange)*i, yArr);

            point.push(p);
        }

        return point;
    }

    _DrawBezier(arrP)
    {
        this.mGraph.lineStyle(2,0xf44242);
        this.mGraph.moveTo(0,0);
        this.mGraph.bezierCurveTo(  arrP[1].x - arrP[0].x, arrP[1].y - arrP[0].y, 
                                    arrP[2].x - arrP[0].x, arrP[2].y - arrP[0].y, 
                                    arrP[3].x - arrP[0].x, arrP[3].y - arrP[0].y);
    }

    _UpdatePoint()
    {
        this.mGraph.position.set(this.arrP[0].x, this.arrP[0].y);
        let pos = this.mGraph.position;
        this.mGraph.moveTo(0,0);
        this.mGraph.bezierCurveTo(  this.arrP[1].x - pos.x, this.arrP[1].y - pos.y, 
                                    this.arrP[2].x - pos.x, this.arrP[2].y - pos.y, 
                                    this.arrP[3].x - pos.x, this.arrP[3].y - pos.y);
    }
}

module.exports = Bezier;