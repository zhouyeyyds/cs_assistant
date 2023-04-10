import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 引入svg图
import path from 'path'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({ // 使用Unocss
    presets: 
    [
      presetUno(),
      presetAttributify(),//属性化预设
      presetIcons()//图标预设
    ],
    shortcuts:[
      // 设置快捷指令
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
      [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    ]
      
    }),
    //引入SVG图标素材文件
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]',
    })

  ],

  //解决“vite use `--host` to expose”
  // base: './',	//不加打包后白屏
  server: {             
    host:'0.0.0.0',
    port: 8080,      
    open: true,
  },
  resolve:{   
    alias:[   
      {
        find:'@',
        replacement:resolve(__dirname,'src') 
      }
    ]
  }
})
