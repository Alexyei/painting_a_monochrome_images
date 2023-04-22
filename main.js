import parse from "./load_data.js";
import rectangle_count from  "./single_spiral.js"
console.time('main')
parse("./data/test.xlsx").forEach((element)=>{
    // проверяем, что массив не пустой
    if (element.data)
        console.log(element.name,
            rectangle_count(element.data,
                [0,0,element.data.length,element.data[0].length]))
})
console.timeEnd('main')