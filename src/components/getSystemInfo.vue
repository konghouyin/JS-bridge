<template>
    <div class="wrap">
        <transition-group name="list-complete" tag="p" mode="out-in">
            <div class="message" v-if="!show" key="1">点击下方按钮获取系统信息</div>
            <div class="system" v-if="show" key="2">
                <div class="each">
                    <div class="name">手机品牌</div>
                    <div class="thing">{{msg.brand}}</div>
                </div>
                <div class="each">
                    <div class="name">手机型号</div>
                    <div class="thing">{{msg.model}}</div>
                </div>
                <div class="each">
                    <div class="name">系统版本</div>
                    <div class="thing">{{msg.system}}</div>
                </div>
                <div class="each">
                    <div class="name">系统语言</div>
                    <div class="thing">{{msg.language}}</div>
                </div>
                <div class="each">
                    <div class="name">屏幕宽度</div>
                    <div class="thing">{{msg.screenWidth}}</div>
                </div>
                <div class="each">
                    <div class="name">屏幕高度</div>
                    <div class="thing">{{msg.screenHeight}}</div>
                </div>
                <div class="each">
                    <div class="name">显示区宽度</div>
                    <div class="thing">{{msg.windowWidth}}</div>
                </div>
                <div class="each">
                    <div class="name">显示区高度</div>
                    <div class="thing">{{msg.windowHeight}}</div>
                </div>
                <div class="each">
                    <div class="name">DPR</div>
                    <div class="thing">{{msg.pixelRatio}}</div>
                </div>
                <div class="each">
                    <div class="name">状态栏的高度</div>
                    <div class="thing">{{msg.statusBarHeight}}</div>
                </div>
                <div class="each">
                    <div class="name">wifi状态</div>
                    <div class="thing">{{msg.wifiEnabled}}</div>
                </div>
                <div class="each">
                    <div class="name">定位状态</div>
                    <div class="thing">{{msg.locationEnabled}}</div>
                </div>
                <div class="each">
                    <div class="name">蓝牙状态</div>
                    <div class="thing">{{msg.bluetoothEnabled}}</div>
                </div>
                <div class="each">
                    <div class="name">相机权限</div>
                    <div class="thing">{{msg.cameraAuthorized}}</div>
                </div>
                <div class="each">
                    <div class="name">相册权限</div>
                    <div class="thing">{{msg.albumAuthorized}}</div>
                </div>
                <div class="each">
                    <div class="name">定位权限</div>
                    <div class="thing">{{msg.locationAuthorized}}</div>
                </div>
                <div class="each">
                    <div class="name">录音权限</div>
                    <div class="thing">{{msg.microphoneAuthorized}}</div>
                </div>
                <div class="each">
                    <div class="name">推送权限</div>
                    <div class="thing">{{msg.notificationAuthorized}}</div>
                </div>
            </div>
            <div class="error" v-if="err">{{errMessage}}</div>
        </transition-group>
        <div class="buttom" @click="getSystemInfo()">获取手机系统信息</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                err: false,
                errMessage: '',
                show: false,
                msg: ''
            }
        },
        methods: {
            getSystemInfo() {
                this.show = true
                HN.getSystemInfo({
                    success: (res, style) => {
                        console.log(res)
                        this.msg = Object.assign({}, res)
                    },
                    fail: (res, style) => {
                        this.err = true
                        this.errMessage = res.err
                    },
                    complete: (res, style) => {
                        console.log('complete')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .wrap {
        padding: 20px;
        background-color: #fff;
        position: relative;
        overflow: hidden;
    }

    .each {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .each .thing,
    .each .name {
        font-size: 14px;
        display: inline-block;
        width: 49%;
        box-sizing: border-box;
        padding: 10px;
    }

    .buttom {
        margin-top: 25px;
        font-size: 14px;
        padding: 12px;
        display: block;
        background-color: #1AAC19;
        color: #fff;
        border-radius: 4px;
    }
    .message{
        position: absolute;
        left:0;
        width: 100%;
    }

    .message,
    .system {
        transition: all 1s;
        display: inline-block;
        width: 100%;
    }

    .list-complete-enter {
        opacity: 0;
        transform: translateY(100px);
    }

    .list-complete-enter-to {
        opacity: 1;
    }

    .list-complete-leave-active {
        position: absolute;
    }

    .list-complete-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
</style>
