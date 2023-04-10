<script setup lang="ts">
import Navbar from '@/components/collect/Navbar.vue'
import {useRouter} from "vue-router"
import { mainstore } from '@/store/index';


        const store=mainstore()
        const router=useRouter()
</script>

<template>
    <!-- 顶部导航 -->
    <Navbar></Navbar>
    <div class="mt-65px">
        <ul class="f-b-c flex-wrap p-10px text-14px">
            <li  class="w-170px h-140px bg-white rounded-10px f-b-c flex-col"  @click="router.push({name:'bookmarks',query:{id:1}})">
                <svg aria-hidden="true" class="w-100px">
                    <use :href="'#icon-poco'" />
                </svg>
                <span>计组</span>
                <span class="text-[#35a1fc]">{{store.pocoCollectlist.length}} 题</span>
            </li>
            <li class="w-170px h-140px bg-white rounded-10px f-b-c flex-col" @click="router.push({name:'bookmarks',query:{id:2}})">
                <svg aria-hidden="true" class="w-100px">
                    <use :href="'#icon-cnet'" />
                </svg>
                <span>计网</span>
                <span class="text-[#35a1fc]">{{store.cnetCollectlist.length}} 题</span>
            </li>
            <li class="w-170px h-140px bg-white rounded-10px f-b-c flex-col mt-13px" @click="router.push({name:'bookmarks',query:{id:3}})">
                <svg aria-hidden="true" class="w-100px">
                    <use :href="'#icon-os'" />
                </svg>
                <span>操作系统</span>
                <span class="text-[#35a1fc]">{{store.osCollectlist.length}} 题</span>
            </li>
            <li class="w-170px h-140px bg-white rounded-10px f-b-c flex-col mt-13px" @click="router.push({name:'bookmarks',query:{id:4}})">
                <svg aria-hidden="true" class="w-100px">
                    <use :href="'#icon-ds'" />
                </svg>
                <span>数据结构</span>
                <span class="text-[#35a1fc]">{{store.dsCollectlist.length}} 题</span>
            </li>
        </ul>
    </div>
</template>

<style>

</style>