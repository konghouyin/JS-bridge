import getSystemInfo from './getSystemInfo'
import showModal from './showModal'
import {startAccelerometer,stopAccelerometer} from './accelerometer'
import webviewConnect from './webviewConnect'
import downLoad from './downLoad'
import downLoadNow from './downLoadNow'

import {
    callbackApply,
    continuousCallbackApply
} from './callbackPool'

export default function JSBridge(length) {
    this.length = length
}
window.JSBridge = JSBridge

/**
 * 函数功能
 * @name jsCallBack
 * @author fzb 1360234119@qq.com
 * @description 全局注册回调，给Native层暴露接口
 * @const 无
 * @global 无
 * @param message<Object>:Native层传入的信息
 * @return 无
 * @throws 无
 */
window.jsCallBack = function(message) {
    console.log(message)
    callbackApply(message)
}

/**
 * 函数功能
 * @name jsContinuousCallBack
 * @author fzb 1360234119@qq.com
 * @description 全局注册回调，给Native层暴露接口
 * @const 无
 * @global 无
 * @param message<Object>:Native层传入的信息
 * @return 无
 * @throws 无
 */
window.jsContinuousCallBack = function(message) {
    continuousCallbackApply(message)
}

/**
 * 函数功能
 * @name jsCallNative
 * @author fzb 1360234119@qq.com
 * @description 判断webview类型，分发到不同的通信层
 * @const 无
 * @global 无
 * @param send<Object>:需要传输给Native层的信息
 * @return 无
 * @throws 无
 */
JSBridge.prototype.jsCallNative = function(send) {
    if (/Android/.test(navigator.appVersion)) {
        JSBridge.prototype.jsCallAndroid(send)
    } else if (/iPhone/.test(navigator.appVersion)) {
        JSBridge.prototype.jsCalliOS(send)
    }
}

JSBridge.prototype.jsCallAndroid = function (msg) {
    window._android.postMessage(JSON.stringify(msg))
}
JSBridge.prototype.jsCalliOS = function (msg) {
	console.log(msg)
    for(let each in msg.data){
        if(each!='url' && 'string' == typeof each){
            each+="\0"
        }
    }
    console.log(msg)
    window.webkit.messageHandlers.JSObject.postMessage(msg)
}

JSBridge.prototype.getSystemInfo = getSystemInfo
JSBridge.prototype.showModal = showModal
JSBridge.prototype.startAccelerometer = startAccelerometer
JSBridge.prototype.stopAccelerometer = stopAccelerometer
JSBridge.prototype.webviewConnect = webviewConnect
JSBridge.prototype.downLoad = downLoad
JSBridge.prototype.downLoadNow = downLoadNow
