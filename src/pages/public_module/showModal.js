import {
    addCallback
} from './callbackPool'

export default function(obj) {
    let callbackId = Math.floor(Math.random() * 2000000000)
    let type = 'showModal'
    let send = {
        type: type,
        data: {
            title: '',
            showTitle: false,
            content: '',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#576B95'
        },
        callbackId: callbackId
    }
    if (obj.title != undefined) {
        send.data.title = obj.title
        send.data.showtitle = true
    }
    if (obj.content != undefined) {
        send.data.content = obj.content
    }
    if (obj.showCancel != undefined) {
        send.data.showCancel = obj.showCancel
    }
    if (obj.cancelText != undefined) {
        send.data.cancelText = obj.cancelText
    }
    if (obj.cancelColor != undefined) {
        send.data.cancelColor = obj.cancelColor
    }
    if (obj.confirmText != undefined) {
        send.data.confirmText = obj.confirmText
    }
    if (obj.confirmColor != undefined) {
        send.data.confirmColor = obj.confirmColor
    }

    addCallback(this, callbackId, type, obj.success, obj.fail, obj.complete)
    this.jsCallNative(send)
}
