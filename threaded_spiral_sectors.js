import {isMainThread, parentPort, threadId, Worker, workerData} from "worker_threads";
import rectangle_count from  "./single_spiral.js"
import { fileURLToPath } from 'url'

function getSectors(image, minCols = 5, minRows = 5){
    const maxCols =image[0].length
    const maxRows =image.length

    // сейчас columnsIndex содержит только стартовые индексы колонок
    const columnsIndex = [0]
    for(let j=minCols;j<maxCols-minCols+1;++j){

        // проверяем что между колонками нет общих чёрных точек, а значит их можно разделить
        let no_neighbor = true
        for (let i = 0;i<maxRows;++i)
            if ((image[i][j-1]===1) && (image[i][j]===1)){
                no_neighbor = false
                break
            }

        if (no_neighbor){
            columnsIndex.push(j)
            j+=minCols-1
        }
    }

    // теперь columnsIndex будет содержать стартовые и конечные индексы
    columnsIndex.push(maxCols)
    for (let k=0;k<columnsIndex.length-1;++k){
        columnsIndex[k] = [columnsIndex[k], columnsIndex[k+1]]
    }
    columnsIndex.pop()

    const sectors = []
    // теперь для каждого сектора-колонки произведём разбиение по строкам
    for (const el of columnsIndex) {
        const [colStart, colEnd] = el
        // сейчас rowsIndex содержит только стартовые индексы колонок
        const rowsIndex = [0]
        for (let i = minRows; i < maxRows - minRows + 1; ++i) {
            // проверяем что между строками нет общих чёрных точек, а значит их можно разделить
            let no_neighbor = true
            for (let j =colStart; j <colEnd; ++j)
                if ((image[i - 1][j] === 1) && (image[i][j] === 1)) {
                    no_neighbor = false
                    break
                }
            if (no_neighbor) {
                rowsIndex.push(i)
                i += minRows - 1
            }
        }
        // теперь rowsIndex будет содержать и стартовые и конечные индексы
        rowsIndex.push(maxRows)
        for (let k = 0; k < rowsIndex.length - 1; ++k) {
            rowsIndex[k] = [rowsIndex[k], rowsIndex[k + 1]]
        }
        rowsIndex.pop()

        //добавляем получившиеся сектора
        //let [rowStart, colStart, rowEnd, colEnd] = sector;

        for (const sec of rowsIndex){
            const [rowStart,rowEnd] = sec
            sectors.push([rowStart,colStart, rowEnd, colEnd])
        }
    }

    return sectors
}

export default (image, name) => new Promise(function (resolve, reject)  {
    // console.log(global.__filename)
    const filename = fileURLToPath(import.meta.url)
    // const sectors = [
    //     [0,0,image.length,image[0].length],
    //     // [0,0,image.length,image[0].length],
    //     // [0,0,image.length,image[0].length],
    // ]
    const sectors = getSectors(image)
    console.log(name," n_sec:",sectors.length)
    let finishedWorkers = 0;
    let total = 0
    let workers = 0
    for(const sector of sectors){
        // проверяем, что в секторе есть хотя-бы одна единица
        let all_zero = true
        const [rowStart, colStart, rowEnd, colEnd] = sector;
        for(let i = rowStart;i<rowEnd;++i){
            for (let j=colStart;j<colEnd;++j)
                if (image[i][j] !== 0) {
                    all_zero = false
                    break;
                }

            if (!all_zero) break;
        }

        if (all_zero) continue;
        else workers++

        const worker = new Worker(filename, {
            workerData: {image,sector,name}
        });
        worker.on('message', (value)=>{
            total+=value
            if (++finishedWorkers === workers)
                resolve(total)
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            // console.log("EXIT")
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    }
});

if (!isMainThread){
    console.log(`name:${workerData.name} ID:${threadId} Starting`);
    // const outImg = workerData.replace('.jpeg', '_small.jpeg');
    const total =  rectangle_count(workerData.image, workerData.sector)
    // const total =  0
    // console.log("FIND TOTAL")
    parentPort.postMessage(total);
    console.log(`name:${workerData.name} ID:${threadId} Ending`);
}