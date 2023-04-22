<script setup lang="ts">
import Tabbar from "@/components/tabbar/Tabbar.vue"
import {ref,reactive, watch, onMounted, onUnmounted,} from "vue"
import { useRouter } from "vue-router"
import {mainstore} from "@/store/index"
import type { TabsInstance } from 'vant';
import { showToast } from "vant";

      const store=mainstore();
      const router=useRouter();
      const tabsRef = ref<TabsInstance>();//获取标签栏的实例对象

      const customColors =reactive([
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ]);
      const index=ref(0); 
      const namearr=ref<string[]>(["计算机组成原理","计算机网络","操作系统","数据结构"])
      const showpop=ref(false);

      // 前往具体练习页面
      const gopractice=()=>{
        router.push({name:"practice",query:{id:Number(index.value+1)}})
      }

      // 开始测试
      const start=()=>{
        showpop.value=false;
        // 生成50个随机数
        while(store.randomList.length!=50){
          let num=Math.floor(Math.random()*store.list.length);
          if(!store.randomList.includes(num)){
            store.randomList.push(num)
          }
        }
        router.push({name:'simulate',query:{id:index.value+1}})
      }

      const loading = ref(false);
      const onRefresh = () => {
        setTimeout(() => {
          showToast('刷新成功');
          loading.value = false;
        }, 1000);
      };

      // 监视索引的变化 
     watch(index,(newval)=>{
        newval==0?store.list=store.pocoList:
        newval==1?store.list=store.cnetList:
        newval==2?store.list=store.osList:
        newval==3?store.list=store.dsList:0;
     },{immediate:true})

     onMounted(()=>{
      index.value=store.curIndex;
      tabsRef.value?.scrollTo(store.curIndex)//挂载的时候 切换到上一次的索引
     })

     onUnmounted(()=>{
        store.curIndex=index.value;//离开这个页面的时候 记录一下当前的索引
     })

</script>

<template>
    <div class="fixed left-0 top-0px flex-col f-b-c p-0.625rem w-100% h-90px text-1rem  navbar pt-20px" >
      <p class="text-1.125rem text-[#35a1fc]">当前科目 :</p>
      <span class="text-[#35a1fc]">{{ namearr[index] }}</span>
    </div>
    <!-- 标签栏 -->
    <div class="fixed left-0 top-91px w-100% mt-0.0625rem mb-0.125rem shadow-sm" >
        <van-tabs v-model:active="index" swipeable  lazy-render ref="tabsRef">
          <van-tab title="计组" class="my-0.9375rem px-1.25rem"/>
          <van-tab title="计网" class="my-0.9375rem px-1.25rem"/>
          <van-tab title="操作系统" class="my-0.9375rem px-1.25rem"/>
          <van-tab title="数据结构" class="my-0.9375rem px-1.25rem"/>
        </van-tabs>
    </div>
    <div class="mt-136px items-center flex-col p-0.625rem bg-white h-42.25rem scroll-auto">
      <van-pull-refresh v-model="loading" @refresh="onRefresh" style="min-height: 80vh;" :animation-duration="600">
      <!-- 练习进度条 -->
        <div class="m-y-4.25rem m-x-0.625rem" @click="gopractice">
            <el-progress type="circle" :percentage="store.count[index]/store.list.length*100" status="success" :color="customColors" :width="180" :indeterminate="true" :duration="5">
              <div class="flex-col">
                <span class="mt-0.625rem text-1.0625rem">{{ store.count[index]?store.count[index]:0}}/{{store.list.length}}</span>
                <span class="mt-0.625rem text-0.75rem ">顺序练习</span>
              </div>
            </el-progress>  
        </div>

        <!-- 测试进度条 -->
        <div class="m-y-4.25rem m-x-0.625rem" @click="showpop=true">
          <el-progress type="dashboard" :percentage="store.historyGrade[index]" status="success" :color="customColors" :width="180" :indeterminate="true" :duration="5">
            <div class="flex-col">
              <span class=" mt-0.625rem text-1.25rem ">{{ store.historyGrade[index]?store.historyGrade[index]:0 }}</span>
              <span class="mt-0.625rem text-0.75rem  ">模拟考试</span>
            </div>
          </el-progress>
        </div>
        
        <!-- 提示测验内容 -->
        <van-popup v-model:show="showpop" :style="{ padding: '1.25rem' ,width:'80%',height:'27%'}" round> 
          <div class="flex flex-col justify-between w-100% h-100%">
            <div>
              <span class="iconfont icon-kaoshi1"></span>
              <span class="ml-0.625rem">模拟考试</span>
            </div>
            <div class="text-0.875rem">考试时间：45分钟</div>
            <p class="text-0.875rem">内容：判断题 50题</p>
            <p class="text-0.875rem">总分：100分</p>
            <div class="text-0.875rem ml-10rem" >
              <span @click="showpop=false">取消</span>
              <span class="ml-1.875rem text-[#35a1fc]" @click="start">确认</span>
            </div>
          </div>
        </van-popup>
      </van-pull-refresh>
    </div>
    <!-- 底部导航 -->
    <Tabbar></Tabbar>
</template>

<style  scoped>

</style>