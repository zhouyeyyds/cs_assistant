<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router=useRouter();
</script>

<template>
  <div class="fixed left-0 top-0px flex items-center p-y-0 p-x-0.625rem w-full h-70px bg-white text-0.9375rem pt-10px">
        <van-icon name="arrow-left" class="back"  @click="router.go(-1)"/>
        <span class="m-l-30%">设置</span>
    </div>
</template>

<style>

</style>