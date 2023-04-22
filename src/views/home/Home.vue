<script lang="ts" setup>
import TopSearch from "@/components/home/TopSearch.vue";
import Tabbar from "@/components/tabbar/Tabbar.vue"
import { onMounted,ref } from "vue";
import { useRouter } from "vue-router";
import {useHome} from "@/utils/home/useHome"
import type { TabsInstance } from 'vant';
import type { SwipeInstance } from 'vant';


    const router=useRouter();

    const tabsRef = ref<TabsInstance>();//获取标签栏的实例对象
    const swipeRef = ref<SwipeInstance>();//获取轮播图的实例对象

    const {data,getAllList,active,tabs,loading,onRefresh}=useHome();// 引入hook

    const swipeChange=(index:number)=> tabsRef.value?.scrollTo(index);

    const tabChange=()=> swipeRef.value?.swipeTo(active.value);
    
    onMounted(()=>{
      getAllList()// 访问数据库 请求数据
    })
</script>

<template>
    <!-- 顶部搜索框 -->
    <TopSearch></TopSearch>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="loading" @refresh="onRefresh" class="mt-70px mb-40px"  :animation-duration="700" style="min-height: 85vh;">

        <!-- 标签栏 -->
        <van-tabs v-model:active="active" scrollspy sticky ref="tabsRef" @click-tab="tabChange" class="mb-10px">
          <van-tab v-for="item,index in tabs" :title="item" :key="index">
          </van-tab>
        </van-tabs>

        <!-- 轮播图 -->
        <van-swipe class="shadow-lg" :autoplay="3000" indicator-color="white" @change="swipeChange" ref="swipeRef">
          <van-swipe-item>
            <img src="@/assets/img/jz.png" class="w-100% h-250px rounded-10px">
          </van-swipe-item>
          <van-swipe-item>
            <img src="@/assets/img/jw.jpg" class="w-100% h-250px rounded-10px">
          </van-swipe-item>
          <van-swipe-item>
            <img src="@/assets/img/czxt.jpg" class="w-100% h-250px rounded-10px">
          </van-swipe-item>
          <van-swipe-item>
            <img src="@/assets/img/sjjg.jpg" class="w-100% h-250px rounded-10px">
          </van-swipe-item>
        </van-swipe>

        <!-- 功能模块 -->
        <div class="flex justify-around items-center flex-wrap text-1rem mt-90px">
          <div class=" w-9.375rem h-6.25rem bg-white rounded-0.625rem  center"  v-for="item,index in data" :key="index" :class="item.key" @click="router.push({name:item.key})">
            {{ item.name }}
          </div>
        </div>
    </van-pull-refresh>
  
    <!-- 底部导航 -->
    <Tabbar></Tabbar>
</template>


<style scoped>
.lib{
  background: url("@/assets/img/history.png")  center no-repeat ;
  background-size: auto;
  background-size: cover;
}
.collect{
  background: url("@/assets/img/collect.png")  center no-repeat ;
  background-size: auto;
  background-size: cover;
}
.errorbook{
  background: url("@/assets/img/collect.png")  center no-repeat ;
  background-size: auto;
  background-size: cover;
  margin-top: 2.25rem;
}
.analysis{
  background: url("@/assets/img/study.png")  center no-repeat ;
  background-size: auto;
  background-size: cover;
  margin-top: 2.25rem;
}
</style>