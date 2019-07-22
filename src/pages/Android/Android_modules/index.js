import JSBridge from '@/pages/public_module'

JSBridge.prototype.jsCallAndroid = function (msg) {
    window._android.postMessage(JSON.stringify(msg))
}
