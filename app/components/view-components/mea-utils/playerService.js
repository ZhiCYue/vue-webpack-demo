
function playerService() {
    var __playerMySound;

    let lastUrl = "";

    var exportFn = {
        play: play,
        pause: pause,
        stop: stop,
        btnClick: btnClick
    }

    ////////////////
    function sound(url, opts) {
        // 如果有则进行销毁资源再重新创建
        if (soundManager.getSoundById('mySound')) {
            try {
                soundManager.destroySound('mySound');
            }
            catch (e) {
            }
        }

        var _opts = opts || {events: {}};

        __playerMySound = soundManager.createSound({
            id: 'mySound',
            url: url,
            onload: function (ok) {
                _opts.events.load && _opts.events.load(ok, __playerMySound);
            },
            onplay: function () {
                _opts.events.play && _opts.events.play(__playerMySound);
            },
            onpause: function () {
                _opts.events.pause && _opts.events.pause(__playerMySound);
            },
            onstop: function () {
                _opts.events.stop && _opts.events.stop(__playerMySound);
            },
            onfinish: function () {
                _opts.events.finish && _opts.events.finish(__playerMySound);
            },
            onbufferchange: function (isBuffering) {
                _opts.events.bufferchange && _opts.events.bufferchange(isBuffering, __playerMySound);
            },
            whileplaying: function () {
                _opts.events.whileplaying && _opts.events.whileplaying(__playerMySound);
            },
            onerror: function () {
                _opts.events.error && _opts.events.error(__playerMySound);
            }
        });
        return __playerMySound;
    }

    function play(url, args) {
        args = args || {};
        if (!url) {
            return;
        }
        url = url.replace('.wav', '.mp3');

        var themeEvents = {
            load: function (ok, mySound) {
                if (!ok) {
                    args['errorFn'] && args['errorFn']();
                }0
            },
            play: function () {
                args['playFn'] && args['playFn']();
            },
            whileplaying: function (mySound) {
                var percent = (mySound.position / mySound.duration).toFixed(2);
                var percentStr = percent * 100 + '%';
                //var __sytime = __calcSeconds(mySound.position);
                var __sytime = __calcSeconds(mySound.duration-mySound.position);
                var __duration = __calcSeconds(mySound.duration);
                var __position = mySound.position;
                args['whileplayingFn'] && args['whileplayingFn']({
                    percent: percent,
                    percentStr: percentStr
                }, __position, __duration,__sytime);
            },
            pause: function () {
                args['pauseFn'] && args['pauseFn']();
            },
            stop: function () {
                args['stopFn'] && args['stopFn']();
            },
            finish: function () {
                args['finishFn'] && args['finishFn']();
            },
            error: function () {
                args['errorFn'] && args['errorFn']();
            }
        }
        sound(url, {
            events: themeEvents
        });
        lastUrl = url;
        __playerMySound.play();
    }

    function pause() {
        __playerMySound && __playerMySound.pause();
    }

    function stop() {
        __playerMySound && __playerMySound.stop();
    }

    function btnClick(url, args) {
        if (__playerMySound && __playerMySound.playState != '0') {
            // 如果当前为播放状态，则暂停，否则暂停后在重新创建音频管理器
            if(args && args['playState']) {
                stop();
                return;
            }
            stop();
        }
        play(url, args);
    }

    /**
     * 计算分钟数
     * @param milliseconds
     * @returns {{minutes: number, seconds: number, time: string}}
     * @private
     */
    function __calcSeconds(milliseconds) {
        var seconds = Math.ceil(milliseconds / 1000);
        var modSeconds = seconds % 60;
        if (modSeconds < 10) {
            modSeconds = '0' + modSeconds;
        }
        var minutes = Math.floor(seconds / 60);
        if (minutes < 10) {
            minutes = minutes;
        }

        return {
            minutes: minutes,
            seconds: modSeconds,
            time: minutes + ":" + modSeconds
        };
    }

    return exportFn;
}


export default playerService();