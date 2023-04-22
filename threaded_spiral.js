import {isMainThread, parentPort, threadId, Worker, workerData} from "worker_threads";
import rectangle_count from  "./single_spiral.js"
import { fileURLToPath } from 'url'


export default (image) => new Promise(function (resolve, reject)  {
    // console.log(global.__filename)
    const filename = fileURLToPath(import.meta.url)
    const sectors = [
        [0,0,image.length,image[0].length],
        // [0,0,image.length,image[0].length],
        // [0,0,image.length,image[0].length],
    ]
    let finishedWorkers = 0;
    let total = 0
    for(const sector of sectors){
        const worker = new Worker(filename, {
            workerData: {image,sector}
        });
        worker.on('message', (value)=>{
            total+=value
            if (++finishedWorkers === sectors.length)
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
    console.log(`ID:${threadId} Starting`);
    // const outImg = workerData.replace('.jpeg', '_small.jpeg');
    const total =  rectangle_count(workerData.image, workerData.sector)
    // const total =  0
    // console.log("FIND TOTAL")
    parentPort.postMessage(total);
    console.log(`ID:${threadId} Ending`);
}