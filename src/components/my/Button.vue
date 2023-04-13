<template>
  <div class="f-b-c text-0.875rem px-0.625rem ">
        <div class="flex items-center -ml-2.1875rem">
            <li class="flex flex-col items-center ml-0.625rem w-3.75rem text-0.75rem" @click="router.push({name:'collect'})">
            <span>{{ collectcount }}</span>
            <span>收藏</span>
            </li>
            <li class="flex flex-col items-center ml-0.625rem w-3.75rem text-0.75rem" @click="router.push({name:'errorbook'})">
            <span>{{ falsecount }}</span>
            <span>错题</span>
            </li>
        </div>
        <!-- 设置按钮 -->
        <span class="f-b-c w-2.5rem h-1.5625rem rounded-full border-0.0625rem border-solid border-[#fff]" @click="router.push({name:'setting'})">
            <van-icon name="setting-o" class="text-1.125rem ma"/>
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