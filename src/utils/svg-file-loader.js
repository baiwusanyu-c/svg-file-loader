/*
* @svg-file-loader.js
* @deprecated 
* @author czh
* @update (czh 2021/12/8)
*/
import {readFileSync, readdirSync} from 'fs'
import {camelize} from "./parser.js";

const svgTitle = /<svg([^>+].*?)>/
const clearHeightWidth = /(width|height)="([^>+].*?)"/g
const hasViewBox = /(viewBox="[^>+].*?")/g
const clearReturn = /(\r)|(\n)/g

export const findSvgFile = (dir)=>{
    const svgRes = []
    const readInst = readdirSync(dir, {
        withFileTypes: true
    })
    for (const dirent of readInst) {
        if (dirent.isDirectory()) {
            svgRes.push(...findSvgFile(dir + dirent.name + '/'))
        } else {
            const svg = readFileSync(dir + dirent.name)
                .toString()
                .replace(clearReturn, '')
                .replace(svgTitle, ($1, $2) => {
                    let width = 0
                    let height = 0
                    let content = $2.replace(
                        clearHeightWidth,
                        (s1, s2, s3) => {
                            if (s2 === 'width') {
                                width = s3
                            } else if (s2 === 'height') {
                                height = s3
                            }
                            return ''
                        }
                    )
                    if (!hasViewBox.test($2)) {
                        content += `viewBox="0 0 ${width} ${height}"`
                    }
                    return `<symbol id="${camelize(dirent.name.replace('.svg',''))}" ${content}>`
                })
                .replace('</svg>', '</symbol>')
            svgRes.push({name:dirent.name.split('.svg')[0],svg:svg})
        }
    }
    return svgRes
}
