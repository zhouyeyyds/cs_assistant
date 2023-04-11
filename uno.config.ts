// 引入Unocss
import { defineConfig,presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
    presets://预设 
    [
        presetUno(),
        presetAttributify(),//属性化预设
        presetIcons()//图标预设
    ],
    shortcuts:[// 设置快捷指令
        ["f-b-c",'flex justify-between items-center'],
        ["flex-col","flex flex-col"],
        ["center","flex justify-center items-center"]
    ],

    rules: // 在这个可以增加预设规则, 也可以使用正则表达式
    [ 
        [
        'p-c', // 使用时只需要写 p-c 即可应用该组样式
        {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`
        },
        ],
    ]
})