import getSystemInfo from './getSystemInfo'
import showModal from './showModal'
import {callbackApply} from './callbackPool'

export default function JSBridge(length, time) {
    this.length = length
    this.time = time
}
window.JSBridge = JSBridge
window.jsCallBack = function (message){
    callbackApply(message)
}
JSBridge.prototype.jsCallNative = function(send){
    if(/Android/.test(navigator.appVersion)){
        JSBridge.prototype.jsCallAndroid(send)
    }else if(/iPhone/.test(navigator.appVersion)){
        JSBridge.prototype.jsCalliOS(send)
    }
}
JSBridge.prototype.getSystemInfo = getSystemInfo
JSBridge.prototype.showModal = showModal
