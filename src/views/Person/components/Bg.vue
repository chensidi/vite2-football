<template>
    <div class="bg-info">
        <van-icon name="arrow-left" class="back" @click="back" />
        <div class="head">
            <div class="head-img">
                <img :src="bgInfo.personImgUrl" alt="">
                <img v-if="bgInfo.clubImgUrl" class="team-logo" :src="bgInfo.clubImgUrl" alt="">
            </div>
            <h4>{{ bgInfo.name }}</h4>
            <p>{{ bgInfo.enName }}</p>
            <p>
                身   高：{{ bgInfo.height }} / 体   重：{{ bgInfo.weight }} / {{ bgInfo.country }} <img class="country-logo" :src="bgInfo.countryImgUrl" alt="">
            </p>
            <div class="bottom-info">
                <span class="van-hairline--right">{{ bgInfo.age }}</span>
                <span>{{ bgInfo.club }} / {{ bgInfo.number }}</span>
                <span class="van-hairline--left">{{ bgInfo.position }} / {{ bgInfo.useFoot }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'PersonBg',
    props: {
        bgInfo: {}
    },
    setup(props: any) {
        
        const bgInfo = computed(() => props.bgInfo);
        const { back } = useRouter();

        return {
            bgInfo,
            back,
        }
    },
})
</script>

<style lang="scss" scoped>
    .bg-info {
        position: relative;
        background: $green;
        color: $gray2;
        font-size: 12px;
        padding: 20px 10px 10px;
        .back {
            position: absolute;
            left: 5px;
            top:10px;
            color: #fff;
            font-size: 18px;
        }
        .head {
            text-align: center;
            .head-img {
                width: 50px;
                height: 50px;
                display: block;
                margin: auto;
                position: relative;
                img {
                    width: 100%;
                    border-radius: 50%;
                    &.team-logo {
                        position: absolute;
                        width: 18px;
                        height: 18px;
                        bottom: 0px;
                        right: -5px;
                    }
                }
            }
            h4 {
                font-size: 14px;
                line-height: 2;
                margin-top: 5px;
            }
            p {
                font-size: 12px;
                color: $gray2;
                line-height: 2;
            }
            .country-logo {
                width: 20px;
                vertical-align: middle;
            }
            .bottom-info {
                display: flex;
                margin: 10px 0;
                span {
                    flex: 1;
                    &:nth-child(2) {
                        flex: 2;
                    }
                }
            }
        }
    }
</style>