<script setup lang="ts">
import { useAbout } from '@/utils/about/useAbout';

        const {data}=useAbout()
</script>

<template>
    <div class="mt-75px bg-[#fff] p-1.875rem">
        <div class="border-b-solid border-b-[#e5e5e5] mb-1.25rem border-b-0.0625rem" v-for="item,index in data" :key="index">
            <p class="mb-1.25rem border-l-[#35a1fc] border-l-solid px-0.625rem animate__animated animate__bounceIn text-lg">{{ item.title }}</p>
            <p class="text-0.875rem mb-1.25rem " v-for="str,index in item.contend" :key="index">{{ str }}</p>
        </div>
    </div>
</template>