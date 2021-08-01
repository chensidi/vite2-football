<template>
    <span 
        class="more-btn" 
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        ref="morenav"
    >
        <van-icon name="more" />
    </span>
    <van-popup v-model:show="state.showPicker" round position="bottom">
        <van-picker
            :columns="columns"
            @cancel="state.showPicker = false"
            @confirm="onConfirm"
            :default-index="1" 
        />
    </van-popup>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'

export default defineComponent({
    setup(props, { emit }) {
        const morenav = ref();
        let key = false;
        
        let startStamp: number, endStamp: number;
        function touchstart(e: TouchEvent) {
            key = true;
            console.log(e.targetTouches[0]);
            const { pageX, pageY } = e.targetTouches[0];
            startStamp = Date.now();
        }
        
        function touchmove(e: TouchEvent) {
            e.stopImmediatePropagation()
            e.preventDefault()
            if (key) {
                morenav.value.style.top = e.touches[0].clientY - (h / 2) + 'px';
            }
        }

        function touchend() {
            key = false;
            endStamp = Date.now();
            if (endStamp - startStamp < 100) {
                state.showPicker = true;
            }
        }

        let w: number, h: number;
        onMounted(() => {
            w = morenav.value.getBoundingClientRect().width;
            h = morenav.value.getBoundingClientRect().height;
        })

        const columns = [
            {text: '中超', val: 'China'},
            {text: '英超',  val: 'England'},
            {text: '西甲', val: 'Spanish'},
            {text: '意甲', val: 'Italy'},
            {text: '德甲', val: 'Germany'},
            {text: '更多', val: 'More'},
            {text: '闲情', val: 'Leisure'},
        ];
        const state = reactive({
            value: '',
            showPicker: false,
        });

        const onConfirm = (value: {text: string, val: string}) => {
            state.value = value.val;
            state.showPicker = false;
            emit('changes', value.val);
        };

        return {
            touchstart,
            touchmove,
            touchend,
            morenav,
            state,
            columns,
            onConfirm
        }
    },
})
</script>

<style lang="scss" scoped>
     .more-btn {
        position: fixed;
        right: 0;
        top: 50%;
        z-index: 999;
        .van-icon {
            background: $white;
            border-radius: 50%;
            &::before {
                font-size: 30px;
            }
        }
    }
</style>
