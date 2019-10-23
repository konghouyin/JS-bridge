import {
    addCallback
} from './callbackPool'
import checkFunction from './checkFunction'
/**
 * 函数功能
 * @name downLoad
 * @author fzb 1360234119@qq.com
 * @description 接收应用层请求，添加回调，并发送给Native层
 * @const 无
 * @global 无
 * @param obj<Object>:开发中传入的参数
 * @return 无
 * @throws 无
 */
export default function(obj) {
    let callbackId = Math.floor(Math.random() * 2000000000)
    let type = 'downLoad'
    let send = {
        type: type,
        data: {
            name: '无名',
            singer: '未知',
            album: '未知',
            url: obj.url,
            songID: obj.songId
        },
        callbackId: callbackId
    }
    if (obj.name != undefined) {
        send.data.name = obj.name
    }
    if (obj.singer != undefined) {
        send.data.singer = obj.singer
    }
    if (obj.album != undefined) {
        send.data.album = obj.album
    }
    if (obj.url == undefined) {
        throw 'downLoad:url错误'
        return
    }
    if (obj.songId == undefined) {
        throw 'downLoad:songID错误'
        return
    }
    if (checkFunction(type, obj)) {
        addCallback(this, callbackId, type, obj.success, obj.fail, obj.complete)
        this.jsCallNative(send)
    }
}
