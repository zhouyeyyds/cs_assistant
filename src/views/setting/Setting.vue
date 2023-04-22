<template>
    <Navbar></Navbar>
    <div class="mt-82px text-0.875rem p-0.625rem rounded-0.625rem bg-white">
        <ul>
            <li f-b-c h-2.8125rem class="mb-0.625rem">
                <div class="f-b-c">
                    <span class="iconfont icon-shoucang mr-0.3125rem"></span>
                    <span>错题自动收藏</span>
                </div>
                <van-switch v-model="store.autoCollect" size="1rem" />
            </li>
            <li f-b-c h-2.8125rem class="mb-0.625rem" @click="showappreciate=true">
                <div class="f-b-c">
                    <span class="iconfont icon-icon mr-0.3125rem"></span>
                    <span>赞赏作者</span>
                </div>
                <van-icon name="arrow" class="back"/>
            </li>
            <li f-b-c h-2.8125rem @click="showpop=true">
                <div class="f-b-c">
                    <span class="iconfont icon-qingkong mr-0.3125rem"></span>
                    <span>清空数据</span>
                </div>
                <van-icon name="arrow" class="back"/>
            </li>
        </ul>
    </div>
    <!-- 提示清空数据 -->
    <van-popup v-model:show="showpop" :style="{ padding: '1.25rem' ,width:'75%',height:'27%'}" round> 
        <div class="flex flex-col justify-between w-100% h-100%">
            <span class="text-0.875rem">清空数据</span>
            <span class="text-0.875rem">确认清空所有收藏内容和已回答答案？(此操作不可撤销)</span>
            <div class="text-0.875rem ml-8.125rem" >
                <span @click="showpop=false">取消</span>
                <span class="ml-1.875rem text-[#35a1fc]" @click="clearAllData">确认</span>
            </div>
        </div>
    </van-popup>

    <!-- 显示赞赏码 -->
    <van-popup v-model:show="showappreciate" :style="{ padding: '1.25rem' ,width:'75%',height:'40%'}" round> 
        <div class="flex flex-col justify-between w-100% h-100%">
            <span class="text-0.875rem mxa px-0.625rem border-l-solid border-l-[#35a1fc]">您的支持是我们最大的动力</span>
            <img src="@/assets/img/appreciate.png" class="w-15rem">
            <span class="text-0.875rem mxa bg-[#e2e2e2] w-14.6875rem  h-2.5rem text-[#35a1fc] center" @click="showappreciate=false">
                取消
            </span>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import {ref} from "vue"
import Navbar from "@/components/setting/Navbar.vue";
import { mainstore } from "@/store";
import { useTestStore } from "@/store/useTestStore/testStore";
import {showToast} from "vant"

        
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
    font-size: 1.25rem;
}
.icon-icon::before{
    font-size: 1.25rem;
}
.icon-qingkong::before{
    font-size: 1.25rem;
}
</style>