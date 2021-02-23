<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-15 23:16:21
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-02 09:26:56
-->
<template>
    <div>
        <div style="border: 1px solid #ccc;">
            <h1>明文密码</h1>
            <div class="qrcode" ref="qrCodeUrl"></div>
        </div>
        <img id="barcode"/>
        <div style="border: 1px solid red; margin-top: 20px;">
            <div class="controls">
                <fieldset class="input-group">
                  <input type="file" accept="image/*;capture=camera">
                     <button id="btnIdents">识别</button>
                </fieldset>
              </div>
              <div id="interactive" class="viewport"><br clear="all"></div>
             </section>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
    import JsBarcode from 'jsbarcode'
    import Quagga from 'quagga'; // ES6
    
    export default{
        data(){
            return{
                currentPerson: '',
                allPerson:[
                    {
                        id: 'SwgQCTnhrTk4Z4y2F',
                        stuId: '111542145',
                        name: '袁一正'

                    },
                    {
                        id: '12asfafd12365',
                        stuId: '111542150',
                        name: '张三'

                    }
                ]
            }
        },
        methods: {
            creatQrCode() {
                var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                    text: '袁先生,手机:13631338859,qq:804552579,微信:12345678,邮箱：13760518473@qq.com', // 需要转换为二维码的内容
                    width: 100,
                    height: 100,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
            },
            barcode () {
                // 袁一正 男 111542145 3班
                JsBarcode("#barcode", "SwgQCTnhrTk4Z4y2F",{

                    format: "CODE128",//选择要使用的条形码类型
                    text: '学生信息码',
                    displayValue: true,//是否在条形码下方显示文字
                    textPosition: "top"//设置文本的垂直位置

                })
            },
            enCode(){
                console.log('开始解析---')
                Quagga.init({
                    inputStream : {
                    name : "Live",
                    type : "LiveStream",
                    target: document.querySelector('#barcode')    // Or '#yourElement' (optional)
                    },
                    decoder : {
                    readers : ["code_128_reader"]
                    }
                }, function(err) {
                    if (err) {
                        console.warn('错误:',err);
                        return
                    }
                    console.log("Initialization finished. Ready to start");
                    Quagga.start();
                });
                Quagga.onProcessed((data)=>{
                    // console.error('data:',data)
                })
            },
            initParser(){
                let that = this;
                var App = {
                    init: function() {
                        App.attachListeners();
                    },
                    attachListeners: function() {
                        var self = this;
                        $("#btnIdents").on("click", function(e) {
                            var input = document.querySelector(".controls input[type=file]");
                            if (input.files && input.files.length) {
                                App.decode(URL.createObjectURL(input.files[0]));
                            }
                        });
                    },
                    decode: function(src) {
                        var self = this,
                            config = $.extend({}, self.state, {src: src});
                        Quagga.decodeSingle(config, function(result) {
                            //识别结果
                            if(result.codeResult){
                                console.log(result.codeResult.code);
                                alert("图片中的条形码为：" + result.codeResult.code);
                                that.getPerson(result.codeResult.code)
                            }else{
                                alert("未识别到图片中的条形码！");
                            }
                        });
                    },
                    state: {
                        inputStream: {
                            size: 800,
                            singleChannel: false
                        },
                        locator: {
                            patchSize: "medium",
                            halfSample: true
                        },
                        decoder: {
                            readers: [{
                                format: "code_128_reader",
                                config: {}
                            }]
                        },
                        locate: true,
                        src: null
                    }
                };
            
                App.init();
                this.Parser = App;
            },
            getPerson(code){
                console.log('getPerson:',code);
                for(let i=0;i<this.allPerson.length;i++){
                    if(this.allPerson[i].id == code){
                        this.currentPerson = this.allPerson[i];
                        break;
                    }
                }
                console.log(' this.currentPerson:', this.currentPerson)
            }
           
        },
        mounted() {
            this.creatQrCode();
            console.log('JsBarcode:',JsBarcode)
            this.barcode();
            setTimeout(()=>{
                this.enCode()
            })
            this.$nextTick(()=>{
                this.initParser()
            })
        },
    }
</script>

<style>
    .qrcode{
        display: inline-block;
        
    }
    .qrcode img {
            width: 132px;
            height: 132px;
            background-color: #fff; 
            padding: 6px; 
            box-sizing: border-box;
        }
</style>