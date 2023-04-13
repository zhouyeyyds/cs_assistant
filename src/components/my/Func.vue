<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { send } from '@/request/api/sendSuggestion';
import {share} from "@/utils/share/share"
import {showToast} from "vant"


      const router=useRouter()
      const showpop=ref(false)
      const suggestionRef=ref(null)

      const cancel=()=>{
        showpop.value=false;
        suggestionRef.value.value=''
      }

      // 发送建议
      const sendSuggestion=async ()=>{
        showpop.value=false;
        // 获取当前的日期
        let dt=new Date;
        let year=dt.getFullYear();
        let month=dt.getMonth()+1;
        let day=dt.getDate()
        let date=`${year}-${month}-${day}`
        if(suggestionRef.value?.value){
          let res=await send(suggestionRef.value?.value,date)
          if(res.data.status==0){
              showToast({
                  message:"反馈成功，感谢您的宝贵建议",
                  position:"bottom"
              })
          }
          else{
            showToast({
                  message:"反馈失败，请稍后重试",
                  position:"bottom"
              })
          }
          suggestionRef.value.value=''
        }
      }

      const {showShare,options}=share();

</script>

<template>
  <div class=" bg-[#fff] rounded-0.625rem mt-10.625rem mx-0.625rem mb-0.625rem text-0.875rem">
      <li class="f-b-c px-0.625rem w-100% h-3.125rem" @click="router.push({name:'about'})">
        <div class="f-b-c">
          <span class="iconfont icon-guanyuwomen mr-0.3125rem"></span>
          <span>关于软件</span>
        </div>
        <van-icon name="arrow"  style="color: rgb(201, 200, 200);"/>
      </li>
      <li class="f-b-c px-0.625rem w-100% h-3.125rem" @click="showpop=true">
        <div class="f-b-c">
          <span class="iconfont icon-message mr-0.3125rem"></span>
          <span>反馈与建议</span>
        </div>
        <van-icon name="arrow"  style="color: rgb(201, 200, 200);" />
      </li>
      <li class="f-b-c px-0.625rem w-100% h-3.125rem" @click="showShare=true">
        <div class="f-b-c">
          <span class="iconfont icon-turnvoice mr-0.3125rem"></span>
          <span>分享App</span>
        </div>
        <van-icon name="arrow" style="color: rgb(201, 200, 200);" />
      </li>
  </div>
  <!-- 提示反馈与建议 -->
  <van-popup v-model:show="showpop" :style="{ padding: '1.25rem' ,width:'80%',height:'35%'}" round> 
      <div class="flex flex-col justify-between w-100% h-100%">
          <textarea name="textarea" cols="30" rows="10" placeholder="点击输入!
感谢您提出的宝贵意见，这对我们非常重要！ 
                                                                      (也可以留下您的联系方式，方便我们及时联络您)  " 
      class="text-0.875rem" ref="suggestionRef"></textarea>
          <div class="text-0.875rem ml-9.375rem" >
              <span @click="cancel">取消</span>
              <span class="ml-1.875rem text-[#35a1fc]" @click="sendSuggestion">发送</span>
          </div>
      </div>
  </van-popup>
  <!-- 分享面板 具体功能未实现 -->
  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
  />
</template>

<style scoped>
.icon-guanyuwomen::before{
  font-size: 1.25rem;
}
.icon-message::before{
  font-size: 1.4375rem;
}
.icon-turnvoice::before{
  font-size: 1.375rem;
}
</style>