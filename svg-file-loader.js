import { readdirSync, readFileSync, exists, mkdir, writeFile } from 'fs';

/*
* @parser.js
* @deprecated 
* @author czh
* @update (czh 2021/12/8)
*/
/**
 * 驼峰转化
 * @param str 待转化字符串
 * @return {*}
 */
const camelize = function (str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
};

/*
* @svg-file-loader.js
* @deprecated 
* @author czh
* @update (czh 2021/12/8)
*/

const svgTitle = /<svg([^>+].*?)>/;
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;
const hasViewBox = /(viewBox="[^>+].*?")/g;
const clearReturn = /(\r)|(\n)/g;

const findSvgFile = (dir)=>{
    const svgRes = [];
    const readInst = readdirSync(dir, {
        withFileTypes: true
    });
    for (const dirent of readInst) {
        if (dirent.isDirectory()) {
            svgRes.push(...findSvgFile(dir + dirent.name + '/'));
        } else {
            const svg = readFileSync(dir + dirent.name)
                .toString()
                .replace(clearReturn, '')
                .replace(svgTitle, ($1, $2) => {
                    let width = 0;
                    let height = 0;
                    let content = $2.replace(
                        clearHeightWidth,
                        (s1, s2, s3) => {
                            if (s2 === 'width') {
                                width = s3;
                            } else if (s2 === 'height') {
                                height = s3;
                            }
                            return ''
                        }
                    );
                    if (!hasViewBox.test($2)) {
                        content += `viewBox="0 0 ${width} ${height}"`;
                    }
                    return `<symbol id="${camelize(dirent.name.replace('.svg',''))}" ${content}>`
                })
                .replace('</svg>', '</symbol>');
            svgRes.push({name:dirent.name.split('.svg')[0],svg:svg});
        }
    }
    return svgRes
};

/*
* @create-file.js
* @deprecated 
* @author czh
* @update (czh 2021/12/8)
*/
/**
 * 生成脚本文件
 * @param outputPath 输出路径
 * @param fileName 文件名
 * @param svgData 读取的svg内容对象
 */
function createFile(outputPath,fileName,svgData){
    let scriptContent = ``;
    svgData.forEach(val=>{
        scriptContent = scriptContent + `export const ${camelize(val.name)} = '${val.svg}';\n`;
    });
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
                 });
             });
        }
    });

}

export { createFile, findSvgFile };
