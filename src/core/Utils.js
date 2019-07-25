class Utils
{
    constructor()
    {

    }

    Log(...texts)
    {
        console.log.apply(this, texts);
    }

    RevokeObjectURL(link)
    {
        if (link.startsWith('blob:'))
        {
            const Url = window.URL || window.webkitURL;
            Url.revokeObjectURL(link);
        }
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

    Rand(min, max)
    {
        if (min > max)
            [min, max] = [max, min];
        return (Math.random() * (max - min)) + min;
    }

    RandInt(min, max)
    {
        if (min > max)
            [min, max] = [max, min];
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    SaveFile(content, fileName, contentType)
    {
        let a = document.createElement("a");
        let file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
}

global.Utils = new Utils();