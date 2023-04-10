<script setup lang="ts">
import { ref,onMounted ,} from 'vue';
import { mainstore } from '@/store';
import { useTestStore } from '@/store/useTestStore/testStore';


      const store=mainstore();
      const testStore=useTestStore();
      const props=defineProps(['changeCurindex'])

      const simulatelist=ref([])//仿真题目的数组

      // 改变当前的题板序号
      const changeindex=(index:number)=>{
        props.changeCurindex(index)
      }

      onMounted(()=>{
        // 挂载的时候获得数据
        store.randomList.forEach(index=>{
            simulatelist.value.push(store.list[index])
        })
     })
</script>

<template>
  <div class="flex flex-wrap h-240px w-325px overflow-scroll justify-center">
    <span v-for="item,index in simulatelist" :key="index" 
     class="w-40px h-40px rounded-full
     border-1px border-solid border-[#ccc]
     m-4px flex justify-center items-center"
     :class="{'right':testStore.pannellist[index],'false':testStore.pannellist[index]==0,'cur':index==testStore.index}"
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