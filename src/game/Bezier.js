class Bezier extends PIXI.Container
{
    constructor()
    {
        super();
        this.arrP = [];
    }

    Init(arrP)
    {
        this.mGraph = new PIXI.Graphics();
        this._DrawBezier(arrP);
        this.mGraph.position.set(arrP[0].x, arrP[0].y)
        this.addChild(this.mGraph);

        this.arrP = arrP;
    }

    Update(dt)
    {
        // console.log(this.arrP[2].x);
        this.mGraph.clear();
        this._UpdatePoint();
    }

    _DrawBezier(arrP)
    {
        this.mGraph.lineStyle(2,0xffffff);
        this.mGraph.moveTo(0,0);
        this.mGraph.bezierCurveTo(  arrP[1].x - arrP[0].x, arrP[1].y - arrP[0].y, 
                                    arrP[2].x - arrP[0].x, arrP[2].y - arrP[0].y, 
                                    arrP[3].x - arrP[0].x, arrP[3].y - arrP[0].y);
    }

    _UpdatePoint()
    {
        this.mGraph.moveTo(0,0);
        this.mGraph.bezierCurveTo(  this.arrP[1].x - this.arrP[0].x, this.arrP[1].y - this.arrP[0].y, 
                                    this.arrP[2].x - this.arrP[0].x, this.arrP[2].y - this.arrP[0].y, 
                                    this.arrP[3].x - this.arrP[0].x, this.arrP[3].y - this.arrP[0].y);
    }
}

module.exports = Bezier;