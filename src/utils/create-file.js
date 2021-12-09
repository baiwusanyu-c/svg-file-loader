/*
* @create-file.js
* @deprecated 
* @author czh
* @update (czh 2021/12/8)
*/
// 拼接脚本内容
import {camelize} from "./parser.js";
import {writeFile,exists,mkdir} from 'fs'
/**
 * 生成脚本文件
 * @param outputPath 输出路径
 * @param fileName 文件名
 * @param svgData 读取的svg内容对象
 */
export function createFile(outputPath,fileName,svgData){
    let scriptContent = ``
    svgData.forEach(val=>{
        scriptContent = scriptContent + `export const ${camelize(val.name)} = '${val.svg}';\n`
    })
    /**
     * 生成脚本文件
     */
    exists(outputPath,  function(exists) {
        if(!exists){
             mkdir(outputPath,()=>{
                 writeFile(outputPath+fileName,scriptContent,function (err){
                     if(err) {
                         return console.log(err);
                     }
                     console.log("The file was saved!");
                 })
             })
        }
    });

}
