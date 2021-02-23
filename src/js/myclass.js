/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-07-23 22:00:05
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-07-23 22:13:23
 */ 
export class Myclass{
    constructor(a,b){
        console.log('构造函数在创建时，自动被调用：constructor:');
        this.a = a;
        this.b = b;
    }
    myname(){
        console.log('name:',this.a)
    }
}
