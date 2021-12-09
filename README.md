# svg-file-loader
基于node.js的svg文件解析脚本
它能够根据指定输入目录，输出目录,输出文件名称来生成  
包含有svg信息的js脚本文件。
##安装
````
npm i svg-file-loader
or 
cnpm i svg-file-loader
````
##使用
### 1.放入静态svg资源文件
你可以直接将你的svg文件存放入assets/icon文件夹内，  
当然你也可以存放在其他地方，只需要将对应文件夹路径最为参数  
传递即可。
### 2.编写参数配置
在demo文件夹中的config.js,在这个文件中填写对应参数
````
input -- 静态svg文件存放路径
output -- 脚本文件生成路径
name -- 生成脚本文件名
````
### 3.执行命令生成脚本
你可以直接运行demo.js或使用命令npm run来生成最终的脚本文件。  
值得注意的是，直接运行demo.js时，config.js中的input和  
output参数与使用命令使用命令npm run的路径是不一样的，这里一定要  
注意。
####demo.js 对应 config
````
 input:'../assets/icon/',
 output:'../dist/',
 name:'svgDict.js',
````
####npm run 对应 config
````
 input:'./assets/icon/',
 output:'./dist/',
 name:'svgDict.js',
````
最终我们会得到脚本文件（以demo为例）svgDict.js
他的将根据svg文件名导出变量如下
````
export const content1 = <?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN".............. '
export const content2 = <?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN".............. '
````
##Api
|  方法名称   |  说明   | 参数  | 返回 |
|  ---- |  ----  | ----  | ----  | 
|  findSvgFile |  根据传入参数，搜索指定文件夹内svg文件  | dir:String svg文件路径| Array<{name:String,svg:String}><br>fileName：驼峰化的svg文件名<br>svg:对应svg文件的innerHTML| 
|  createFile |  根据传入参数，生成指定目录svg脚本  | outputPath:String 指定的输出路径<br>fileName:String 指定的输出文件名 <br>svgData:Array<{name:String,svg:String} findSvgFile的返回值| void|
##其他
#### 1.由于脚本会根据svg文件名生成变量,所以文件名不能是JavaScript的关键字，文件名应该使用XXX.svg 或 XXX-YYY.svg格式
#### 2.一定要注意输入和输出路径是否正确