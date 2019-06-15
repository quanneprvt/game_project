class Utils
{
    constructor()
    {

    }

    Distance2Point(p1, p2)
    {
        let a = p1.x - p2.x;
        let b = p1.y - p2.y;

        return Math.sqrt( a*a + b*b );
    }

    Angle2Point(p1, p2)
    {
        // angle in radians
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }

    DrawCircle(x,y,r)
    {
        let graph = new PIXI.Graphics();
            graph   .beginFill(0xffffff, 1)
                    .drawCircle(x, y, r);
        return graph;
    }

    DrawBezier(arrP)
    {
        let graph = new PIXI.Graphics();
        graph.lineStyle(2,0xffffff);
        graph.moveTo(0,0);
        graph.bezierCurveTo(arrP[1].x - arrP[0].x, arrP[1].y - arrP[0].y, 
                            arrP[2].x - arrP[0].x, arrP[2].y - arrP[0].y, 
                            arrP[3].x - arrP[0].x, arrP[3].y - arrP[0].y);
        return graph;
    }
}

global.Utils = new Utils();