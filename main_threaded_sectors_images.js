import parse from "./load_data.js";
import rectangle_count from  "./threaded_spiral_sectors.js"
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
    const name = img.split('\\').at(-1)

    for(let i = 0;i<image.bitmap.data.length;i+=4){
        const value = image.bitmap.data[i]
        if (value === 0) imageArray.push(1)
        else imageArray.push(0)
    }
    const matrix = arrayToMatrix(imageArray,image.bitmap.width)
    const total = await rectangle_count(matrix,name)
    console.log(name, total)
}))

console.timeEnd('main');