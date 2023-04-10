<template>
    <!-- 顶部开始 -->
    <header position-fixed left-0 top-0 flex justify-between items-center h-60px  p-x-10px bg-white border-b class="border-b-[#efefef] w-100%">
      <!-- 搜索框 -->
      <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      @click="router.push({name:'search'})"
      input-align="center"
      class="w-100%"
    />
    </header>
    <!-- 顶部结束 -->

    <!-- 标签栏开始 -->
    <div class="mt-60px mb-40px shadow-lg">
      <van-tabs v-model:active="active" swipeable  lazy-render >
        <van-tab title="计组" class="my-15px px-20px">
          <img src="@/assets/img/jz.png" class="w-100% h-190px rounded-10px">
        </van-tab>
        <van-tab title="计网" class="my-15px px-20px">
          <img src="@/assets/img/jw.jpg" class="w-100% h-190px rounded-10px">
        </van-tab>
        <van-tab title="操作系统" class="my-15px px-20px">
          <img src="@/assets/img/czxt.jpg" class="w-100% h-190px rounded-10px">
        </van-tab>
        <van-tab title="数据结构" class="my-15px px-20px">
          <img src="@/assets/img/sjjg.jpg" class="w-100% h-190px rounded-10px">
        </van-tab>
      </van-tabs>
    </div>
    <!-- 标签栏结束 -->

    <!-- 功能模块开始 -->
    <div class="flex justify-around items-center flex-wrap text-16px">
      <div class=" w-150px h-100px bg-white rounded-10px  center lib" @click="router.push({name:'lib'})">
        浏览题库
      </div>
      <div class="w-150px h-100px bg-white rounded-10px  center bookmark" @click="router.push({name:'collect'})">
        收藏夹
      </div>
      <div class="w-150px h-100px bg-white rounded-10px  center mt-20px errorbook" @click="router.push({name:'errorbook'})">
        错题本
      </div>
      <div class="w-150px h-100px bg-white rounded-10px  center mt-20px study" @click="router.push({name:'analysis'})">
        成绩分析
      </div>
    </div>
    <!-- 功能模块结束 -->
    <!-- 底部导航 -->
    <Tabbar></Tabbar>
</template>

<script lang="ts" setup>
import Tabbar from "@/components/tabbar/Tabbar.vue"
import { ref,onMounted } from "vue";
import {useRouter } from "vue-router";
import { mainstore } from "@/store";
import {getlist}  from "@/request/api/test"  //请求题目的接口


      const router=useRouter();
      const store=mainstore();

      const active=ref(0)

      onMounted(async ()=>{
        // 访问数据库 请求数据
            if(store.pocoList.length==0){
              store.pocoList=(await getlist(1)).data;
              store.cnetList=(await getlist(2)).data;
              store.osList=(await getlist(3)).data;
              store.dsList=(await getlist(4)).data;
            }
      })

</script>

<style scoped>
.lib{
  background: url("@/assets/img/history.png")  center no-repeat ;
  background-size: auto;
  background-size: cover;
}
.bookmark{
  background: url("@/assets/img/collect.png")  center no-repeat ;
  background-size: auto;
  background-size: cover;
}
.errorbook{
  background: url("@/assets/img/collect.png")  center no-repeat ;
  background-size: auto;
  background-size: cover;
}
.study{
  background: url("@/assets/img/study.png")  center no-repeat ;
  background-size: auto;
  background-size: cover;
}
</style>