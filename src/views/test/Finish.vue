<script setup lang="ts">
import Navbar from "@/components/test/simulate/Navbar.vue"
import { onMounted, reactive,ref} from "vue"
import { useRoute,useRouter } from "vue-router";
import { useTestStore } from "@/store/useTestStore/testStore";

        const route=useRoute();
        const router=useRouter()
        const testStore=useTestStore()

        const customColors =reactive([
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 },
            ]);
        const grade:number=Number(route.query.garde)//得分
        const level=grade<60?0://成绩等级
                    grade<80?1:
                    2;
        const time:number=Number(route.query.time)//所用的时间
        const min=Math.floor(time/1000/60)
        const second=Math.ceil(time/1000%60);

        // 返回测试主页面
        const goback=()=>{
            router.push({name:'test'});
            testStore.errorList=[]//清空本次错题
        }

</script>

<template>
 <!-- 顶部导航 -->
  <Navbar></Navbar>
  <!-- 成绩详情 -->
  <div class="w-100% h-300px  mt-60px -z-1 f-b-c " :class="{'pass':level!=0,'nopass':level==0}">
    <el-progress type="dashboard" :percentage="grade" status="success" :color="customColors" class="ma" :indeterminate="true" :duration="5" :width="200">
        <div class="text-[#fff] f-b-c flex-col text-12px">
            <span>用时：{{min}}分{{second}}秒</span>
            <span class="mt-10px text-20px mb-10px">{{ grade}}</span>
            <span v-show="level==0">不及格</span>
            <span v-show="level==1">良好</span>
            <span v-show="level==2">优秀</span>
        </div>
    </el-progress>
  </div>
  <div class="mt-110px f-b-c flex-col h-80px text-13px">
    <div class="h-44px text-center mb-20px" @click="router.push({name:'curerror'})">查看本次错题</div>
    <div class="h-44px text-center" @click="goback">退出测验</div>
  </div>
</template>

<style scoped>
.pass{
    background-color: #5cb87a;
}
.nopass{
    background-color: #ed5320;
}
</style>