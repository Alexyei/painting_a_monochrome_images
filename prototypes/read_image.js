import Jimp from "jimp";

// Jimp.read('./images/yin-yang.png')
//     .then(image => {
//         image.greyscale(); // делаем изображение монохромным
//         image.threshold({max: 128}); // устанавливаем порог для перевода в черно-белый формат
//         return image.writeAsync('./images/yin-yang1.png'); // сохраняем изображение
//     })
//     .catch(err => {
//         console.error(err);
//     });

function arrayToMatrix(arr, n) {
    const matrix = [];
    while (arr.length) {
        matrix.push(arr.splice(0, n));
    }
    return matrix;
}

Jimp.read("./images/yin-yang1.png", function (err, image) {
    // image.greyscale(); // делаем изображение монохромным
    // image.threshold({max: 128}); // устанавливаем порог для перевода в черно-белый формат
    // image.write('./images/yin-yang1.png');
    const imageArray = []

    for(let i = 0;i<image.bitmap.data.length;i+=4){
        const value = image.bitmap.data[i]
        // if ((value!==0) && (value !==255))
        //     console.log(value)
        if (value === 0) imageArray.push(1)
        else imageArray.push(0)
    }
    const matrix = arrayToMatrix(imageArray,image.bitmap.width)
        console.log()
    // console.log(image.bitmap.data)
});