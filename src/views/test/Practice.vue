<template>
             <!-- 顶部导航 -->
         <div class="nav flex justify-between items-center">
             <span @click="router.go(-1)" class="iconfont icon-arrow-left-bold back"></span>
             <van-tabs type="card" class="tab" v-model:active="model" @click-tab="changemodel">
                 <van-tab title="练习"  name="practice"></van-tab>
                 <van-tab title="浏览"  name="scan"></van-tab>
             </van-tabs>
             <!-- 设置按钮 -->
             <span class="iconfont icon-setting" @click="showsetting"></span>
         </div>
 
         <!-- 圆角弹窗开始 -->
         <van-popup
         v-model:show="setting"
         round
         position="bottom"
         closeable
         close-icon="close"
         close-icon-position="top-right"
         :style="{ height: '30%' }"
         >
         <div class="set flex justify-between items-center">
             <span>设置</span>
             <li class="flex justify-between items-center">
                 <span>答对跳转下一题</span>
                 <van-switch v-model="right_next" size="18px" />
             </li>
             <li class="flex justify-between items-center">
                 <span>答错跳转下一题</span>
                 <van-switch v-model="false_next" size="18px" />
             </li>
             <li class="flex justify-between items-center">
                 <span>重新练习</span>
                 <i class="iconfont icon-RectangleCopy redo" @click="redo"></i>
             </li>
         </div>
         </van-popup>
         <!-- 圆角弹窗结束 -->
 
         <!-- 下方题目卡片 -->
         <div class="card">
             <van-swipe :loop="false" :width="375"   :show-indicators="false" touchable lazy-render ref="swipe" @change="onChange"> 
                 <van-swipe-item class="item" v-for="item,index in list" :key="item.id">
                         <div class="li">
                             <van-tag type="primary">单选</van-tag>
                             <p>{{index+1}} . {{ item.text }}</p>
                             <div class="choice flex justify-between items-center">
                                 <!-- 选项a -->
                                 <div class="flex justify-between items-center" @click="test('a',item. answer)">
                                     <!-- 基础图标 -->
                                     <span class="round" v-show="status.a==0">A</span>
                                     <!-- 选择正确后的图标 -->
                                     <svg class="icon" aria-hidden="true" v-show="status.a==1">
                                         <use xlink:href="#icon-gouxuan"></use>
                                     </svg>
                                     <!-- 选择错误后的图标 -->
                                     <svg class="icon" aria-hidden="true" v-show="status.a==2">
                                         <use xlink:href="#icon-danchuang-guanbixuanxiangka"></use>
                                     </svg>
                                     <span class="flex-1">{{ item.a }}</span>
                                 </div>
                                 <!-- 选项b -->
                                 <div class="flex justify-between items-center"  @click="test('b',item. answer)">
                                     <span class="round"  v-show="status.b==0">B</span>
                                     <svg class="icon" aria-hidden="true" v-show="status.b==1">
                                         <use xlink:href="#icon-gouxuan"></use>
                                     </svg>
                                     <svg class="icon" aria-hidden="true" v-show="status.b==2">
                                         <use xlink:href="#icon-danchuang-guanbixuanxiangka"></use>
                                     </svg>
                                     <span class="flex-1">{{ item.b }}</span>
                                 </div>
                                 <!-- 选项c -->
                                 <div class="flex justify-between items-center" @click="test('c',item. answer)">
                                     <span class="round"  v-show="status.c==0">C</span>
                                     <svg class="icon" aria-hidden="true" v-show="status.c==1">
                                         <use xlink:href="#icon-gouxuan"></use>
                                     </svg>
                                     <svg class="icon" aria-hidden="true" v-show="status.c==2">
                                         <use xlink:href="#icon-danchuang-guanbixuanxiangka"></use>
                                     </svg>
                                     <span class="flex-1">{{ item.c }}</span>
                                 </div>
                                 <!-- 选项d -->
                                 <div class="flex justify-between items-center" @click="test('d',item. answer)">
                                     <span class="round"  v-show="status.d==0">D</span>
                                     <svg class="icon" aria-hidden="true" v-show="status.d==1">
                                         <use xlink:href="#icon-gouxuan"></use>
                                     </svg>
                                     <svg class="icon" aria-hidden="true" v-show="status.d==2">
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
         <div class=" bg-white absolute left-0 bottom-0 w-100% px-0.3125rem">
            <van-collapse v-model="showpannel" :accordion="true">
                <van-collapse-item name="1" :is-link="false" lazy-render  ref="collapseItemRef">
                    <template #title >
                        <div class="f-b-c w-100% h-30px text-0.8125rem">
                            <div class="shoucang f-b-c flex-col" @click="favorite">
                                <span class="iconfont icon-shoucang" v-show="!isfavorite"></span>
                                <svg class="icon ing" aria-hidden="true" v-show="isfavorite">
                                    <use xlink:href="#icon-shoucang1"></use>
                                </svg>
                                <span v-show="!isfavorite">收藏</span>
                                <span v-show="isfavorite">已收藏</span>
                            </div>
                            <div class="f-b-c flex-col" >
                                <span class="rightnum">{{ rightnum[id] }}</span>
                                <span>答对</span>
                            </div>
                            <div class="f-b-c flex-col">
                                <span class="falsenum">{{ falsenum[id] }}</span>
                                <span>答错</span>
                            </div>
                            <div class="f-b-c flex-col">
                                <div>
                                    <span>{{ index[id]+1 }}</span>
                                    <span class="total">/{{ list.length }}</span>
                                </div>
                                <span>题板</span>
                            </div>
                        </div>
                    </template>
                    <!-- 题板部分 -->
                    <Pannel :changeindex="changeindex" :id="id"></Pannel>
                </van-collapse-item>
            </van-collapse>
        </div>
 
         <!-- 重做后显示的弹出层 -->
         <van-popup v-model:show="showpop" round>
             <div class="pop">
                 <p>确认重新练习吗 ?</p>
                 <span class="choice">
                     <span @click="showpop=false">取消</span>
                     <span @click="certify">确认</span>
                 </span>
             </div>
         </van-popup>
 </template>
 
 <script>
 import Pannel from "@/components/test/practice/Pannel.vue"
 import { useRouter,useRoute } from 'vue-router';
 import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
 import { mainstore } from '@/store/index';
 import { storeToRefs } from 'pinia';
 import { showToast } from 'vant';

 export default {
    components:{
        Pannel
    },
     setup() {
         const route=useRoute()//获取路由对象
         const router=useRouter();//获取路由器对象
         const store=mainstore();
         const proxy=getCurrentInstance();//获取实例对象
         
         const showpannel=ref(1)
         const data=reactive({
             model:'practice',//题目的模式
             setting:false,//是否弹出设置窗口
             showpop:false,//是否显示弹出层 确实是否重做
             right_next:true,//答对进入下一题
             false_next:false,//答错进入下一题
             isfavorite:route.query.id==1?store.pocoCollectlist.some(item=>item.id==store.list[store.index[route.query.id]].id):
                        route.query.id==2?store.cnetCollectlist.some(item=>item.id==store.list[store.index[route.query.id]].id):
                        route.query.id==3?store.osCollectlist.some(item=>item.id==store.list[store.index[route.query.id]].id):
                        route.query.id==2?store.dsCollectlist.some(item=>item.id==store.list[store.index[route.query.id]].id):false,//是否收藏
             id:route.query.id,//当前的科目id
             isanswered:0,//是否已经答过
             status:{a:0,b:0,c:0,d:0}//题目的结果状态
         })
 
        // 通过此方法指定索引来切换题目
        const changeindex=(index)=>{
             proxy.refs.swipe.swipeTo(index)
        }

        // 切换题目时触发
        const onChange=(index)=>{
             store.index[route.query.id]=index;// 同步轮播卡片的索引和自定义的索引

             // 切换下一题时  响应状态也要重置 如果题目已经被做过 则显示之前的状态 否则全部为0
             data.status=store.statuslist[route.query.id][store.index[route.query.id]]?store.statuslist[route.query.id][store.index[route.query.id]]:{a:0,b:0,c:0,d:0}

             // 根据科目的id判断当前题目是否被收藏过  
             if(data.id==1){
                data.isfavorite=store.pocoCollectlist.some(item=>item.id==store.list[store.index[route.query.id]].id)
             }
             if(data.id==2){
                data.isfavorite=store.cnetCollectlist.some(item=>item.id==store.list[store.index[route.query.id]].id)
             }
             if(data.id==3){
                data.isfavorite=store.osCollectlist.some(item=>item.id==store.list[store.index[route.query.id]].id)
             }
             if(data.id==4){
                data.isfavorite=store.dsCollectlist.some(item=>item.id==store.list[store.index[route.query.id]].id)
             }
           
             if(data.model=="scan"){//切换题目的时候 判断是否是浏览模式
                showanswer()
             }
            //  如果已经放入仓库中保存的 从仓库中读取出来 否则就是可以答题
             data.isanswered=store.answerlist[route.query.id][index]?store.answerlist[route.query.id][index]:0;
        }

        // 点击显示设置弹窗
        const showsetting=()=>{
             data.setting=true;
        }

        // scan模式下显示正确答案
        const showanswer=()=>{
            for(let k in data.status){//遍历状态 
                if(store.list[store.index[route.query.id]].answer.includes(k)){
                    data.status[k]=1;
                }
            }
        }

        // 切换题目的模式
        const changemodel=({name})=>{
               data.model=name;
             if(data.model=="scan"){
                showanswer()// 如果是浏览模式 则显示正确答案
             }else{
                // 如果切换为练习模式 则改变题目的状态
                data.status=store.statuslist[route.query.id][store.index[route.query.id]]?store.statuslist[route.query.id][store.index[route.query.id]]:{a:0,b:0,c:0,d:0}
             }
        }

        // 点击收藏
        const favorite=()=>{
             data.isfavorite=!data.isfavorite;//改变收藏状态
             if(data.isfavorite){//如果是已经收藏状态 根据当前课程号 写入相应的收藏夹中 
                if(data.id==1)
                addCollectlist(store.pocoCollectlist)
                if(data.id==2)
                addCollectlist(store.cnetCollectlist)
                if(data.id==3)
                addCollectlist(store.osCollectlist)
                if(data.id==4)
                addCollectlist(store.dsCollectlist)
             }
             else{//如果是取消收藏 将这个题目从收藏夹中删除
                if(data.id==1)
                deleteCollectlist(store.pocoCollectlist)
                if(data.id==2)
                deleteCollectlist(store.cnetCollectlist)
                if(data.id==3)
                deleteCollectlist(store.osCollectlist)
                if(data.id==4)
                deleteCollectlist(store.dsCollectlist)
             }
        }
        
        // 判断选择的答案是否正确
        const test=(val,answer)=>{
         if(!data.isanswered&&data.model!="scan"){//如果没有被答过 且不是浏览模式 才可以答题
            data.isanswered=1;//答完以后 设置此题为不可以答
            store.answerlist[route.query.id][store.index[route.query.id]]=data.isanswered;//并且放入仓库中保存
            store.count[data.id-1]++;//已答题数+1
             if(val==answer){// 如果答对
                 data.status[val]=1
                 store.rightnum[route.query.id]++;
                 store.statuslist[route.query.id][store.index[route.query.id]]=data.status;
                 store.pannellist[route.query.id][store.index[route.query.id]]=1;
                 if(data.right_next&&!data.false_next){// 如果设置了答对自动进入下一题 等待300毫秒后进入下一题
                     setTimeout(() => {
                         proxy.refs.swipe.next();
                     }, 300);
                 }
             }else{// 如果答错
                 data.status[val]=2
                 data.status[answer]=1
                 store.falsenum[route.query.id]++;
                 store.statuslist[route.query.id][store.index[route.query.id]]=data.status;
                 store.pannellist[route.query.id][store.index[route.query.id]]=0;
                 //根据课程号加入到对应的错题本中
                if(data.id==1)
                addErrorlist(store.pocoErrorlist,store.pocoCollectlist)
    
                if(data.id==2)
                addErrorlist(store.cnetErrorlist,store.cnetCollectlist)

                if(data.id==3)
                addErrorlist(store.osErrorlist,store.osCollectlist)
                
                if(data.id==4)
                addErrorlist(store.dsErrorlist,store.dsCollectlist)
 
                 if(!data.right_next&&data.false_next){// 如果设置了答错自动进入下一题 等待300毫秒后进入下一题
                     setTimeout(() => {
                         proxy.refs.swipe.next();
                     }, 300);
                 }

             }
         }
        }
        
        // 将添加到错题本中的方法封装起来
        const addErrorlist=(errorlist,collectlist)=>{
            let flag=true;
            errorlist.forEach(item => {//加入到错题本之前先遍历一下这个数组 判断是否已经被添加过 
                if(item.id==store.list[store.index[route.query.id]].id){
                    flag=false;
                }
            });
            if(flag)
            errorlist.push(store.list[store.index[route.query.id]])

            if(store.autoCollect)//如果设置了错题自动收藏 则调用加入到收藏夹的方法
            addCollectlist(collectlist)
        }

        // 将添加到收藏夹中的方法封装
        const addCollectlist=(list)=>{
            let flag=true;
            list.forEach(item => {//加入到错题本之前先遍历一下这个数组 判断是否已经被添加过 
                if(item.id==store.list[store.index[route.query.id]].id){
                    flag=false;
                }
            });
            if(flag)
            {
                list.push(store.list[store.index[route.query.id]])
                data.isfavorite=true;
            }
        }

        // 删除收藏夹的内容
        const deleteCollectlist=(list)=>{
            list.splice(store.index[route.query.id],1)
        }

        //重新测试 
        const redo=()=>{
             data.setting=false;
             data.showpop=true;
        }

        // 确认重新测试
        const certify=()=>{
             store.index[route.query.id]=0;
             store.statuslist[route.query.id]=[];//试题状态清空
             store.falsenum[route.query.id]=0;
             store.rightnum[route.query.id]=0;
             store.answerlist[route.query.id]=[];
             store.pannellist[route.query.id]=[];
             store.count[data.id-1]=0;//已经答题数清零
             if(data.model!="scan"){
                data.status={a:0,b:0,c:0,d:0}
             }
             data.isanswered=store.answerlist[route.query.id][store.index[route.query.id]]?store.answerlist[route.query.id][store.index[route.query.id]]:0;
             changeindex(0);//重新加载试题
             data.showpop=false;
             setTimeout(() => {
                 showToast({
                 message:"重置成功",
                 position:"bottom"
             })
             }, 400);
        }

        // 初始化二维数组
        const initList=()=>{
            for(let i=0;i<5;i++){//初始化二维数组
            if(!store.statuslist[i])//只有在还没有存贮的时候 才会进行初始化
            {
                store.statuslist[i]=[];
                store.answerlist[i]=[];
                store.pannellist[i]=[];
            }
        } 
        }
 
     onMounted(()=>{
        initList()// 初始化二维数组 否则会报错
        proxy.refs.swipe.swipeTo(store.index[route.query.id]);//自动切换到之前的索引
        data.status=store.statuslist[route.query.id][store.index[route.query.id]]?
                    store.statuslist[route.query.id][store.index[route.query.id]]:
                    {a:0,b:0,c:0,d:0};
        data.isanswered=store.answerlist[route.query.id][store.index[route.query.id]]?
                        store.answerlist[route.query.id][store.index[route.query.id]]:
                        0;
     })

         return{
             router,changeindex,showsetting,changemodel,onChange,
             ...toRefs(data),favorite,test,...storeToRefs(store),redo,certify,store,showpannel
         }
     }
 }
 </script>
 
 <style lang="less" scoped>
     .nav{
         position: fixed;
         left: 0;
         top: 0;
         width: 100%;
         height: 60px;
         padding: 10px;
         background-color: #fff;
 
         .back{
             text-align: center;
             width: 44px;
             height: 44px;
             line-height: 44px;
             font-size: 20px;
         }
 
         .tab{
             width: 180px;
         }
 
         .icon-setting{
             text-align: center;
             width: 44px;
             height: 44px;
             line-height: 44px;
             font-size: 22px;
         }
     }
     .set{
         flex-direction: column;
         padding: 16px;
         font-size: 15px;
 
         li{
             width: 100%;
             height: 48px;
             border-bottom: 1px solid #e7e7e7;
         }
 
         li:last-child{
             width: 100%;
             height: 49px;
             border: none;
 
             .redo{
                 font-size: 30px;
             }
         }
     }
     .card{
         margin-top: 80px;
         font-size: 15px;
         .item{
             border-radius: 10px;
             background-color: #fff;
             box-shadow: 0 0 5px #ccc;
         }
 
         .li{
             padding: 10px;
 
             .choice{
             flex-direction: column;
             align-items: flex-start;
             margin-top: 10px;
 
             .round{
                 width: 40px;
                 height: 40px;
                 border-radius: 50%;
                 border: 1px solid #ccc;
                 text-align: center;
                 line-height: 40px;
                 margin-right: 10px;
                 margin-top: 5px;
             }
 
             .icon{
                 width: 40px;
                 height: 40px;
                 font-size: 40px;
                 margin-right: 10px;
                 margin-top: 5px;
             }
 
             }
         }
     }
 
         .shoucang{
             width: 50px;
 
             .ing{
                 //已经收藏的按钮图标
                 font-size: 17px;
             }
         }

         .col{
             flex-direction: column;
         }
 
         .rightnum{
             color: rgb(46, 246, 16);
         }
 
         .falsenum{
             color: red;
         }
 
         .total{
             color: #ccc;
         }

 
     .pop{
         width: 70vw;
         height: 100px;
         padding: 2.667vw;
         font-size: 3.2vw;
         color: rgb(168, 166, 166);
 
         p{
             margin-bottom: 45px;
         }
 
         .choice{
             margin-left:150px;
             color: red;
 
             span:first-child{
                 margin-right: 30px;
             }
         }
     }
 </style>