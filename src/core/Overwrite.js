class Overwrite
{
    constructor()
    {
        PIXI.Sprite.prototype.SetTouchable = function(i = false)
        {
            this.interactive = i;
            this.buttonMode = i;
        }

        PIXI.Container.prototype.SetTouchable = function(i = false)
        {
            this.interactive = true;
            switch (i)
            {
                case true: 
                    this.hitArea = new PIXI.Rectangle(0,0, this.width, this.height);
                break;

                case false:
                    this.hitArea = null;
                break;
            }
        }
    }
}

module.exports = new Overwrite();
