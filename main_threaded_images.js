import parse from "./load_data.js";
import rectangle_count from  "./threaded_spiral.js"
import {glob} from "glob";
import Jimp from "jimp";


function arrayToMatrix(arr, n) {
    const matrix = [];
    while (arr.length) {
        matrix.push(arr.splice(0, n));
    }
    return matrix;
}

console.time('main');

const dirFrom = 'images/monochrome/'
const images = glob.sync(dirFrom+'*')

images.forEach(img=>Jimp.read(img).then( async (image)=>{
    const imageArray = []

    for(let i = 0;i<image.bitmap.data.length;i+=4){
        const value = image.bitmap.data[i]
        if (value === 0) imageArray.push(1)
        else imageArray.push(0)
    }
    const matrix = arrayToMatrix(imageArray,image.bitmap.width)
    const total = await rectangle_count(matrix)
    console.log(img.split('\\').at(-1), total)
}))


// parse("./data/test.xlsx").forEach(async (element)=>{
//     // проверяем, что массив не пустой
//     if (element.data)
//     {
//         const total = await rectangle_count(element.data)
//         console.log(element.name,total)
//     }
//
// })

// (async () => {
//     await Promise.all(parse("./data/test.xlsx").map(async (element)=>{
//         // проверяем, что массив не пустой
//         if (element.data)
//         {
//             const total = await rectangle_count(element.data)
//             console.log(element.name,total)
//         }
//
//     }));
//     console.timeEnd('main')
// })();
console.timeEnd('main');