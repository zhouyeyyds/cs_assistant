<script setup lang="ts">
import Button from "@/components/my/Button.vue"
import Details from "@/components/my/Details.vue"
import Tabbar from "@/components/tabbar/Tabbar.vue"
import { onMounted,ref} from "vue"
import { useMy } from "@/utils/my/useMy"
import { showToast } from "vant"

      const {greet,greetIndex,text,randIndex,getGreetByHour}=useMy()

      const loading = ref(false);
      const onRefresh = () => {
        setTimeout(() => {
          showToast('刷新成功');
          loading.value = false;
        }, 1000);
      };
     
      onMounted(()=>{
        getGreetByHour()
      })
</script>

<template>
    <!-- 顶部 -->
  <div class="top">
      <div class=" flex-col px-0.625rem">
        <span class="text-1.25rem text-[#fff] mb-0.3125rem">{{ greet[greetIndex] }}</span>
        <span class="text-0.875rem mb-0.3125rem text-[#fff]">{{ text[randIndex] }}</span>
        <span class="text-0.8125rem text-[#fff] mb-0.625rem">快去练习吧~</span>
      </div>
      <!--收藏数量和错题数量-->
      <Button></Button>
  </div>
  <!-- 下拉刷新 -->
  <van-pull-refresh v-model="loading" @refresh="onRefresh" style="min-height: 80vh;" :animation-duration="600" class="mt-20px">
      <!-- 详情信息 -->
      <Details></Details>
  </van-pull-refresh>
  
  <!-- 底部导航 -->
  <Tabbar></Tabbar>
</template>

<style scoped>
.top{
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 178px;
    margin-bottom: 20px;
    padding:  .625rem;
    padding-top: 30px;
    border-bottom-right-radius: .625rem;
    border-bottom-left-radius: .625rem;
    background: url("@/assets/img/bgi.jpg") no-repeat 50% 50%;
}
</style>