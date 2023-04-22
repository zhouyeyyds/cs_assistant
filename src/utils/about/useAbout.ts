interface Idata{
    title:string;
    contend:string[]
}
export const useAbout=()=>{
    const data:Idata[]=[
        {
            title:"软件介绍",
            contend:[
                "CS小助手和大家见面啦，本软件包含计算机组成原理、计算机网络、数据结构、操作系统四门课程的部分选择题题库。"
            ]
        },
        {
            title:"功能介绍",
            contend:[
                "1.【搜索功能】主页面顶部点击搜索框即可进行搜索。搜索结果支持对关键字的高亮。",
                "2.【错题集】收集整理大家每次做错的题目，之后复习时可找到错题，方便大家再次巩固、练习。",
                "3.【收藏夹】大家在平时练习题目时，可以点击左下角的收藏图标收藏此题，也可以在设置中设置错题自动收藏。",
                "4.【模拟考试】类似于小测验，将题库中的题目打乱，随机出题，达到测验的效果。在点击交卷以后，可以查看本次考试成绩和错题回顾，帮助您总结经验。",
                "5.【成绩分析】成绩分析会收集各个科目最近7次的模拟考试成绩，并以图表的形式呈现出来，同时还可以查看各科的考试平均分。"
            ]
        },
        {
            title:"特别提醒",
            contend:[
                "1.	如遇到软件bug或有任何疑问，请在“我的”界面，给予反馈和建议，我们会一直关注。",
                "2.	本软件题库均为中国矿业大学所使用的题库，如答案出现问题，请联系我们进行更改。",
                "3.	使用中遇到异常错误可以点击设置页面中的“清空数据”进行还原(会清空所有已保存的用户答题数据)。"
            ]
        },
    ]

    return{
        data
    }
}