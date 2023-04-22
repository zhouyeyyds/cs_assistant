<script lang="ts" setup>
import {useRouter} from "vue-router"
import { useCard } from "@/utils/home/useCard";

        const router=useRouter()
        const {type}=defineProps<{
            type:string
        }>()

        const {card,name}=useCard(type)
</script>

<template>
    <div class="mt-95px">
        <ul class="f-b-c flex-wrap p-0.625rem text-0.875rem">
            <li v-for="item,index in card"  :key="index" class="w-10.625rem h-8.75rem bg-white rounded-0.625rem f-b-c flex-col" :class="{'os':index==2,'ds':index==3}" @click="router.push({name:name,query:{id:index+1}})">
                <svg aria-hidden="true" class="w-6.25rem">
                    <use :href="item.svg" />
                </svg>
                <span>{{ item.titel }}</span>
                <span class="text-[#35a1fc]">{{item.length}} 题</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.os,.ds{
    margin-top: 1.8125rem;
}
</style>