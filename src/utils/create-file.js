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
 * @param type 生成文件类型 ts/js
 * @param format 生成文件导出类型 export 逐个个导出或default 为export default 多个导出
 */
export function createFile(outputPath,fileName,svgData,type='ts',format='default'){
    let scriptContent = ``
    const fileType = type === 'ts' ? ':string' :''
    const ISVGDict = `
export interface ISVGDict {\n
    [key:string]:string
}\n`
    let defaultDict = `
${type === 'ts' ? ISVGDict :''}
export default {\n`
    svgData.forEach(val=>{
        if(format === 'export'){
            scriptContent = scriptContent + `export const ${camelize(val.name)}${fileType} = '${val.svg}';\n`
        }else{
            defaultDict = defaultDict + `${camelize(val.name)}:'${val.svg}',\n`
        }
    })
    if(format === 'default') {
        defaultDict = defaultDict + '} '
        if(type === 'ts'){
            defaultDict = defaultDict + 'as ISVGDict;\n'
        }
        scriptContent = defaultDict
    }
    /**
     * 生成脚本文件
     */
    exists(outputPath,  function(exists) {
        if(!exists){
             mkdir(outputPath,()=>{
                 writeFile(outputPath+fileName+'.'+type,scriptContent,function (err){
                     if(err) {
                         return console.log(err);
                     }
                     console.log("The file was saved!");
                 })
             })
        }
    });

}
