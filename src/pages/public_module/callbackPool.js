let callbackPool = {} // 回调集合管理
let changePool = {} //
let now = 0 // 当前注册回调个数
let nowChange = 0 // 当前变化监控个数
export {
    addCallback,
    callbackApply,
    addContinuousCallback,
    continuousCallbackApply
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
        if (callbackPool[id].end) {
            callbackPool[id].end(res.continuousCallbackId);
        }
    }
    callbackPool[id] = null
    now--
}

/**
 * 函数功能
 * @name addContinuousCallback
 * @author fzb 1360234119@qq.com
 * @description 添加持久化id函数，保证可以接受的对应的change事件
 * @const 无
 * @global callbackPool:回调对象管理,now:当前回调存储个数,changePool持久化回调
 * @param context:js-bridge实例, callbackId:回调ID号, continuousCallbackId: 持久化函数id, type:回调类型, success, fail, complete:传入的回调函数,change: 持久化函数
 * @return 无
 * @throws 无
 */
function addContinuousCallback(context, callbackId, continuousCallbackId, type, success, fail, complete, change) {
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
    if (nowChange < context.length) {
        changePool[continuousCallbackId.toString()] = {
            type,
            change
        }
        nowChange++
    } else {
        throw 'Error change回调数组超限'
    }
}

/**
 * 函数功能
 * @name continuousCallbackApply
 * @author fzb 1360234119@qq.com
 * @description 持久化id相应回调函数
 * @const 无
 * @global changePool:回调对象,now:当前回调存储个数
 * @param msg<Object>:Native层传入的信息,
 * @return 无
 * @throws 未找到id:${id}对应的回调事件
 */
function continuousCallbackApply(msg) {
    let {
        callbackId: id,
        message: res,
    } = msg
    if (!changePool[id]) {
        throw `Error 未找到id:${id}对应的回调事件`
    } else {
        if (changePool[id].complete) {
            changePool[id].complete(res, {
                style,
                id,
                type: changePool[id].type
            })
        }
    }
}

/**
 * 函数功能
 * @name clearContinuousCallback
 * @author fzb 1360234119@qq.com
 * @description 修改complete函数，清除持久化id函数，，
 * @const 无
 * @global callbackPool:回调对象管理,now:当前回调存储个数,changePool持久化回调
 * @param context:js-bridge实例, callbackId:回调ID号, type:回调类型, success, fail, complete:传入的回调函数
 * @return 无
 * @throws 无
 */
function clearContinuousCallback(context, callbackId, continuousCallbackId, type, success, fail, complete, change) {
    if (now < context.length) {
        callbackPool[callbackId.toString()] = {
            success,
            fail,
            type,
            complete,
            end: function(continuousCallbackId) {
                changePool[continuousCallbackId] = null
                nowChange--;
            }
        }
        now++
    } else {
        throw 'Error 回调数组超限'
    }
}
