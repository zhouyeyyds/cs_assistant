<template>
    <!-- 顶部导航 -->
    <div class="w-100% h-11px bg-[#fff] z-999 fixed left-0 top-0"></div>
    <div class="fixed left-0 top-10px flex items-center p-y-0 p-x-0.625rem w-full h-3.75rem bg-white text-0.9375rem z-999">
            <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
            <span class="m-l-30%">收藏夹</span>
            <span class="ml-6.25rem w-2.75rem h-2.75rem center" @click="showpop=true" v-show="index">清空</span>
    </div>
    <!-- 提示清空 -->
    <van-popup v-model:show="showpop" :style="{ padding: '1.25rem' ,width:'70%',height:'23%'}" round> 
        <div class="flex flex-col justify-between w-100% h-100%">
        <span class="text-0.875rem">确认清空收藏夹嘛？</span>
        <div class="text-0.875rem ml-8.125rem" >
            <span @click="showpop=false">取消</span>
            <span class="ml-1.875rem text-[#35a1fc]" @click="clearAllCollect">确认</span>
        </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
import {ref} from "vue"
import { mainstore } from "@/store";

    const router=useRouter()
    const store=mainstore()
    const props=defineProps(["index","test"])

    const showpop=ref(false)

    // 清空收藏夹
    const clearAllCollect=()=>{
    showpop.value=false;
    props.index==1?store.pocoCollectlist=[]:
    props.index==2?store.cnetCollectlist=[]:
    props.index==3?store.osCollectlist=[]:
    props.index==4?store.dsCollectlist=[]:0

    props.test(props.index)
    }
</script>

<style scoped>

</style>