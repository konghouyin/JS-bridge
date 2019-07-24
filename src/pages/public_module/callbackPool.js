let callbackPool = {} // 回调集合管理
let now = 0 // 当前注册回调个数

export {
    addCallback,
    callbackApply
}

/**
 * 函数功能
 * @name addCallback
 * @author fzb 1360234119@qq.com
 * @description 暂存回调函数
 * @const 无
 * @global callbackPool:回调对象,now:当前回调存储个数
 * @param context:js-bridge实例, callbackId:回调ID号, type:回调类型, success, fail, complete:传入的回调函数
 * @return 无
 * @throws 无
 */

function addCallback(context, callbackId, type, success, fail, complete) {
    if (now < context.length) {
        callbackPool[callbackId.toString()] = {
            success,
            fail,
            type,
            complete
        }
        now++
    } else {
        throw 'Error 回调数组超限'
    }
}

/**
 * 函数功能
 * @name callbackApply
 * @author fzb 1360234119@qq.com
 * @description 相应回调函数
 * @const 无
 * @global callbackPool:回调对象,now:当前回调存储个数
 * @param msg<Object>:Native层传入的信息,msg.style:回调状态
 * @return 无
 * @throws 未找到id:${id}对应的回调事件
 */
function callbackApply(msg) {
    let {
        callbackId: id,
        message: res,
        style
    } = msg
    if (!callbackPool[id]) {
        throw `Error 未找到id:${id}对应的回调事件`
    } else {
        if (style == 1) {
            if (callbackPool[id].success) {
                callbackPool[id].success(res, {
                    style,
                    id,
                    type: callbackPool[id].type
                })
            }
        } else {
            if (callbackPool[id].fail) {
                callbackPool[id].fail(res, {
                    style,
                    id,
                    type: callbackPool[id].type
                })
            }
        }
        if (callbackPool[id].complete) {
            callbackPool[id].complete(res, {
                style,
                id,
                type: callbackPool[id].type
            })
        }
        callbackPool[id] = null
        console.log(callbackPool)
        now--
    }
}
