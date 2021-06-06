<template>
    <div class="event-main" v-cloak>
        <span class="event-begin"></span>
        <div class="event-con">
            <span class="event-line"></span>
            <ul>
                <li class="event-beginc"></li>
                <li class="event-item clearfix" v-for="(event, i) of events" :key="i">
                    <span class="event-time">{{ event.minute }}</span>
                    <ul class="event-text left" v-if="event.teamAEvents.length">
                        <li class="event-text-item" v-for="left of event.teamAEvents" :key="left.person">
                            <span class="text-name">
                                {{ left.person }}
                            </span>
                            <span class="icon" :style="`background-image: url(${left.event_pic})`"></span>
                        </li>
                    </ul>
                    <ul class="event-text right" v-if="event.teamBEvents.length">
                        <li class="event-text-item" v-for="right of event.teamBEvents" :key="right.person">
                            <span class="icon" :style="`background-image: url(${right.event_pic})`"></span>
                            <span class="text-name">
                                {{ right.person }}
                            </span>
                        </li>
                    </ul>
                </li>
                <li class="event-endc"></li>
            </ul>
        </div>
        <span class="event-end"></span>
    </div>
</template>

<script lang="ts">
    import { defineComponent, Ref } from 'vue';

    export default defineComponent({
        name: 'MatchLine',
        props: {
            events: Object
        }
    })
</script>

<style scoped lang="scss">
    .event-main {
        padding: 10px 0;
        background: #f7f7f7;
    }

    .event-begin {
        display: block;
        width: 18px;
        height: 18px;
        margin: 0 auto;
        margin-bottom: 5px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUxpcUuxUEuxUEuxUEq0UkuwUUuwUEewUkuxUEyxUEuxUUuxUE2xUEuxUUyyT0uxUUuxT0uwUk2xTU2xUUuxUUyxUZG/AdcAAAAVdFJOUwDNptgV2zIH92bIm1nvIcR2RBdFd2YIQzYAAAENSURBVDjLnZTrsoMgDIS5J2gRW7vv/6oHTy+DhDK2+afzkSVhE6WqWKLRiTlpExfVj0tGFfnSQa4WYBODI3IhGgbstUFoBnyk6kf0wEw14ybwnZpzK2NyFWPhg7xB8LBviiboW6+Um8b0yj/Du37BzmN+1gU+aOVcKTIeNVqsh+NA9bHC/vcQnj5D5LF3NSOqz5CKKOoLEo0gSlgKadQIUqYomVathfYsGmEMBWiV4MaQQ1IMGkMEfkO14wT0kqugLOTkxVvDlIvLFjSxt0A2s4k9i3yWxsX7s8gHbtVyzyrHRA+rCNMd4mk6Yd9D/Yzt/CCcG6lTw1koDV47Y67dtwujxCZXz/bbEhutwz8RmxLbk5pAcQAAAABJRU5ErkJggg==);
        background-repeat: no-repeat;
        background-size: 18px 18px;
    }

    .event-con {
        position: relative;
    }

    .event-line {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 2px;
        background: $green;
    }

    .event-con ul {
        position: relative;
    }

    .event-beginc, .event-endc {
        display: block;
        margin: 0 auto;
        background: $green;
        width: 8px;
        height: 8px;
        line-height: 8px;
        border-radius: 50%;
    }

    .event-beginc {
        margin-bottom: 12px;
    }

    .event-item {
        position: relative;
        padding: 0 12px;
        margin-bottom: 20px;
    }

    .event-time {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        color: #fff;
        background: #16b13a;
        text-align: center;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        transform: scale(.675);
        margin-top: -2px;
        font-size: 14px;
    }

    .event-text {
        width: 134.5px;
        padding: 10px;
        border: 1px solid #e6e7e8;
        border-radius: 4px;
        background: #fff;
        &.left {
            float: left;
            &::before {
                right: -11px;
                border-left-color: #e6e7e8;
            }
        }
        &.right {
            float: right;
            &::before {
                left: -11px;
                border-right-color: #e6e7e8;
            }
        }
        &::before {
            content: "";
            position: absolute;
            top: 5px;
            border: 5px solid transparent;
        }
    }

    .left {
        .event-text-item {
            text-align: right;
        }
        .text-name {
            margin-right: 5px;
        }
    }

    .right {
        .event-text-item {
            text-align: left;
        }
        .text-name {
            margin-left: 5px;
        }
    }

    .event-text-item {
        font-size: 0;
        margin-bottom: 7px;
        .icon {
            display: inline-block;
            width: 14px;
            height: 14px;
            background-repeat: no-repeat;
            background-position: 50%;
            vertical-align: top;
            background-size: 14px auto;
        }
    }

    .text-name {
        font-size: 12px;
    }

    .event-end {
        display: block;
        width: 19px;
        height: 19px;
        margin: 0 auto;
        margin-top: 6px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAnCAMAAABUv8o5AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUxpcRWwORWxORWxORWxORaxORewOxSwOhWxOR61PhWxORWxORWwOBWxORWwORWxORWxOhWwOhWxOhWxORWxOBWxORWxORWxORaxOtnpvmAAAAAYdFJOUwBN4ba+8B0Q+QdxkS6a6oE5eyjIRtdepbE0IPwAAAFWSURBVDjLnZTZtoMgDEWVQYIg1mp7z/9/6bUFB1JKu5oXhxXCzsnQNHW7d81nu86QH52MIwCXupPtNfQ0Yq56tTdg6Bp7w70CJQHln+4IpgIltiASrgJl98BE14LXEqEOcwVRHlBzroEJaCtQJ4Y5/xFAB1S0y4PBMKg/VkIzMAa/QoGCGv258AG6P4dW2E1tp/2ch7duDTS0nbVdO+iVxaZ0bssZQIGOU2YiKPO4L0/HKogzUOMF1Aoh83QcBMuvE4Bgkl5AntfCExb2S2J8LewExYoInTRuVQgyBbEBV3ZuiC9jVC2FHjCxOyNrC+qN6Wn/zLtHIKap8KxKn6A6iMxNw6bnE9FARzjQL25fXrqlsNRT2AWZoiCuLMgh7yJDUKmSRjN5vyzWu9K/LKJiI70uhGJb2sJmWZt8NKzJS8tlHRl9Ghln36yq4gAWF98oA/Fx3u0fipQYezDFkboAAAAASUVORK5CYII=);
        background-repeat: no-repeat;
        background-size: 19px 19px;
    }
</style>