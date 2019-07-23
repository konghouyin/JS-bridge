import {addCallback} from './callbackPool'

export default function (obj) {
    let callbackId = Math.floor(Math.random() * 2000000000)
    let type = 'showModal'
    let send = {
        type: type,
        data: {
            title:"",
            content:"asd",
            showCancel:true,
            cancelText:"abc",
            cancelColor:"#f40",
            confirmText:"dsf",
            confirmColor:"#f40"
        },
        callbackId: callbackId
    }
    addCallback(this, callbackId, type, obj.success, obj.fail, obj.complete)
    this.jsCallNative(send)
}
