import {addCallback} from './callbackPool'

/**
 * 函数功能
 * @name getSystemInfo
 * @author fzb 1360234119@qq.com
 * @description 接收应用层请求，添加回调，并发送给Native层
 * @const 无
 * @global 无
 * @param obj<Object>:开发中传入的参数
 * @return 无
 * @throws 无
 */
export default function (obj) {
    let callbackId = Math.floor(Math.random() * 2000000000)
    let type = 'getSystemInfo'
    let send = {
        type: type,
        data: null,
        callbackId: callbackId
    }
    addCallback(this, callbackId, type, obj.success, obj.fail, obj.complete)
    this.jsCallNative(send)
}
