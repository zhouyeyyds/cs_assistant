<script setup lang="ts">
import Pannel from '@/components/test/simulate/Pannel.vue';
import Countdown from '@/components/test/simulate/Countdown.vue';
import { ref,onMounted , onBeforeUnmount,} from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { mainstore } from '@/store';
import {useTestStore} from '@/store/useTestStore/testStore'
import type { CollapseItemInstance } from 'vant';
import type { SwipeInstance } from 'vant';
import {Ianswer} from "@/utils/type/answer"

        
        const router=useRouter();
        const route=useRoute();
        const store=mainstore();//主仓库
        const testStore=useTestStore()//测试模块专用的仓库
        const collapseItemRef = ref<CollapseItemInstance>();//获取折叠面板的实例对象
        const swipeRef=ref<SwipeInstance>();//获取轮播图的实例对象

        const showpannel=ref(1)//显示题板
        const showpop=ref(false)//交卷提示
        const simulatelist=ref<Ianswer[]>([])//仿真题目的数组
        const isanswered=ref(0)//是否已经答过
        const status=ref({//题目的结果状态
            a:0,
            b:0,
            c:0,
            d:0
        });
        const id:number=Number(route.query.id);
        const total=ref(0)//总共得分
        const begintime=ref(0);
        const endtime=ref(0);
        const time=ref(0)

        // 交卷
        const finish=()=>{
            setTimeout(() => {
                showpop.value=true
            }, 500);
        }

        // 取消交卷 继续答题
        const cancel=()=>{
            showpop.value=false
            collapseItemRef.value?.toggle(false)
        }

        // 确认交卷
        const confirm=()=>{
            showpop.value=false;
            total.value=testStore.rightnum*2;
            store.historyGrade.splice(id-1,0,total.value)

            if(id==1)
            testStore.pocoGrade.unshift(total.value)
            if(id==2)
            testStore.cnetGrade.unshift(total.value)
            if(id==3)
            testStore.osGrade.unshift(total.value)
            if(id==4)
            testStore.dsGrade.unshift(total.value)

            //获取结束的时间
            let dt=new Date();
            endtime.value=dt.getTime()
            time.value=endtime.value-begintime.value;
            router.push({name:'finish',query:{garde:total.value,time:time.value}})
        }

        // 切换题目时触发
        const onChange=(index:number)=>{
             testStore.index=index;// 同步轮播卡片的索引和自定义的索引
             // 切换下一题时  响应状态也要重置 如果题目已经被做过 则显示之前的状态 否则全部为0
             status.value=testStore.statuslist[testStore.index]?testStore.statuslist[testStore.index]:{a:0,b:0,c:0,d:0}
             //  如果已经放入仓库中保存的 从仓库中读取出来 否则就是可以答题
             isanswered.value=testStore.answerlist[index]?testStore.answerlist[index]:0;
        }

         // 判断选择的答案是否正确
         const test=(val:string,answer:string)=>{
         if(!isanswered.value){//如果没有被答过 可以答题
            isanswered.value=1;//答完以后 设置此题为不可以答
            testStore.answerlist[testStore.index]=isanswered.value;//并且放入仓库中保存
            testStore.count++;//已答题数+1
             if(val==answer){// 如果答对
                 status.value[val]=1
                 testStore.rightnum++;
                 testStore.statuslist[testStore.index]=status.value;
                 testStore.pannellist[testStore.index]=1;//更新题板的状态
                 // 默认答对自动进入下一题 等待300毫秒后进入下一题
                 setTimeout(() => {
                    swipeRef.value?.next();
                 }, 300);
                 
             }else{// 如果答错
                 status.value[val]=2
                 status.value[answer]=1
                 testStore.falsenum++;
                 testStore.statuslist[testStore.index]=status.value;
                 testStore.pannellist[testStore.index]=0;//更新题板的状态
                 testStore.errorList.push(simulatelist.value[testStore.index]);//加入到本次的错题本中
             }
         }
        }

        // 点击题板时 切换到指定的索引 
        const changeCurindex=(index:number)=>{
            swipeRef.value?.swipeTo(index)
        }

        onMounted(()=>{// 挂载的时候获得数据
            store.randomList.forEach(index=>{
                simulatelist.value.push(store.list[index])
            })
            swipeRef.value?.swipeTo(testStore.index)//自动切换到之前的索引
            //  因为默认进入的时候 索引为1 当刚好是由第一题退出去时 不会触发changeindex事件 也就不会获取题目的答题状态
            status.value=testStore.statuslist[testStore.index]?testStore.statuslist[testStore.index]:{a:0,b:0,c:0,d:0}
            isanswered.value=testStore.answerlist[testStore.index]?testStore.answerlist[testStore.index]:0;

            //获取开始的时间
            let dt=new Date();
            begintime.value=dt.getTime()
        })

        // 退出的时候 清空数据
        onBeforeUnmount(()=>{
            testStore.rightnum=0;
            testStore.falsenum=0;
            testStore.count=0;
            testStore.index=0;
            testStore.statuslist=[];
            testStore.answerlist=[];
            testStore.pannellist=[];
            store.randomList=[];
        })
