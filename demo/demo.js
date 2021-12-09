/*
* @demo.js.js
* @deprecated 
* @author czh
* @update (czh 2021/12/9)
*/
// import {findSvgFile,createFile} from "../src/index.js";
import {findSvgFile,createFile} from "../svg-file-loader.js";
import {config} from "./config.js";
// 读取svg文件内容
const svgData = findSvgFile(config.input)
// 生成脚本文件
createFile(config.output,config.name,svgData)