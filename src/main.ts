import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/Piniaconfig'

// 引入svg图
import 'virtual:svg-icons-register'
// 引入Unocss
import 'virtual:uno.css'
// 引入动画库 animate.css
import 'animate.css';
// 引入vant组件
import { Tabbar, TabbarItem,Search,Tab, Tabs ,Empty,Icon ,Switch ,
         Circle ,Tag,Swipe, SwipeItem ,Popup,Toast,SwipeCell,
         Button,DropdownMenu, DropdownItem ,CountDown ,Collapse, 
         CollapseItem ,BackTop,Pagination ,ShareSheet,PullRefresh } from 'vant';
// 引入element-plus
import ElementPlus from 'element-plus'
// 引入公共样式的css
import 'vant/lib/index.css';
import '@/assets/css/base.css'
import "@/assets/font/iconfont.css"
import "@/assets/font/iconfont.js"
import 'element-plus/dist/index.css'
// 导入rem布局
import "@/assets/rem/flexible"

const app=createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search )
app.use(Tab)
app.use(Tabs)
app.use(Empty )
app.use(Icon)
app.use(Switch )
app.use(Circle )
app.use(Tag)
app.use(SwipeItem)
app.use(Swipe)
app.use(Popup)
app.use(Toast )
app.use(SwipeCell )
app.use(Button )
app.use(DropdownMenu )
app.use(DropdownItem)
app.use(CountDown )
app.use(CollapseItem)
app.use(Collapse)
app.use(BackTop )
app.use(Pagination )
app.use(ShareSheet )
app.use(PullRefresh )


app.mount('#app')
