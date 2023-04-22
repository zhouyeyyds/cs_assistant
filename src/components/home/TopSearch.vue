<script setup lang="ts">
import { useRouter } from "vue-router";

        const router=useRouter();
</script>

<template>
  <header class="position-fixed left-0 top-0 flex justify-between items-center h-70px  p-x-10px pt-10px bg-white border-b border-b-[#efefef] w-100%">
      <!-- 搜索框 -->
      <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      @click="router.push({name:'search'})"
      input-align="center"
      class="w-100%"
    />
    </header>
</template>

<style>

</style>