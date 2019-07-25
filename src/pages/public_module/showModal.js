import {
    addCallback
} from './callbackPool'
import checkFunction from './checkFunction'

/**
 * 函数功能
 * @name showModal
 * @author fzb 1360234119@qq.com
 * @description 接收应用层请求，添加回调，并发送给Native层
 * @const 无
 * @global 无
 * @param obj<Object>:开发中传入的参数
 * @return 在填写参数中存在致命错误时，将停止Native通信
 * @throws 一些开发者填入的错误参数警告
 */
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
        if (obj.title > 7) {
            throw 'showModal:title建议长度小于7'
        }
        send.data.title = obj.title
        send.data.showTitle = true
    }
    if (obj.content != undefined) {
        send.data.content = obj.content
    }
    if (obj.showCancel != undefined) {
        if (typeof obj.showCancel != 'boolean') {
            throw 'showModal:showCancel必须是Boolean类型'
            return
        }
        send.data.showCancel = obj.showCancel
    }
    if (obj.cancelText != undefined) {
        if (obj.cancelText > 4) {
            throw 'showModal:cancelText建议长度小于4'
        }
        send.data.cancelText = obj.cancelText
    }
    if (obj.cancelColor != undefined) {
        if (obj.cancelColor.length != 4 && obj.cancelColor.length != 7) {
            throw 'showModal:cancelColor格式错误'
            return
        }
        send.data.cancelColor = obj.cancelColor
    }
    if (obj.confirmText != undefined) {
        if (obj.confirmText > 4) {
            throw 'showModal:confirmText建议长度小于4'
        }
        send.data.confirmText = obj.confirmText
    }
    if (obj.confirmColor != undefined) {
        if (obj.confirmColor.length != 4 && obj.confirmColor.length != 7) {
            throw 'showModal:confirmColor格式错误'
            return
        }
        send.data.confirmColor = obj.confirmColor
    }

    if (send.data.cancelColor.length == 4) {
        let letterArr = send.data.cancelColor.split('')
        send.data.cancelColor = letterArr[0] + letterArr[1] + letterArr[1] + letterArr[2] + letterArr[2] + letterArr[3] +
            letterArr[3]
    }
    if (checkFunction(type, obj)) {
        addCallback(this, callbackId, type, obj.success, obj.fail, obj.complete)
        this.jsCallNative(send)
    }
}
