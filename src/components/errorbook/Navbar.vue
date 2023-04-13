<script setup lang="ts">
import {useRouter} from "vue-router"
import { mainstore } from "@/store";
import { ref } from "vue";
      const router=useRouter()
      const store=mainstore()

      const props=defineProps(["index","test"])

      const showpop=ref(false)

      const clearAllError=()=>{
        showpop.value=false;
        props.index==1?store.pocoErrorlist=[]:
        props.index==2?store.cnetErrorlist=[]:
        props.index==3?store.osErrorlist=[]:
        props.index==4?store.dsErrorlist=[]:0

        props.test(props.index)
      }
</script>

<template>
  <!-- 顶部导航 -->
  <div class="fixed left-0 top-0 flex items-center p-y-0 p-x-0.625rem w-full h-3.75rem bg-white text-0.9375rem z-999">
        <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
        <span class="m-l-30%">错题本</span>
        <span class="ml-6.25rem w-2.75rem h-2.75rem center" @click="showpop=true" v-show="index">清空</span>
  </div>
  <!-- 提示清空 -->
  <van-popup v-model:show="showpop" :style="{ padding: '1.25rem' ,width:'70%',height:'23%'}" round> 
      <div class="flex flex-col justify-between w-100% h-100%">
        <span class="text-0.875rem">确认清空错题本嘛？</span>
        <div class="text-0.875rem ml-8.125rem" >
          <span class="text-red"  @click="showpop=false">取消</span>
          <span class="ml-1.875rem text-red" @click="clearAllError">确认</span>
        </div>
      </div>
  </van-popup>
</template>

<style scoped>

</style>