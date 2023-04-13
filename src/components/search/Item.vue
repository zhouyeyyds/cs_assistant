<script setup lang="ts">
import { mainstore } from '@/store';
import { showToast } from 'vant';
import { pagination} from '@/utils/pagination/pagination'


      const store=mainstore();
      const props=defineProps({
         searchres:Array
      })

      const {sourList,currentPage,pageSize,showlist,curshow,changepage}=pagination(props.searchres)

      // 收藏
      const collect=(index:number)=>{
         if(props.searchres[index].cid==1){
            addCollectlist(store.pocoCollectlist,index)
         }
         if(props.searchres[index].cid==2){
            addCollectlist(store.cnetCollectlist,index)
         }
         if(props.searchres[index].cid==3){
            addCollectlist(store.osCollectlist,index)
         }
         if(props.searchres[index].cid==4){
            addCollectlist(store.dsCollectlist,index)
         }
      }

      // 将添加到收藏夹中的方法封装
      const addCollectlist=(list,index)=>{
            let flag=true;
            list.forEach(item => {//加入到错题本之前先遍历一下这个数组 判断是否已经被添加过 
                if(item.id==props.searchres[index].id){
                    flag=false;
                }
            });
            if(flag){//如果没有被收藏过
               list.push(props.searchres[index])
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
<div class="mt-3.75rem text-16px f-b-c flex-col mb-1.25rem text-0.875rem" >
   <div class="fixed text-0.8125rem h-1.25rem w-full bg-[#eee] text-center overscroll-contain z-10">当前结果共有{{searchres.length}}条</div>
   <van-swipe-cell class="mt-0.9375rem bg-white  f-b-c flex-col p-0.625rem rounded-0.625rem w-90%" v-for="item,index in showlist" :key="item.id">
      <template #right>
         <van-button square type="primary" text="收藏" class="collect" @click="collect(index+(currentPage-1)*pageSize)"/>
      </template>
      <li class="mb-0.625rem w-20rem ">
         <van-tag type="primary" v-show="item.cid==1">计组</van-tag>
         <van-tag type="primary" v-show="item.cid==2">计网</van-tag>
         <van-tag type="primary" v-show="item.cid==3">操作系统</van-tag>
         <van-tag type="primary" v-show="item.cid==4">数据结构</van-tag>
         {{ index+1+(currentPage-1)*pageSize  }}. {{ item.text }}
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

    <!-- 分页组件 -->
    <van-pagination
    v-model="currentPage"
    :total-items="sourList.length"
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

<style>
.collect{
        margin-top: 55px;
        height: 90px;
        margin-left: 60px;
    }
</style>