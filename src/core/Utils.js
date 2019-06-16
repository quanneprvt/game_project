class Utils
{
    constructor()
    {

    }

    AddText(obj,text,style)
    {
        obj.text = new PIXI.Text(text,style);
        obj.text.anchor.set(0.5,0.5);
        obj.text.x += 0.5*obj.width;
        obj.text.y += 0.5*obj.height;
        obj.addChild(obj.text);
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

    BezierPoint(t, array, i1 = 0, i2 = array.length - 1)
    {
        var length = i2 - i1 + 1;
        if(length > 2)
        {
            return (1 - t)*this.BezierPoint(t, array, i1, i2-1) + t*this.BezierPoint(t, array, i1+1, i2);
        }
        else if(length >= 2)
        {
            return (1 - t)*array[i1] + t*array[i2];
        }
        else if(length >= 1)
        {
            return array[i1];
        }
        else
        {
            return null;
        }
    }
}

global.Utils = new Utils();