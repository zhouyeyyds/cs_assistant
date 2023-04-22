import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import Unocss from 'unocss/vite';

// 引入svg图
import path from 'path'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

export default defineConfig({
  esbuild:{//打包时去除console 和  debugger代码
    drop:["console","debugger"]
  },
  plugins: [
    vue(),
    Unocss(),
    createSvgIconsPlugin({//引入SVG图标素材文件
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[name]',
    }),
  ],

  //解决“vite use `--host` to expose”
  base: './',	//不加打包后白屏
  server: {             
    host:'0.0.0.0',
    port: 8080,      
    open: true,
    proxy:{
      "/api":{
        target:"http://118.178.89.214:3000/api",
        changeOrigin:true,
        rewrite(){
          return ""
        }
      }
    }
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
