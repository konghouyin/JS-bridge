import JSBridge from '@/pages/public_module'

JSBridge.prototype.jsCalliOS = function (msg) {
    window.webkit.messageHandlers.JSObject.postMessage(msg)
}
