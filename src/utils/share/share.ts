import { ref } from 'vue';

export const share=()=>{
    // 分享面板
    const showShare=ref(false);
    const options = [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
    ];

    return{
        showShare,options
    }
}