<template>
    <van-tabbar route>
      <!--首页开始 -->
          <van-tabbar-item replace to="/" >
            <div flex flex-col justify-between items-center>
              <i class="iconfont icon-shouye icon" ></i>
              <span mt-1>首页</span>
            </div>
          </van-tabbar-item>
          <!-- 首页结束 -->
  
          <!-- 考试开始 -->
          <van-tabbar-item replace to="/test">
            <div flex flex-col justify-between items-center>
              <i class="iconfont icon-kaoshi icon" ></i>
              <span mt-1>考试</span>
            </div>
          </van-tabbar-item>
          <!-- 考试结束 -->
  
          <!-- 我的开始 -->
          <van-tabbar-item replace to="/my">
            <div flex flex-col justify-between items-center >
              <i class="iconfont icon-wode1 icon"></i>
              <span mt-1>我的</span>
            </div>
          </van-tabbar-item>
          <!-- 我的结束 -->
      </van-tabbar>
  </template>
  
  <script setup lang="ts">


  </script>
  
  <style  scoped>
    .icon{
      font-size: 1.5626rem;
    }
  
  </style>