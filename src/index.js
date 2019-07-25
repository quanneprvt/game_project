import _ from 'lodash';
import './css/style.css';
import './core/Utils';
import './core/Timer';
//
global.PIXI             = require('pixi.js');
global.Matter           = require('./libs/matter.min.js');
global.Overwrite        = require('./core/Overwrite');
global.APP              = require('./game/GameMgr');

function component() {
    const element = document.createElement('button');
  
    // Lodash, currently included via a script, is required for this line to work
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = 'Reload';
    element.onclick = function(){
        location.reload();
    };
    element.classList.add('reload_btn');
    // GameMgr.Init();
  
    return element;
}
  
document.body.appendChild(component());
document.body.appendChild(APP.view);