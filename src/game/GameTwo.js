const Matter                = require('../libs/matter.min.js');

class GameTwo extends PIXI.Container
{
    constructor()
    {
        super();
    }

    Init()
    {
        console.log('Game Two Init');
    }

    Update(dt)
    {

    }
}

module.exports = new GameTwo();