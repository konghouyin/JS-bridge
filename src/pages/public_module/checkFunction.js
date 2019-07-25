/**
 * 函数功能
 * @name checkFunction
 * @author fzb 1360234119@qq.com
 * @description 检查函数的合法性
 * @const 无
 * @global 无
 * @param type：接口名称，用于抛出错误 obj<Object>:开发中传入的参数
 * @return 当函数不为空,并且不是函数，将停止发送请求
 * @throws success不是函数
 */
export default function checkFunction(type, obj) {
    if (obj.success != undefined && !obj.success instanceof Function) {
        throw type + 'success不是函数'
        return false
    }
    if (obj.fail != undefined && !obj.fail instanceof Function) {
        throw type + 'fail不是函数'
        return false
    }
    if (obj.complete != undefined && !obj.complete instanceof Function) {
        throw type + 'complete不是函数'
        return false
    }
    return true
}
