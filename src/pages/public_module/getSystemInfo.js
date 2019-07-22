import {addCallback} from './callbackPool'

export default function (obj) {
    let callbackId = Math.floor(Math.random() * 2000000000)
    let type = 'getSystemInfo'
    let send = {
        type: type,
        data: null,
        callbackId: callbackId
    }
    addCallback(this, callbackId, type, obj.success, obj.fail, obj.complete)
    this.jsCallAndroid(send)
}
