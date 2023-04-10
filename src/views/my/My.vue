<script setup lang="ts">
import Button from "@/components/my/Button.vue"
import Func from "@/components/my/Func.vue"
import Tabbar from "@/components/tabbar/Tabbar.vue"
import { onMounted,ref } from "vue"



      const greet=["早上好","中午好","下午好","晚上好"];
      const greetIndex=ref(0)
      const dt=new Date;
      const hour=dt.getHours()

      // 根据当前时间决定问候语
      const getGreetByHour=()=>{
          if(hour<12){
            greetIndex.value=0
          }else if(hour<15){
            greetIndex.value=1
          }else if(hour<19){
            greetIndex.value=2
          }else{
            greetIndex.value=3
          }
      }


      const text=["玻璃晴朗，橘子辉煌。","不要停止奔跑，不要回顾来路，来路无可眷恋，值得期待的只有前方。",
        "你只管努力，剩下的交给时间。","希望熬过一切，星光璀璨。","愿星光为你加冕，青云与你同行，你是人间最美好的风与朝阳，是三百里柔软缠绵的乐章。"]
      const randIndex=Math.floor(Math.random()*text.length)
      
      onMounted(()=>{
        getGreetByHour()
      })
</script>

<template>
    <!-- 顶部 -->
  <div class="top">
      <div class=" flex-col px-10px">
        <span class="text-20px text-[#fff] mb-5px">{{ greet[greetIndex] }}</span>
        <span class="text-14px mb-5px text-[#fff]">{{ text[randIndex] }}</span>
        <span class="text-13px text-[#fff] mb-10px">快去练习吧~</span>
      </div>
      <!-- 下方部分 显示收藏数量和错题数量-->
      <Button></Button>
  </div>
  <!-- 详情信息模块 -->
  <Func></Func>
  <!-- 底部导航 -->
  <Tabbar></Tabbar>
</template>

<style scoped>
.top{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 148px;
    margin-bottom: 20px;
    padding:  10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background: url("@/assets/img/bgi.jpg") no-repeat 50% 50%;
}
</style>