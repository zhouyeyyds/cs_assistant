<template>
    <div class="fixed left-0 top-0 flex items-center p-y-0 p-x-10px w-full h-60px bg-white text-15px">
        <van-icon name="arrow-left" class="back"  @click="router.go(-1)"/>
        <span class="m-l-30%">设置</span>
    </div>
    <div class="mt-62px text-14px p-10px rounded-10px bg-white">
        <ul>
            <li f-b-c h-45px class="mb-10px">
                <div class="f-b-c">
                    <span class="iconfont icon-shoucang mr-5px"></span>
                    <span>错题自动收藏</span>
                </div>
                <van-switch v-model="store.autoCollect" size="16px" />
            </li>
            <li f-b-c h-45px class="mb-10px" @click="showappreciate=true">
                <div class="f-b-c">
                    <span class="iconfont icon-icon mr-5px"></span>
                    <span>赞赏作者</span>
                </div>
                <van-icon name="arrow" class="back"/>
            </li>
            <li f-b-c h-45px @click="showpop=true">
                <div class="f-b-c">
                    <span class="iconfont icon-qingkong mr-5px"></span>
                    <span>清空数据</span>
                </div>
                <van-icon name="arrow" class="back"/>
            </li>
        </ul>
    </div>
    <!-- 提示清空数据 -->
    <van-popup v-model:show="showpop" :style="{ padding: '20px' ,width:'75%',height:'27%'}" round> 
        <div class="flex flex-col justify-between w-100% h-100%">
            <span class="text-14px">清空数据</span>
            <span class="text-14px">确认清空所有收藏内容和已回答答案？(此操作不可撤销)</span>
            <div class="text-14px ml-130px" >
                <span @click="showpop=false">取消</span>
                <span class="ml-30px text-red" @click="clearAllData">确认</span>
            </div>
        </div>
    </van-popup>

    <!-- 显示赞赏码 -->
    <van-popup v-model:show="showappreciate" :style="{ padding: '20px' ,width:'75%',height:'40%'}" round> 
        <div class="flex flex-col justify-between w-100% h-100%">
            <span class="text-14px mxa px-10px border-l-solid border-l-[#35a1fc]">您的支持是我们最大的动力</span>
            <img src="@/assets/img/appreciate.png" class="w-240px">
            <span class="text-14px mxa bg-[#e2e2e2] w-235px  h-40px text-[#35a1fc] center" @click="showappreciate=false">
                取消
            </span>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import {ref} from "vue"
import { useRouter } from 'vue-router';
import { mainstore } from "@/store";
import { useTestStore } from "@/store/useTestStore/testStore";
import {showToast} from "vant"


        const router=useRouter();
        const store=mainstore();
        const testStore=useTestStore()

        const showpop=ref(false)

        // 清空
        const clearAll=async ()=>{
            store.pocoCollectlist=[];
            store.cnetCollectlist=[];
            store.osCollectlist=[];
            store.dsCollectlist=[];
            store.pocoErrorlist=[];
            store.cnetErrorlist=[];
            store.osErrorlist=[];
            store.dsErrorlist=[];
            store.historyGrade=[];
            store.rightnum=[0,0,0,0,0,];
            store.falsenum=[0,0,0,0,0,];
            store.count=[0,0,0,0,0,];
            store.index=[0,0,0,0,0,];
            store.statuslist=[[]];
            store.answerlist=[[]];
            store.pannellist=[[]];
            testStore.pocoGrade=[0,0,0,0,0,0,0,];
            testStore.cnetGrade=[0,0,0,0,0,0,0,];
            testStore.osGrade=[0,0,0,0,0,0,0,];
            testStore.dsGrade=[0,0,0,0,0,0,0,];
            showpop.value=false;
        }
        
        // 清空仓库中的数据
        const clearAllData=async ()=>{
            await clearAll();
            showToast({
                message:"已清空所有数据",
                position:"bottom"
            })
        }

        const showappreciate=ref(false);

</script>

<style  scoped>
.icon-shoucang::before{
    font-size: 20px;
}
.icon-icon::before{
    font-size: 20px;
}
.icon-qingkong::before{
    font-size: 20px;
}
</style>