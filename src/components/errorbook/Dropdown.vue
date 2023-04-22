<template>
  <van-dropdown-menu class="fixed w-100% z-9 left-0 top-70px">
        <van-dropdown-item :title="arr[index-1]" ref="dropdownItemRef">
            <ul class="f-b-c h-2.5rem p-x-0.9375rem m-y-0.625rem text-0.875rem dropdown">
            <li :class="{'active':id==1}" @click="changeactive(1,$event)">计组</li>
            <li :class="{'active':id==2}" @click="changeactive(2,$event)">计网</li>
            <li :class="{'active':id==3}" @click="changeactive(3,$event)">操作系统</li>
            <li :class="{'active':id==4}" @click="changeactive(4,$event)">数据结构</li>
            </ul>
            <div style="padding: .3125rem 1rem;">
            <van-button type="primary" block round @click="up">
                确认
            </van-button>
            </div>
        </van-dropdown-item>
  </van-dropdown-menu>
</template>

<script setup lang="ts">
import {onMounted, ref } from 'vue';
import type { DropdownItemInstance } from 'vant';


      const props=defineProps({//接受父组件传递的参数
        id:Number
      })
      const emits=defineEmits(["changeempty"])//接受父组件传递的方法 可以将子组件的某些值转递给父组件
      const arr=["计算机组成原理","计算机网络","操作系统","数据结构"]
      const dropdownItemRef = ref<DropdownItemInstance>();//获取下拉菜单的实例对象
      const index=ref(1)

      // 改变当前科目
      const changeactive=(val,e)=>{
        let arr=document.querySelectorAll("li")
        arr.forEach((item)=>{
              item.classList.remove("active");
            })
        e.target.classList.add("active")
        index.value=val
      }

      // 点击确定按钮时 下拉框消失
      const up=()=>{
        dropdownItemRef.value?.toggle(false);
        emits("changeempty",index.value)
      }

      onMounted(()=>{
        index.value=props.id;
      })

</script>

<style scoped>

 li{
      margin: 0 .3125rem;
      height: 2.5rem;
      width: 25%;
      border: .0625rem solid #e2e2e2;
      text-align: center;
      line-height: 2.5rem;
      border-radius: 347.1875rem;
      background-color: #f9f9f9;
    }

    .active{
      background-color: #e9f3ff;
      color: #5491da;
    }
</style>