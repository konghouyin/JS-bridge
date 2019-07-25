import {
    addCallback,
    addContinuousCallback,
    clearContinuousCallback
} from './callbackPool'
import checkFunction from './checkFunction'

/**
 * 函数功能
 * @name startAccelerometer
 * @author fzb 1360234119@qq.com
 * @description 接收应用层请求启动加速计请求，添加回调，并发送给Native层
 * @const 无
 * @global 无
 * @param obj<Object>:开发中传入的参数
 * @return interval格式错误，change不是函数时，将停止Native通信
 * @throws startAccelerometer:interval格式错误
 */
function startAccelerometer(obj) {
    let callbackId = Math.floor(Math.random() * 2000000000)
    let continuousCallbackId = Math.floor(Math.random() * 2000000000)
    let type = 'startAccelerometer'
    let send = {
        type: type,
        data: {
            interval: 'normal',
            continuousCallbackId
        },
        callbackId: callbackId
    }
    if (obj.interval != undefined) {
        if (obj.interval != 'game' && obj.interval != 'ui' && obj.interval != 'normal'&& obj.interval != 'fastest') {
            throw 'startAccelerometer:interval格式错误'
            return
        }
        send.data.interval = obj.interval
    }
    if (obj.change == undefined || !obj.change instanceof Function) {
        throw 'startAccelerometer:change错误'
        return
    }
    if (checkFunction(type, obj)) {
        addContinuousCallback(this, callbackId, continuousCallbackId, type, obj.success, obj.fail, obj.complete, obj.change)
        this.jsCallNative(send)
    }
}


/**
 * 函数功能
 * @name stopAccelerometer
 * @author fzb 1360234119@qq.com
 * @description 接收应用层请求停止加速计请求，添加回调，并发送给Native层
 * @const 无
 * @global 无
 * @param obj<Object>:开发中传入的参数
 * @return 无
 * @throws 无
 */
function stopAccelerometer(obj) {
    let callbackId = Math.floor(Math.random() * 2000000000)
    let type = 'stopAccelerometer'
    let send = {
        type: type,
        data: null,
        callbackId: callbackId
    }
    if (checkFunction(type, obj)) {
        clearContinuousCallback(this, callbackId, type, obj.success, obj.fail, obj.complete)
        this.jsCallNative(send)
    }
}
export {
    startAccelerometer,
    stopAccelerometer
}
