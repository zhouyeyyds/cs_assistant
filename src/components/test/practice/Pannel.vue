<script setup lang="ts">
import { ref,onMounted ,} from 'vue';
import { mainstore } from '@/store';


      const store=mainstore();
      const props=defineProps(['changeindex','id'])

      const list=ref([])//练习题目的数组

      // 改变当前的题板序号
      const changeindex=(index:number)=>{
        props.changeindex(index)
      }

      onMounted(()=>{
        // 挂载的时候获得数据
         list.value=store.list
     })
</script>

<template>
  <div class="flex flex-wrap h-240px overflow-scroll justify-center">
    <span v-for="item,index in list" :key="index" 
     class="w-40px h-40px rounded-full
     border-1px border-solid border-[#ccc]
     m-4px flex justify-center items-center"
     :class="{'right':store.pannellist[id][index],'false':store.pannellist[id][index]==0,'cur':index==store.index[id]}"
     @click="changeindex(index)"
     >
      {{ index+1 }}
    </span>
  </div>
</template>



<style scoped>
  .right{
    background-color: #e9f8f3;
    color: #0fb075;
  }

  .false{
    background-color: #fde4dd;
    color: #e44c3e;
  }

  .cur{
    border: 1px solid #666;
  }
</style>