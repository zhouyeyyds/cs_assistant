## 环境配置
- IDE [VSCode](https://code.visualstudio.com/)

## 1. 下载 [node.js](https://nodejs.org/zh-cn/)
## 2. 安装
## 3. 查看是否安装成功
*   `node -v` 查看node的版本
*   `npm -v`  查看npm的版本(新版的node安装自带安装npm）
>  使用快捷键 win+r => 输入cmd 指令进入命令提示符窗

## 4. 设置淘宝镜像
> 右击“以管理员身份运行”运行Windows PoweShell，进入命令提示符窗

*  查看当前镜像地址：
```npm
npm config get registry
```
* 设置淘宝镜像地址：
```npm
npm config set registry https://registry.npm.taobao.org
```

## 5. 导入数据库 
> 将test.sql导入自己的数据库

## 6. 启动服务器 
> 新建一个终端 进入目录 `cd D:\vue3\cs_assistant\server` 

> 输入 
```node.js
node app.js
```

## 7. 启动运行
>  进入目录 `cd D:\vue3\cs_assistant` 

>  输入
```npm
 npm install
```
 安装依赖
> 然后输入
```npm
npm run dev
```


 ### ***即可在浏览器运行该软件*** 


## 技术栈

- [Vue3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vant4](https://vant-contrib.gitee.io/vant/v4/#/zh-CN/) 移动端组件库
- [Uno.css](https://github.com/unocss/unocss) 无类名 CSS 框架
- [Animate.css](https://animate.style/) 基础动画库

## 安装使用

- 安装依赖 `npm install`
- 运行 `npm run dev`
- 打包 `npm run build`

## 目前页面

- 首页 `/home`
- 搜索 `/search`
- 浏览题库 `/lib`
- 错题本 `/errorbook`
- 收藏夹 `/collect`
- 成绩分析 `/analysis`

- 考试页面 `/test`
- 顺序练习 `/practice`
- 模拟考试 `/simulate`

- 我的页面 `/my`
- 设置 `/setting`
- 关于软件 `/about`

## 课程对应英文 课程号

- 计算机组成原理 poco 1
- 计算机网路 cnet 2
- 操作系统 os 3
- 数据结构 ds 4
