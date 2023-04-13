<script setup lang="ts">
import { useRouter } from 'vue-router';


        const router=useRouter()
</script>

<template>
    <!-- 顶部导航 -->
    <div class="fixed left-0 top-0 flex items-center p-y-0 p-x-0.625rem w-full h-3.75rem  text-0.9375rem z-999 navbar">
        <van-icon name="arrow-left" class="back" @click="router.go(-1)"/>
        <span class="m-l-30%">关于软件</span>
    </div>
    <!-- 相关介绍 -->
    <div class="mt-4.0625rem bg-[#fff] p-1.875rem">
        <!-- 软件介绍 -->
        <div class="border-b-solid border-b-[#e5e5e5] mb-1.25rem border-b-0.0625rem">
            <p class="mb-1.25rem border-l-[#35a1fc] border-l-solid px-0.625rem animate__animated animate__bounceIn">软件介绍</p>
            <p class="text-0.875rem mb-1.25rem">CS小助手和大家见面啦，本软件包含计算机组成原理、计算机网络、数据结构、操作系统四门课程的部分选择题题库。</p>
        </div>
        <!-- 功能介绍 -->
        <div class="mb-1.25rem border-b-solid border-b-[#e5e5e5] border-b-0.0625rem">
            <p class="mb-1.25rem border-l-[#35a1fc] border-l-solid px-0.625rem animate__animated animate__bounceIn">功能介绍</p>
            <div class="pl-1.25rem">
                <p class="text-0.875rem mb-1.25rem">1.【搜索功能】主页面顶部点击搜索框即可进行搜索。搜索结果支持对关键字的高亮。</p>
                <p class="text-0.875rem mb-1.25rem">2.【错题集】收集整理大家每次做错的题目，之后复习时可找到错题，方便大家再次巩固、练习。</p>
                <p class="text-0.875rem mb-1.25rem">3.【收藏夹】大家在平时练习题目时，可以点击左下角的收藏图标收藏此题，也可以在设置中设置错题自动收藏。</p>
                <p class="text-0.875rem mb-1.25rem">4.【模拟考试】类似于小测验，将题库中的题目打乱，随机出题，达到测验的效果。在点击交卷以后，可以查看本次考试成绩和错题回顾，帮助您总结经验。</p>
                <p class="text-0.875rem mb-1.25rem">5.【成绩分析】成绩分析会收集各个科目最近7次的模拟考试成绩，并以图表的形式呈现出来，同时还可以查看各科的考试平均分。</p>
            </div>
        </div>
        <!-- 特别提醒 -->
        <div class="mb-1.25rem border-b-solid border-b-[#e5e5e5] border-b-0.0625rem">
            <p class="mb-1.25rem border-l-[#35a1fc] border-l-solid px-0.625rem animate__animated animate__bounceIn">特别提醒</p>
            <div class="pl-1.25rem">
                <p class="text-0.875rem mb-1.25rem">1.	如遇到软件bug或有任何疑问，请在“我的”界面，给予反馈和建议，我们会一直关注。</p>
                <p class="text-0.875rem mb-1.25rem">2.	本软件题库均为中国矿业大学所使用的题库，如答案出现问题，请联系我们进行更改。</p>
                <p class="text-0.875rem mb-1.25rem">3.	使用中遇到异常错误可以点击设置页面中的“清空数据”进行还原(会清空所有已保存的用户答题数据)。</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>