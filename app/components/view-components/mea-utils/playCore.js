require("@/public/libs/soundmanager2/soundmanager2");

import config from '#config';

soundManager.setup({
    url: config.staticDomain + '/public/libs/soundmanager2/swf/',
    onready: function() {
        
    },
    flashVersion: 9 // optional: shiny features (default = 8)
});

soundManager.STOP = "stop";
soundManager.PLAYING = "playing";
soundManager.PAUSE = "pause";
soundManager.BUFFERING = "buffering";

export default soundManager;