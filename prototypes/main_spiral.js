import parse from "../load_data.js";
import rectangle_count from "../single_spiral.js"
console.time('main')
parse("./data/spiral.xlsx").forEach((element)=>{
    // проверяем, что массив не пустой
    if (element.data)
        console.log(element.name,
            rectangle_count(element.data,
                [3,2,5,4]))
})
console.timeEnd('main')