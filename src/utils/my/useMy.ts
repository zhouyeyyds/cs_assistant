import { ref,Ref} from "vue"

export const useMy=()=>{
    const greet:string[]=["早上好","中午好","下午好","晚上好"];
    const greetIndex:Ref<number>=ref(0)
    const dt:Date=new Date;
    const hour:number=dt.getHours()

    // 根据当前时间决定问候语
    const getGreetByHour=()=>{
        if(hour<12&&hour>6){
          greetIndex.value=0
        }else if(hour<15){
          greetIndex.value=1
        }else if(hour<19){
          greetIndex.value=2
        }else{
          greetIndex.value=3
        }
    }

    const text:string[]=["玻璃晴朗，橘子辉煌。","不要停止奔跑，不要回顾来路，来路无可眷恋，值得期待的只有前方。",
      "你只管努力，剩下的交给时间。","希望熬过一切，星光璀璨。","愿星光为你加冕，青云与你同行，你是人间最美好的风与朝阳，是三百里柔软缠绵的乐章。"]
    const randIndex:number=Math.floor(Math.random()*text.length)

    return{
        greet,greetIndex,text,randIndex,getGreetByHour
    }
}