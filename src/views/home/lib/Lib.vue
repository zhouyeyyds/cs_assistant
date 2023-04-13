<script setup lang="ts">
import Navbar from '@/components/lib/Navbar.vue'
import {useRouter} from "vue-router"
import { mainstore } from '@/store/index';


        const store=mainstore()
        const router=useRouter()
</script>

<template>
    <!-- 顶部导航 -->
    <Navbar></Navbar>
    <div class="mt-4.0625rem">
        <ul class="f-b-c flex-wrap p-0.625rem text-0.875rem">
            <li  class="w-10.625rem h-8.75rem bg-white rounded-0.625rem f-b-c flex-col"  @click="router.push({name:'liblist',query:{id:1}})">
                <svg aria-hidden="true" class="w-6.25rem">
                    <use :href="'#icon-poco'" />
                </svg>
                <span>计组</span>
                <span class="text-[#35a1fc]">{{store.pocoList.length}} 题</span>
            </li>
            <li class="w-10.625rem h-8.75rem bg-white rounded-0.625rem f-b-c flex-col" @click="router.push({name:'liblist',query:{id:2}})">
                <svg aria-hidden="true" class="w-6.25rem">
                    <use :href="'#icon-cnet'" />
                </svg>
                <span>计网</span>
                <span class="text-[#35a1fc]">{{store.cnetList.length}} 题</span>
            </li>
            <li class="w-10.625rem h-8.75rem bg-white rounded-0.625rem f-b-c flex-col mt-0.8125rem" @click="router.push({name:'liblist',query:{id:3}})">
                <svg aria-hidden="true" class="w-6.25rem">
                    <use :href="'#icon-os'" />
                </svg>
                <span>操作系统</span>
                <span class="text-[#35a1fc]">{{store.osList.length}} 题</span>
            </li>
            <li class="w-10.625rem h-8.75rem bg-white rounded-0.625rem f-b-c flex-col mt-0.8125rem" @click="router.push({name:'liblist',query:{id:4}})">
                <svg aria-hidden="true" class="w-6.25rem">
                    <use :href="'#icon-ds'" />
                </svg>
                <span>数据结构</span>
                <span class="text-[#35a1fc]">{{store.dsList.length}} 题</span>
            </li>
        </ul>
    </div>
</template>

<style>

</style>