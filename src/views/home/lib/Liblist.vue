<template>
    <!-- 顶部导航 -->
    <Navbar></Navbar>
    
    <div class="mt-118px">
        <!-- 下拉菜单 -->
        <Dropdown  :id="Number(id)" @changeempty="changeempty"></Dropdown>
        <!-- 题库项目 -->
        <div class="-mt-0.3125rem text-16px mb-3.125rem f-b-c flex-col  text-0.875rem" >
            <van-swipe-cell class="mt-0.9375rem bg-white  f-b-c flex-col items-start p-0.625rem rounded-0.625rem w-90% " v-for="item,index in showlist" :key="item.id">
                <template #right>
                    <van-button square type="primary" text="收藏" class="collect" @click="collect(index+(currentPage-1)*pageSize)"/>
                </template>
                <li class="mb-0.625rem w-20rem">
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
        :total-items="libList.length"
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
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/lib/Navbar.vue'
import Dropdown from "@/components/errorbook/Dropdown.vue"
import {useRoute} from "vue-router"
import {onMounted, ref, watch,} from "vue"
import { mainstore } from '@/store/index';
import { showToast } from 'vant';
import { Ianswer } from '@/utils/type/answer';

        const route=useRoute()
        const store=mainstore()
    
        const id=route.query.id//当前课程号
        const index=ref(1)//课程索引 可以切换
        const libList=ref<Ianswer[]>([]);//当前的题库

        const currentPage=ref(1)//当前页号
        const pageSize=10;//页面大小
        const showlist=ref<Ianswer[]>([]);//当前页要渲染的数组

        // 渲染当前页
        const curshow=()=>{
            let begin=(currentPage.value-1)*pageSize;
            let end=currentPage.value*pageSize;
            showlist.value=libList.value.slice(begin,end)
        }

        // 切换页的时候 重新渲染当前页
        const changepage=()=>{
            curshow()
        }

        // 改变索引 切换课程
        const changeempty=(val:number)=>{
            index.value=val;
            currentPage.value=1
        }

        // 收藏
        const collect=(index:number)=>{
            if(libList.value[index].cid==1){
                addCollectlist(store.pocoCollectlist,index)
            }
            if(libList.value[index].cid==2){
                addCollectlist(store.cnetCollectlist,index)
            }
            if(libList.value[index].cid==3){
                addCollectlist(store.osCollectlist,index)
            }
            if(libList.value[index].cid==4){
                addCollectlist(store.dsCollectlist,index)
            }
        }

        // 将添加到收藏夹中的方法封装
        const addCollectlist=(list:Ianswer[],index:number)=>{
                let flag=true;
                list.forEach(item => {//加入到错题本之前先遍历一下这个数组 判断是否已经被添加过 
                    if(item.id==libList.value[index].id){
                        flag=false;
                    }
                });
                if(flag){//如果没有被收藏过
                list.push(libList.value[index])
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

        watch(index,(val)=>{//监视index的变化 更改libList的值
            val==1?libList.value=store.pocoList:
            val==2?libList.value=store.cnetList:
            val==3?libList.value=store.osList:
            val==4?libList.value=store.dsList:0;

            curshow()//改完以后 渲染当前页
        },{immediate:true})

        onMounted(()=>{
            index.value=Number(id);// 挂载的时候 默认索引为传入的 课程号id
            curshow()//然后渲染当前页
        })

</script>

<style scoped>
.collect{
        margin-top: 55px;
        height: 90px;
        margin-left: 60px;
    }
</style>