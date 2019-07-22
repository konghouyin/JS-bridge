import getSystemInfo from './getSystemInfo'
import {callbackApply} from './callbackPool'

export default function JSBridge(length, time) {
    this.length = length
    this.time = time
}
window.JSBridge = JSBridge
window.jsCallBack = function (message){
    console.log(message)
    callbackApply(JSON.parse(message))
}

JSBridge.prototype.getSystemInfo = getSystemInfo
