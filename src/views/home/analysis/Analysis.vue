<script setup lang="ts">
import Navbar from "@/components/analysis/Navbar.vue"
import { onMounted, ref, Ref } from "vue"
import {ECharts,EChartsOption,init} from 'echarts';
import { useTestStore } from "@/store/useTestStore/testStore";


        const testStore=useTestStore();

        let chart:ECharts;
        let avgchart:ECharts;
        const chartRef:Ref<HTMLElement | null >=ref(null);
        const avgchartRef:Ref<HTMLElement | null >=ref(null);

        const titlename:string[] = ["计组", "计网", "操作系统", "数据结构"];
        const myColor:string[] = ["#1089E7", "#F57474", "#56D0E3", "#F8B448"];
        const index=ref(0)
        const avg:string[]=[testStore.pocoAvg,testStore.cnetAvg,testStore.osAvg,testStore.dsAvg]

        // 初始化图表
        const initchart=()=>{
            const option:EChartsOption={
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    right: "2%",
                    textStyle: {
                        color: "#4c9bfd"
                    }
                },
                grid: {
                    top: "15%",
                    left: "2%",
                    right: "1%",
                    bottom: "3%",
                    show: true,
                    containLabel: true
                },
                xAxis: {
                    type:'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    data: ['1', '2', '3', '4', '5', '6','7']
                },
                yAxis: {
                    type:"value"
                },
                series: [
                    {
                    name: '计组',
                    type: 'line',
                    data: testStore.pocoGrade.slice(0,7),
                    smooth: true,
                    },
                    {
                    name: '计网',
                    type: 'line',
                    data: testStore.cnetGrade.slice(0,7),
                    smooth: true
                    },
                    {
                    name: '操作系统',
                    type: 'line',
                    data: testStore.osGrade.slice(0,7),
                    smooth: true
                    },
                    {
                    name: '数据结构',
                    type: 'line',
                    data: testStore.dsGrade.slice(0,7),
                    smooth: true
                    },

                ]
            }
            chart.setOption(option);
            // 监听页面的变化
            window.addEventListener("resize",()=>{
                chart.resize();
            })
        }

        // 渲染平均分的图表
        const initAvg=()=>{
            const avgoption:EChartsOption={
                grid: {
                    top: "10%",
                    left: "22%",
                    bottom: "10%"
                },
                xAxis: {
                    show: false
                },
                yAxis: [
                    {
                        type: "category",
                        inverse: true,
                        data: titlename,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: "#35a1fc"
                        }
                    },
                    {
                        data: [100, 100, 100, 100],
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: "#35a1fc"
                        }
                    }
                ],
                series: [
                {
                    name: "条",
                    type: "bar",
                    data: avg,
                    yAxisIndex: 0,
                    itemStyle: {
                        borderRadius: 20,
                        color: (params)=> myColor[params.dataIndex]
                    },
                    barCategoryGap: 50,
                    barWidth: 10,
                    label: {
                        show: true,
                        position: "inside",
                        formatter: "{c}"
                    }
                },
                {
                    name: "框",
                    type: "bar",
                    barCategoryGap: 50,
                    barWidth: 15,
                    yAxisIndex: 1,
                    data: [100, 100, 100, 100],
                    itemStyle: {
                        color: "none",
                        borderColor: "#00c1de",
                        borderWidth: 3,
                        borderRadius: 15
                    }
                }
                ]
            }
            avgchart.setOption(avgoption);
            window.addEventListener("resize",()=>{
                avgchart.resize();
            })
        }

        onMounted(()=>{
            chart=init(chartRef.value as HTMLElement);
            avgchart=init(avgchartRef.value as HTMLElement);
            
            initchart();
            initAvg();
        })
</script>

<template>
    <!-- 顶部导航 -->
  <Navbar></Navbar>
  <div class="mt-72px  shadow-sm" >
        <van-tabs v-model:active="index"  swipeable  lazy-render>
          <van-tab title="各科成绩" class="my-15px px-20px"/>
          <van-tab title="平均分" class="my-15px px-20px"/>
        </van-tabs>
    </div>
  <!-- echart图表 -->
  <div ref="chartRef" class="w-350px h-300px mt-30px mx-a" v-show="index==0"></div>
  <div ref="avgchartRef" class="w-350px h-300px mx-a" v-show="index==1"></div>
</template>

<style>

</style>