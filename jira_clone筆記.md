## day1

1、在一个函数里，改变传入的对象本身是不好的。(js内的对象是引用对象),使用 const result = {...object} 类似于Object.assign({},object)
2、当表达式为undefined时， 表达式.name 会报错，可以使用 表达式?.name ,此时整个表达式都会为undefined
3、当要对数字做if判断时，0是一种特殊情况，此时可以使用 export const isFalsy = (value) => value === 0 ? true : value
if(isFalsy(value)){
......
}
此时排除了0无法进入if语句内的情况
4、hooks无法在普通函数中运行，只能在其它hooks中或者组件中运行
5、debounce
const debounce = (func,delay)=>{
let timeout;

    return ()=>{
        if(timeout){
            clearTimeout(timeout)
        }
        timeout = setTimeout(function(){
            func()
        },delay)
    }

    /*
    function x(){
        if(timeout){
            clearTimeout(timeout)
        }
        timeout = setTimeout(function(){
            func()
        },delay)
    }
    return x
    */

}

const log = debounce(() => console.log('call'),5000)
log()
log()
log()
控制台5s后只会打印一次call

debounce原理：
0s------->1s-------->2s---------->...
一定要理解：这三个log()都是同步操作的，都是在0-1s内瞬间完成：
执行第一个log()，发现timeout为undefined，然后设置timeout为#1（为了方便的假设，实际上为一个定时器)
执行第二个log()，发现timeout为#1，取消它，然后设置timeout为#2
执行第三个log()，发现timeout为#2，取消它，然后设置timeout为#3
所以最后其实就只剩timeout为#3在独自等待了，所以5s后只会输出第三个log()，前面两个都被取消
