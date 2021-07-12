<template>
    <div v-cloak>
        <PersonBg :bgInfo="bgInfo" />
        <van-tabs v-model:active="active" sticky>
            <van-tab title="数据">
                <DataCard :matchData="matchData" />
            </van-tab>
            <van-tab title="能力值">
                <div>
                    <h3 class="average">综合能力 <span>{{ bgInfo.average }}</span></h3>
                    <PersonChart :chartInfo="chartInfo" />
                    <GradInfo :skillInfo="skillInfo" />
                </div>
            </van-tab>
            <van-tab title="荣誉">
                <HornorGrid :hornorData="hornorData" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, defineAsyncComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import personApi from '@/api/person';
import { UILoading, UILoaded } from '@/utils/ui';

interface bgInfoShape {
    name?: string,
    enName?: string,
    clubImgUrl?: string,
    countryImgUrl?: string,
    personImgUrl?: string,
    height?: string,
    weight?: string,
    country?: string,
    age?: string,
    club?: string,
    number?: string,
    position?: string,
    useFoot?: string
    average?: string
}

interface skillShap {
    useFootImg?: string,
    countryKnown?: number,
    uselessFoot?: number,
    showSkill?: number,
}

export default defineComponent({
    components: {
        PersonBg: defineAsyncComponent(() => import('./components/Bg.vue')),
        PersonChart: defineAsyncComponent(() => import('./components/Chart.vue')),
        GradInfo: defineAsyncComponent(() => import('./components/GradInfo.vue')),
        HornorGrid: defineAsyncComponent(() => import('./components/HornorGrid.vue')),
        DataCard: defineAsyncComponent(() => import('./components/DataCard.vue'))
    },
    setup() {
        const { params: {id} } = useRoute();

        const bgInfo: bgInfoShape = reactive({}); //背景信息
        const skillInfo:skillShap = reactive({}); //技巧能力
        const chartInfo: Ref<any> = ref([]);
        const matchData: Ref<any> = ref([]);
        const hornorData: Ref<any> = ref([]);
        const getPersonInfo = async () => {
            UILoading();
            const res = await personApi.getPersonInfo(id as string);
            console.log(res);
            bgInfo.name = res.basicInfo.name;
            bgInfo.enName = res.basicInfo.enName;
            bgInfo.clubImgUrl = res.basicInfo.clubImgUrl;
            bgInfo.countryImgUrl = res.basicInfo.countryImgUrl;
            bgInfo.personImgUrl = res.basicInfo.personImgUrl;
            bgInfo.height = res.basicInfo.otherInfo.height;
            bgInfo.weight = res.basicInfo.otherInfo.weight;
            bgInfo.country = res.basicInfo.otherInfo.country;
            bgInfo.age = res.basicInfo.otherInfo.age;
            bgInfo.club = res.basicInfo.otherInfo.club;
            bgInfo.number = res.basicInfo.otherInfo.number;
            bgInfo.position = res.basicInfo.otherInfo.position;
            bgInfo.useFoot = res.basicInfo.otherInfo.useFoot;
            bgInfo.average = res.basicInfo.average;

            skillInfo.useFootImg = res.desc.useFootImg;
            skillInfo.showSkill = res.desc.showSkill;
            skillInfo.uselessFoot = res.desc.uselessFoot;
            skillInfo.countryKnown = res.desc.countryKnown;

            chartInfo.value = res.chartInfo;
            matchData.value = res.matchData;
            hornorData.value = res.hornorData;
            UILoaded(500);
        }

        getPersonInfo();

        const active = ref(1);

        return {
            bgInfo,
            skillInfo,
            chartInfo,
            active,
            matchData,
            hornorData
        }
    },
})
</script>

<style lang="scss" scoped>
    .average {
        text-align: center;
        padding: 10px 0;
        font-weight: 600;
        font-size: 20px;
        span {
            color: $red;
        }
    }
</style>
