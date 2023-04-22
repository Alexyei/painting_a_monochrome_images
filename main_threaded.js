import parse from "./load_data.js";
import rectangle_count from  "./threaded_spiral.js"

console.time('main');
parse("./data/test.xlsx").forEach(async (element)=>{
    // проверяем, что массив не пустой
    if (element.data)
    {
        const total = await rectangle_count(element.data)
            console.log(element.name,total)
    }

})

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