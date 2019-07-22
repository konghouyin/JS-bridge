let timer
let callbackPool = {} // 回调集合管理
let now = 0 // 当前注册回调个数

export {
    addCallback,
    callbackApply
}

function addCallback(context, callbackId, type, success, fail, complete) {
    if (now < context.length) {
        if (now == 0) {
            timer = setInterval(timerCheck(context), context.time * 1000)
        }
        callbackPool[callbackId.toString()] = {
            success,
            fail,
            type,
            complete,
            point: new Date()
        }
        now++
    } else {
        throw 'Error 回调数组超限'
    }
}


function timerCheck(context) {
    if (now == 0) {
        clearInterval(timer)
        return
    }
    for (each in callbackPool) {
        if (new Date().getTime() - callbackPool[each].point.getTime() > context.time * 1000) {
            callbackPool[each].fail({
                err: '请求超时'
            }, {
                style: 0,
                each,
                type: callbackPool[each].type
            })
            callbackPool[each].complete({
                err: '请求超时'
            }, {
                style: 0,
                each,
                type: callbackPool[each].type
            })
            now--
            callbackPool[each] = null
            throw `Error 回调函数超时:${callbackPool[each].type}-${each}`
        }
    }
}


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
        now--
    }
}
