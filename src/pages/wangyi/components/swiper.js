export default class VueTouch {
    constructor(el, binding, type) {
        let g = this

        g.obj = el
        g.binding = binding
        g.touchType = type

        g.firstTouchPosition = {
            x: 0,
            y: 0
        }
        g.firstTouchTime = 0
        g.callBack = binding.value
        console.log(binding.value)
        g.moved = false
        g.leaved = false
        g.longTouched = false

        // 事件监听回调集合
        let _listener = Object.create(null)

        // 事件方法
        let _listen = (type) => {
            return function(e) {
                let {
                    stop,
                    prevent,
                    once
                } = g.binding.modifiers

                // 配置判断
                if (stop) e.stopPropagation()
                if (prevent) e.preventDefault()
                if (once) g.obj.removeEventListener('touch' + type, _listener[type])
                g[type](e)
            }
        }

        _listener.start = _listen('start')
        _listener.end = _listen('end')
        _listener.move = _listen('move')

        this.obj.addEventListener('touchstart', _listener.start, false)
        this.obj.addEventListener('touchend', _listener.end, false)
        this.obj.addEventListener('touchmove', _listener.move, false)
    }

    start(e) {

        let g = this

        // 初始化点击状态
        g.moved = false
        g.leaved = false
        g.longTouched = false

        g.firstTouchPosition = g.getMultiCenter(e.changedTouches)
        g.firstTouchTime = e.timeStamp
        g.time = setTimeout(function() {
            if (!g.leaved && !g.moved) {
                g.touchType === 'longtap' && g.callBack(e, g.binding.value)
                g.longTouched = true
            }
        }.bind(g), 1000)
    }

    end(e) {
        let g = this

        let {
            x,
            y
        } = g.getMultiCenter(e.changedTouches)
        let _disX = x - g.firstTouchPosition.x
        let _disY = y - g.firstTouchPosition.y
        let _dis = Math.sqrt(_disX * _disX + _disY * _disY)
        let _timeDis = e.timeStamp - g.firstTouchTime

        clearTimeout(g.time)
        let _angle = this.getAngle(_disX, _disY)
        if ((_dis > 60 && _timeDis < 350) || _dis > 200) {
            if (_angle <= 20 && _angle >= -20){
                  g.callBack.end(e, -1)
            }
            if ((_angle <= -160 && _angle > -180) || (_angle >= 160 && _angle <= 180)){
                g.callBack.end(e, 1)
            }
        } else {
            g.callBack.end(e, 0)
        }
    }

    move(e) {
        let g = this
        this.moved = true
        let {
            x,
            y
        } = g.getMultiCenter(e.changedTouches)
        let _disX = x - g.firstTouchPosition.x
        let _timeDis = e.timeStamp - g.firstTouchTime
        g.callBack.move(e, g.firstTouchPosition.x, _disX)
    }

    /**
     * 获取点击集合的中心坐标
     * @param touches touch对象集合
     * @return {{x: number, y: number}}
     */
    getMultiCenter(touches) {
        let x = 0
        let y = 0

        const _length = touches.length

        for (let i = 0; i < _length; i++) {
            x += touches[i].pageX
            y += touches[i].pageY
        }

        return {
            x: Math.round(x / _length),
            y: Math.round(y / _length)
        }
    }

    getAngle(disX, disY) {
        if (typeof disX !== 'number' || typeof disY !== 'number') {
            return 45
        }
        return Math.atan2(disY, disX) * 180 / Math.PI
    }
}
