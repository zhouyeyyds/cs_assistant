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
  <div class="fixed left-0 top-0 flex items-center p-y-0 p-x-10px w-full h-60px bg-white text-15px z-999">
        <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
        <span class="m-l-30%">错题本</span>
        <span class="ml-100px w-44px h-44px center" @click="showpop=true" v-show="index">清空</span>
  </div>
  <!-- 提示清空 -->
  <van-popup v-model:show="showpop" :style="{ padding: '20px' ,width:'70%',height:'23%'}" round> 
      <div class="flex flex-col justify-between w-100% h-100%">
        <span class="text-14px">确认清空错题本嘛？</span>
        <div class="text-14px ml-130px" >
          <span class="text-red"  @click="showpop=false">取消</span>
          <span class="ml-30px text-red" @click="clearAllError">确认</span>
        </div>
      </div>
  </van-popup>
</template>

<style scoped>

</style>