<template>
  <div class="f-b-c text-14px px-10px ">
        <div class="flex items-center -ml-35px">
            <li class="flex flex-col items-center ml-10px w-60px text-12px" @click="router.push({name:'collect'})">
            <span>{{ collectcount }}</span>
            <span>收藏</span>
            </li>
            <li class="flex flex-col items-center ml-10px w-60px text-12px" @click="router.push({name:'errorbook'})">
            <span>{{ falsecount }}</span>
            <span>错题</span>
            </li>
        </div>
        <!-- 设置按钮 -->
        <span class="f-b-c w-40px h-25px rounded-full border-1px border-solid border-[#fff]" @click="router.push({name:'setting'})">
            <van-icon name="setting-o" class="text-18px ma"/>
        </span>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { mainstore } from "@/store"
import { storeToRefs } from 'pinia'


      const store=mainstore();
      const router=useRouter();

      const {collectcount,falsecount}=storeToRefs(store)
</script>

<style>

</style>