</script>


<template>
  <!-- 顶部导航 -->
  <div class="fixed left-0 top-0 flex items-center pt-10px p-x-0.625rem w-full h-4.375rem bg-white text-0.9375rem z-999">
        <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
        <!-- 倒计时模块 -->
        <Countdown></Countdown>
  </div>

  <!-- 中间试题的渲染 -->
  <div class="mt-5rem text-0.9375rem">
    <van-swipe :loop="false" :show-indicators="false" touchable lazy-render ref="swipeRef" @change="onChange"> 
        <van-swipe-item class="rounded-0.625rem bg-white shadow-sm" v-for="item,index in simulatelist" :key="item.id">
                <div class="p-0.625rem">
                    <van-tag type="primary">单选</van-tag>
                    <p>{{index+1}} . {{ item.text }}</p>
                    <div class="mt-0.625rem  flex flex-col items-start">
                        <!-- 选项a -->
                        <div class="f-b-c w-100%" @click="test('a',item. answer)">
                            <!-- 基础图标 -->
                            <span class="w-2.5rem h-2.5rem rounded-full border-0.0625rem border-solid border-[#ccc] mt-0.3125rem mr-0.625rem flex justify-center items-center" v-show="status.a==0">A</span>
                            <!-- 选择正确后的图标 -->
                            <svg class="icon  w-2.5rem h-2.5rem text-2.5rem mr-0.625rem mt-0.3125rem" aria-hidden="true" v-show="status.a==1">
                                <use xlink:href="#icon-gouxuan"></use>
                            </svg>
                            <!-- 选择错误后的图标 -->
                            <svg class="icon  w-2.5rem h-2.5rem text-2.5rem mr-0.625rem mt-0.3125rem" aria-hidden="true" v-show="status.a==2">
                                <use xlink:href="#icon-danchuang-guanbixuanxiangka"></use>
                            </svg>
                            <span class="flex-1">{{ item.a }}</span>
                        </div>
                        <!-- 选项b -->
                        <div class="f-b-c w-100%"  @click="test('b',item. answer)">
                            <span class="w-2.5rem h-2.5rem rounded-full border-0.0625rem border-solid border-[#ccc] mt-0.3125rem mr-0.625rem flex justify-center items-center"  v-show="status.b==0">B</span>
                            <svg class="icon w-2.5rem h-2.5rem text-2.5rem mr-0.625rem mt-0.3125rem" aria-hidden="true" v-show="status.b==1">
                                <use xlink:href="#icon-gouxuan"></use>
                            </svg>
                            <svg class="icon w-2.5rem h-2.5rem text-2.5rem mr-0.625rem mt-0.3125rem" aria-hidden="true" v-show="status.b==2">
                                <use xlink:href="#icon-danchuang-guanbixuanxiangka"></use>
                            </svg>
                            <span class="flex-1">{{ item.b }}</span>
                        </div>
                        <!-- 选项c -->
                        <div class="f-b-c w-100%" @click="test('c',item. answer)">
                            <span class="w-2.5rem h-2.5rem rounded-full border-0.0625rem border-solid border-[#ccc] mt-0.3125rem mr-0.625rem flex justify-center items-center"  v-show="status.c==0">C</span>
                            <svg class="icon w-2.5rem h-2.5rem text-2.5rem mr-0.625rem mt-0.3125rem" aria-hidden="true" v-show="status.c==1">
                                <use xlink:href="#icon-gouxuan"></use>
                            </svg>
                            <svg class="icon w-2.5rem h-2.5rem text-2.5rem mr-0.625rem mt-0.3125rem" aria-hidden="true" v-show="status.c==2">
                                <use xlink:href="#icon-danchuang-guanbixuanxiangka"></use>
                            </svg>
                            <span class="flex-1">{{ item.c }}</span>
                        </div>
                        <!-- 选项d -->
                        <div class="f-b-c w-100%" @click="test('d',item. answer)">
                            <span class="w-2.5rem h-2.5rem rounded-full border-0.0625rem border-solid border-[#ccc] mt-0.3125rem mr-0.625rem flex justify-center items-center"  v-show="status.d==0">D</span>
                            <svg class="icon w-2.5rem h-2.5rem text-2.5rem mr-0.625rem mt-0.3125rem" aria-hidden="true" v-show="status.d==1">
                                <use xlink:href="#icon-gouxuan"></use>
                            </svg>
                            <svg class="icon w-2.5rem h-2.5rem text-2.5rem mr-0.625rem mt-0.3125rem" aria-hidden="true" v-show="status.d==2">
                                <use xlink:href="#icon-danchuang-guanbixuanxiangka"></use>
                            </svg>
                            <span class="flex-1">{{ item.d }}</span>
                        </div>
                    </div>
                </div>
        </van-swipe-item>
    </van-swipe>
  </div>

   <!-- 底部题板 -->
   <div class="bg-white absolute left-0 bottom-0 w-100%">
    <van-collapse v-model="showpannel" :accordion="true">
        <van-collapse-item name="1"   :is-link="false" lazy-render ref="collapseItemRef">
            <template #title >
                <div class="f-b-c h-1.875rem bg-white w-100%  text-0.75rem">
                    <!-- 交卷 -->
                    <div class="f-b-c" @click="finish">
                        <svg class="icon text-1.25rem mr-0.3125rem" aria-hidden="true">
                            <use xlink:href="#icon-kaoshiyutiaocha"></use>
                        </svg>
                        <span>交卷</span>
                    </div>
                    <div class="f-b-c flex-col" >
                        <span style="color: rgba(46,246,16)" >{{ testStore.rightnum }}</span>
                        <span>答对</span>
                    </div>
                    <div class="f-b-c flex-col">
                        <span class="text-red">{{ testStore.falsenum }}</span>
                        <span>答错</span>
                    </div>
                    <div class="f-b-c flex-col">
                        <div>
                            <span>{{ testStore.index+1 }}</span>
                            <span class="text-[#ccc]">/50</span>
                        </div>
                        <span>题板</span>
                    </div>
                </div>
            </template>
            <!-- 题板部分 -->
            <Pannel :changeCurindex="changeCurindex"></Pannel>
        </van-collapse-item>
    </van-collapse>
   </div>

   <!-- 提示交卷 -->
   <van-popup v-model:show="showpop" :style="{ padding: '1.25rem' ,width:'80%',height:'24%'}" round :close-on-click-overlay="false"> 
        <div class="flex flex-col justify-between w-100% h-100%">
            <div>
                <span class="iconfont icon-tishi mr-10px"></span>
                <span>提示</span>
            </div>
          <div class="text-0.875rem">您已经回答了{{testStore.count}}题(共50题),确认交卷？</div>
          <div class="text-0.875rem ml-8.75rem" >
            <span @click="cancel">继续答题</span>
            <span class="ml-1.875rem text-[#35a1fc]" @click="confirm">交卷</span>
          </div>
        </div>
    </van-popup>

</template>


<style scoped>
</style>