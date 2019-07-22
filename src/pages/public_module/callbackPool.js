let timer

function addCallback(context, callbackId, type, success, fail, complete) {
    if (context.now < context.length) {
        if (context.now == 0) {
            timer = setInterval(timerCheck(context), context.time * 1000);
        }
        context.callbackPool[callbackId] = {
            success,
            fail,
            type,
            complete,
            point: new Data()
        }
        context.now++;
    } else {
        throw 'Error 回调数组超限'
    }
}


function timerCheck(context) {
    if (context.now = 0) {
        clearInterval(timer);
    }
    for (each in context.callbackPool) {
        if (new Data().getTime() - context.callbackPool[each].point.getTime() > context.time * 1000) {
            context.callbackPool[each].fail();
            context.callbackPool[each].complete();
            context.now--;
            throw `Error 回调函数超时:${context.callbackPool[each].type}-${each}`
        }
    }
}
