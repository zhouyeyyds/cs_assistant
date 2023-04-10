<script setup lang="ts">
import { ref } from 'vue';


        const time = ref(45 * 60 * 1000);
</script>

<template>
  <div class="m-l-30%">
            <van-count-down :time="time">
                <template #default="timeData">
                    <div class="f-b-c">
                        <span class=" w-22px text-[#fff] text-12px bg-[#1989fa] text-center">{{ timeData.hours }}</span>
                        <span class=" mx-4px">:</span>
                        <span class=" w-22px text-[#fff] text-12px bg-[#1989fa] text-center">{{ timeData.minutes }}</span>
                        <span class=" mx-4px">:</span>
                        <span class=" w-22px text-[#fff] text-12px bg-[#1989fa] text-center">{{ timeData.seconds }}</span>
                    </div>
                </template>
            </van-count-down>
        </div>
</template>

<style>

</style>