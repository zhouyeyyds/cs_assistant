<template>
    <!-- 顶部导航 -->
    <div class="fixed left-0 top-0 flex items-center p-y-0 p-x-10px w-full h-60px bg-white text-15px z-999">
          <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
          <span class="m-l-30%">成绩分析</span>
          <slot></slot>
    </div>
  </template>
  
  <script setup>
  import {useRouter} from "vue-router"
        

        const router=useRouter()

        
  </script>
  
  <style scoped>
  .back{
          width: 44px;
          height: 44px;
          text-align: center;
          line-height: 44px;
      }
  </style>