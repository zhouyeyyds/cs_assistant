<template>
<div class="search">
    <!-- 头部导航 -->
    <div class="fixed left-0 top-0 w-100% h-60px text-13px px-10px bg-[#fff] f-b-c  z-10">
        <span class="back iconfont icon-arrow-left-bold" @click="back"></span>
        <!--左边返回按钮 -->

        <!-- 搜索框 -->
        <van-search
        v-model.trim="key"
        placeholder="请输入搜索关键词"
        input-align="center"
        class="flex-1"
        shape="round"
        @search="find"
        />
        <!-- 右边搜索文字 -->
        <p @click="find">搜索</p>
    </div>

    <!-- 搜索历史 -->
    <div class="history" v-show="!issearch">
        <div class="w-100% mt-70px p-10px mb-10px border-b-solid border-b-[#eee] border-1px f-b-c">
            <p>历史搜索</p>
            <van-icon name="delete-o" class="w-44px h-44px delete" @click="deletehistorylist"/>
            <!-- 清空 -->
            <van-popup v-model:show="isshowtip" round>
                <div class="w-250px h-150px flex-col p-10px text-14px">
                    <p class="mb-80px">确定清空全部历史记录 ?</p>
                    <span class="ml-120px">
                        <span @click="cancle" class="mr-30px">取消</span>
                        <span @click="clearall" class="text-[#35a1fc]">清空</span>
                    </span>
                </div>
            </van-popup>
        </div>
        <!-- 每一个历史记录 -->
        <div>
            <span v-for="item,index in historylist" :key="index" @click="search(item)" class="inline-block bg-[#fff] rounded-full m-5px px-15px text-13px h-30px item">
                {{item}}
            </span>
        </div>
    </div>

    <!-- 搜索结果 -->
    <div class="mt-60px text-1rem mb-50px f-b-c flex-col mb-20px text-14px" v-show="issearch">
        <div class="fixed text-13px h-20px w-full bg-[#eee] text-center overscroll-contain z-10">当前结果共有<span class="text-[#35a1fc]">{{searchres.length}}</span>条</div>
        <van-swipe-cell class="mt-15px bg-white  f-b-c flex-col p-10px rounded-10px w-90%" v-for="item,index in showlist" :key="item.id">
            <template #right>
                <van-button square type="primary" text="收藏" class="collect" @click="collect(index+(currentPage-1)*pageSize)"/>
            </template>
            <li class="mb-10px w-320px ">
                <van-tag type="primary" v-show="item.cid==1">计组</van-tag>
                <van-tag type="primary" v-show="item.cid==2">计网</van-tag>
                <van-tag type="primary" v-show="item.cid==3">操作系统</van-tag>
                <van-tag type="primary" v-show="item.cid==4">数据结构</van-tag>
                {{ index+1+(currentPage-1)*pageSize  }}. <span v-html="highlight(item.text)"></span>
            </li>
            <li class="mb-5px">
                <svg class="icon text-25px -ml-6px" aria-hidden="true" v-if="item.answer=='a'">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
                <span class="round" v-else>A.</span>
                <span>{{ item.a }}</span>
            </li>
            <li class="mb-5px">
                <svg class="icon text-25px -ml-6px" aria-hidden="true" v-if="item.answer=='b'">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
                <span class="round" v-else>B.</span>
                <span>{{ item.b }}</span>
            </li>
            <li class="mb-5px ">
                <svg class="icon text-25px -ml-6px" aria-hidden="true" v-if="item.answer=='c'">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
                <span class="round" v-else>C.</span>
                <span>{{ item.c }}</span>
            </li>
            <li class="mb-10px">
                <svg class="icon text-25px -ml-6px" aria-hidden="true" v-if="item.answer=='d'">
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
        :total-items="searchres.length"
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
</div>
</template>
  
  <script setup lang="ts">
  import {onMounted, Ref, ref} from "vue"
  import { useRouter } from "vue-router";
  import { mainstore } from '@/store';
  import { showToast } from 'vant';


        const router=useRouter();
        const store=mainstore();

        const key=ref("")//搜索输入的值
        const searchres:Ref<string[]>=ref([])//搜索的结果
        const issearch=ref(false)//是否正在已经搜索
        const isempty=ref(true)//搜索记录是否为空
        const isshowtip=ref(false)//是否显示提示弹窗
        const historylist=ref([])//搜索历史

        // 点击搜索框进行手术
        const find=()=>{
            if(key.value!=''){// 判读输入的字符串是否为空 如果空 就什么都不执行
                historylist.value.push(key.value)
                historylist.value=[...new Set(historylist.value)]// 数组去重
                localStorage.setItem("historylist",JSON.stringify(historylist.value));
                searchapi();
                issearch.value=true;
            }
        }

        // 点击搜索记录中的某一项进行搜索
        const search=(val:string)=>{
            key.value=val;
            searchapi()
            issearch.value=true;
        }

        // 执行搜索 
        const searchapi=()=>{
            let list=[...store.pocoList,...store.cnetList,...store.osList,...store.dsList]
            searchres.value=list.filter(item=>item.text.indexOf(key.value)!=-1);//过滤筛选
            curshow()
        }

        // 返回上一个页面
        const back=()=>{
            if(!issearch.value)// 如果不是正在搜索中 就回退到上一个页面
            router.go(-1)

            issearch.value=false;
            key.value='';//并且将输入框的值清空
        }

        // 清空所有历史记录
        const deletehistorylist=()=>{
            isshowtip.value=true// 点击删除的时候 弹出提示框
        }

        // 取消删除
        const cancle=()=>{
            isshowtip.value=false;// 点击取消 提示框消失
        }

        // 确认清空
        const clearall=()=>{
            isshowtip.value=false;// 点击确认 提示框消失 
            historylist.value=[];
            localStorage.setItem("historylist",JSON.stringify(historylist.value));
            isempty.value=true;// 搜索历史列表为空
        }

        const currentPage=ref(1)//当前页号
        const pageSize=10;//页面大小
        const showlist=ref([]);//当前页要渲染的数组

        // 渲染当前页
        const curshow=()=>{
            let begin=(currentPage.value-1)*pageSize;
            let end=currentPage.value*pageSize;
            showlist.value=searchres.value.slice(begin,end)
        }

        // 切换页的时候 重新渲染当前页
        const changepage=()=>{
            curshow()
        }

        // 收藏
        const collect=(index:number)=>{
            if(searchres.value[index].cid==1){
                addCollectlist(store.pocoCollectlist,index)
            }
            if(searchres.value[index].cid==2){
                addCollectlist(store.cnetCollectlist,index)
            }
            if(searchres.value[index].cid==3){
                addCollectlist(store.osCollectlist,index)
            }
            if(searchres.value[index].cid==4){
                addCollectlist(store.dsCollectlist,index)
            }
        }

        // 将添加到收藏夹中的方法封装
        const addCollectlist=(list:[],index:number)=>{
                let flag=true;
                list.forEach(item => {//加入到错题本之前先遍历一下这个数组 判断是否已经被添加过 
                    if(item.id==searchres.value[index].id){
                        flag=false;
                    }
                });
                if(flag){//如果没有被收藏过
                list.push(searchres.value[index])
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

        // 搜索结果高亮
        const highlight=(str:string)=>{
            let reg=new RegExp(key.value.trim(),'g');//需要对输入的关键字去除首尾的空格
            return str.replace(reg,`<span class="text-[#35a1fc]">${key.value.trim()}</span>`)
        }

        onMounted(()=>{
            historylist.value=JSON.parse(localStorage.getItem("historylist"))//挂载后获取搜索历史
        })
  </script>
  
<style scoped>

.collect{
    margin-top: 3.4375rem;
    height: 5.625rem;
    margin-left: 3.75rem;
}
.delete{
    font-size: 4.8vw;
    opacity: .6;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item{
    line-height: 30px;
}
  </style>