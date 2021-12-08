/*
* @index.js
* @deprecated 
* @author czh
* @update (czh 2021/12/8)
*/
import {findSvgFile} from "./utils/svg-file-loader.js";
import {createFile} from "./utils/create-file.js";
import {config} from "../config.js";
// 读取svg文件内容
const svgData = findSvgFile(config.input)
// 生成脚本文件
createFile(config.output,config.name,svgData)
