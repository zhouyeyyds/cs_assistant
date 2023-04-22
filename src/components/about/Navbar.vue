<script setup lang="ts">
import { useRouter } from 'vue-router';

        const router=useRouter()

</script>

<template>
    <div class="fixed left-0 top-0 flex items-center p-y-0 p-x-0.625rem w-full h-70px  text-0.9375rem z-999 navbar pt-10px">
        <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
        <span class="m-l-30%">关于软件</span>
    </div>
</template>