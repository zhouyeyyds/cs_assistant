<script setup lang="ts">
import {useRouter} from "vue-router"
import { useTestStore } from "@/store/useTestStore/testStore";
import { mainstore } from "@/store";
import { showToast } from 'vant';
import {pagination} from '@/utils/pagination/pagination'
import { Ianswer } from "@/utils/type/answer";

        const router=useRouter()
        const store=mainstore()
        const testStore=useTestStore()

        // 抽离分页组件的业务逻辑
        const {sourList,currentPage,pageSize,showlist,curshow,changepage}=pagination(testStore.errorList)

         // 收藏
        const collect=(index:number)=>{
            if(testStore.errorList[index].cid==1){
                addCollectlist(store.pocoCollectlist,index)
            }
            if(testStore.errorList[index].cid==2){
                addCollectlist(store.cnetCollectlist,index)
            }
            if(testStore.errorList[index].cid==3){
                addCollectlist(store.osCollectlist,index)
            }
            if(testStore.errorList[index].cid==4){
                addCollectlist(store.dsCollectlist,index)
            }
        }

        // 将添加到收藏夹中的方法封装
        const addCollectlist=(list:Ianswer[],index:number)=>{
                let flag=true;
                list.forEach(item => {//加入到错题本之前先遍历一下这个数组 判断是否已经被添加过 
                    if(item.id==testStore.errorList[index].id){
                        flag=false;
                    }
                });
                if(flag){//如果没有被收藏过
                list.push(testStore.errorList[index])
                setTimeout(() => {
                        showToast({
                        message:"收藏成功",
                        position:"bottom"
                    })
                }, 200);
                }else{//如果已经被收藏过
                setTimeout(() => {
                        showToast({
                        message:"已经收藏过啦",
                        position:"bottom"
                    })
                }, 200);
                }
            }

</script>

<template>
    <!-- 顶部导航 -->
    <div class="w-100% h-11px fixed left-0 top-0  bg-[#fff] z-9"></div>
    <div class="fixed left-0 top-10px flex items-center p-y-0 p-x-0.625rem w-full h-3.75rem bg-white text-0.9375rem z-999">
        <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
        <span class="m-l-30%">错题回顾</span>
    </div>
    <!-- 题目的渲染 -->
    <div class="mt-95px mb-3.125rem text-16px f-b-c flex-col mb-1.25rem text-0.875rem">
        <div class="fixed left-0 top-74px text-0.8125rem h-1.25rem w-full bg-[#eee] text-center overscroll-contain z-10 ">
            本次错题数:<span class="text-[#35a1fc]">{{ testStore.errorList.length }}</span>
        </div>
        <van-swipe-cell class="mt-0.9375rem bg-white  f-b-c flex-col p-0.625rem rounded-0.625rem w-90%" v-for="item,index in showlist" :key="item.id">
            <template #right>
                <van-button square type="primary" text="收藏" class="collect" @click="collect(index+(currentPage-1)*pageSize)"/>
            </template>
            <li class="mb-0.3125rem w-20rem">
                {{ index+1+(currentPage-1)*pageSize }}. {{ item.text }}
            </li>
            <li class="mb-0.3125rem">
                <svg class="icon text-1.5625rem -ml-0.375rem" aria-hidden="true" v-if="item.answer=='a'">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
                <span class="round" v-else>A.</span>
                <span>{{ item.a }}</span>
            </li>
            <li class="mb-0.3125rem">
                <svg class="icon text-1.5625rem -ml-0.375rem" aria-hidden="true" v-if="item.answer=='b'">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
                <span class="round" v-else>B.</span>
                <span>{{ item.b }}</span>
            </li>
            <li class="mb-0.3125rem ">
                <svg class="icon text-1.5625rem -ml-0.375rem" aria-hidden="true" v-if="item.answer=='c'">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
                <span class="round" v-else>C.</span>
                <span>{{ item.c }}</span>
            </li>
            <li class="mb-0.625rem">
                <svg class="icon text-1.5625rem -ml-0.375rem" aria-hidden="true" v-if="item.answer=='d'">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
                <span class="round" v-else>D.</span>
                <span>{{ item.d }}</span>
            </li>
            <li>
                答案： {{ item.answer.toUpperCase() }}
            </li>
        </van-swipe-cell>
    </div>

    <!-- 分页组件 -->
    <van-pagination
    v-model="currentPage"
    :total-items="testStore.errorList.length"
    :items-per-page="pageSize"
    :show-page-size="4"
    force-ellipses
    @change="changepage"
    class="fixed left-0 bottom-0 w-100%  z-999"
    >
        <template #prev-text>
            <van-icon name="arrow-left" />
        </template>
        <template #next-text>
            <van-icon name="arrow" />
        </template>
    </van-pagination>

    <!-- 返回顶部 -->
    <van-back-top />
</template>

<style scoped>
    .collect{
    margin-top: 1.875rem;
    height: 50%;
    margin-left: .875rem;
    }
</style>