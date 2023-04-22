<template>
    <!-- 顶部导航 -->
    <Navbar :index="index" :test="test"></Navbar>
    <div class="mt-6.75rem">
        <!-- 下拉菜单 -->
        <Dropdown  :id="Number(id)" @changeempty="changeempty"></Dropdown>
        <!-- 空状态 -->
        <van-empty description="空空如也" class="mt-6.875rem" v-show="!isempty"/>
        <!-- 收藏项目 -->
        <div class="-mt-0.3125rem text-16px mb-3.125rem f-b-c flex-col  text-0.875rem" v-show="isempty">
            <van-swipe-cell class="mt-0.9375rem bg-white  f-b-c flex-col items-start p-0.625rem rounded-0.625rem w-90% " v-for="item,index in showlist" :key="item.id">
                <template #right>
                    <van-button square type="danger" text="删除" class="collect" @click="deleteItem(index+(currentPage-1)*pageSize)"/>
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
        :total-items="collectList.length"
        :items-per-page="pageSize"
        :show-page-size="4"
        force-ellipses
        @change="changepage"
        class="fixed left-0 bottom-0 w-100%  z-999"
        v-show="isempty"
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
import Navbar from "@/components/collect/Navbar.vue"
import Dropdown from "@/components/errorbook/Dropdown.vue"
import {useRoute} from "vue-router"
import {onMounted, ref,} from "vue"
import { mainstore } from '@/store/index';
import { Ianswer } from "@/utils/type/answer";

        const store=mainstore()
        const route=useRoute()

        const id=route.query.id//当前课程号
        const isempty=ref(0)//收藏夹是否为空
        const index=ref(1)
        const collectList=ref<Ianswer[]>([]);

        const currentPage=ref(1)//当前页号
        const pageSize=10;//页面大小
        const showlist=ref<Ianswer[]>([]);//当前页要渲染的数组

        // 渲染当前页
        const curshow=()=>{
            let begin=(currentPage.value-1)*pageSize;
            let end=currentPage.value*pageSize;
            showlist.value=collectList.value.slice(begin,end)
        }

        // 切换页的时候 重新渲染当前页
        const changepage=()=>{
            curshow()
        }
        
        // 改变空状态
        const changeempty=(val:number)=>{
            index.value=val
            test(val)
            currentPage.value=1;
        }

        // 判断是否为空数组 并且根据课程号给要渲染的数组进行赋值
        const test=(val:number)=>{
            if(val==1)
            {
            isempty.value=store.pocoCollectlist.length;
            collectList.value=store.pocoCollectlist
            }
            if(val==2)
            {
            isempty.value=store.cnetCollectlist.length
            collectList.value=store.cnetCollectlist
            }
            if(val==3)
            {
            isempty.value=store.osCollectlist.length
            collectList.value=store.osCollectlist
            }
            if(val==4)
            {
            isempty.value=store.dsCollectlist.length
            collectList.value=store.dsCollectlist
            }
            curshow()
        }

        // 删除收藏夹的对应内容 接受一个参数 表示要删除的索引
        const deleteItem=(val:number)=>{
            if(index.value==1)
            store.pocoCollectlist.splice(val,1)
            if(index.value==2)
            store.cnetCollectlist.splice(val,1)
            if(index.value==3)
            store.osCollectlist.splice(val,1)
            if(index.value==4)
            store.dsCollectlist.splice(val,1)

            test(index.value)//删除以后 判断是否为空数组
        }

        onMounted(()=>{
        index.value=Number(id)
        test(index.value)
        })


</script>

<style scoped>
.collect{
        margin-top: 3.4375rem;
        height: 5.625rem;
        margin-left: 3.75rem;
    }
</style>