<template>
    <!-- 顶部导航 -->
    <div class="fixed left-0 top-0 flex items-center p-y-0 p-x-10px w-full h-60px bg-white text-15px z-999">
            <van-icon name="arrow-left" class="back" @click="goback"/>
            <span class="m-l-30%">考试成绩</span>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router"
import {useTestStore} from '@/store/useTestStore/testStore'

        const router=useRouter()
        const testStore=useTestStore()

        // 返回测试主页面
        const goback=()=>{
            router.push({name:'test'});
            testStore.errorList=[]//清空本次错题
        }
</script>

<style scoped>

</style>