import _ from 'lodash';
import './css/style.css';
import * as PIXI from 'pixi.js';
global.PIXI = PIXI;

const Overwrite = require('./game/Overwrite');
const GameMgr = require('./game/GameMgr');
global.APP = GameMgr;

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');
    // GameMgr.Init();
  
    return element;
}
  
document.body.appendChild(component());
document.body.appendChild(GameMgr.view);