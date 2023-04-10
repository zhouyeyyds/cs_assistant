<template>
    <!-- 顶部导航 -->
  <Navbar></Navbar>
  <div class="mt-65px">
    <ul class="f-b-c flex-wrap p-10px text-14px">
        <li  class="w-170px h-140px bg-white rounded-10px f-b-c flex-col"  @click="router.push({name:'error',query:{id:1}})">
            <svg aria-hidden="true" class="w-100px">
                <use :href="'#icon-poco'" />
            </svg>
            <span>计组</span>
            <span class="text-[#35a1fc]">{{store.pocoErrorlist.length}} 题</span>
        </li>
        <li class="w-170px h-140px bg-white rounded-10px f-b-c flex-col" @click="router.push({name:'error',query:{id:2}})">
            <svg aria-hidden="true" class="w-100px">
                <use :href="'#icon-cnet'" />
            </svg>
            <span>计网</span>
            <span class="text-[#35a1fc]">{{store.cnetErrorlist.length}} 题</span>
        </li>
        <li class="w-170px h-140px bg-white rounded-10px f-b-c flex-col mt-13px" @click="router.push({name:'error',query:{id:3}})">
            <svg aria-hidden="true" class="w-100px">
                <use :href="'#icon-os'" />
            </svg>
            <span>操作系统</span>
            <span class="text-[#35a1fc]">{{store.osErrorlist.length}} 题</span>
        </li>
        <li class="w-170px h-140px bg-white rounded-10px f-b-c flex-col mt-13px" @click="router.push({name:'error',query:{id:4}})">
            <svg aria-hidden="true" class="w-100px">
                <use :href="'#icon-ds'" />
            </svg>
            <span>数据结构</span>
            <span class="text-[#35a1fc]">{{store.dsErrorlist.length}} 题</span>
        </li>
    </ul>
  </div>
</template>

<script setup>
import Navbar from "@/components/errorbook/Navbar.vue"
import {useRouter} from "vue-router"
import { mainstore } from '@/store/index';


    const store=mainstore()
    const router=useRouter()
</script>

<style>

</style>