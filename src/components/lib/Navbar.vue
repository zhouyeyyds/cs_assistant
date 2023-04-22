<template>
    <!-- 顶部导航 -->
    <div class="w-100% h-11px bg-[#fff] z-999 fixed left-0 top-0"></div>
    <div class="fixed left-0 top-10px flex items-center p-y-0 p-x-0.625rem w-full h-3.75rem bg-white text-0.9375rem z-999">
          <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
          <span class="m-l-30%">浏览试题</span>
          <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
const router=useRouter()
</script>

<style scoped>
</style>