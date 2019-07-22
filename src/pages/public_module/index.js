import getSystemInfo from './getSystemInfo'

export default function JSBridge(length, time) {
    this.callbackPool = {}
    this.length = length
    this.time = time
    this.now = 0
}
window.JSBridge = JSBridge

JSBridge.prototype.getSystemInfo = getSystemInfo
