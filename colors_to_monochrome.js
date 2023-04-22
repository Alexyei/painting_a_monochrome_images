import {glob} from "glob";
import Jimp from "jimp";
const dirFrom = 'images/colors/'
const dirTo = 'images/monochrome/'
const images = glob.sync(dirFrom+'*')

images.forEach(img=>Jimp.read(img)
    .then(image => {
        image.greyscale(); // делаем изображение монохромным
        //В данном случае, если яркость пикселя больше 128, то он станет белым, а если меньше или равно 128, то черным.
        image.threshold({max: 128}); // устанавливаем порог для перевода в черно-белый формат
        // console.log(img.split('\\').at(-1))
        // console.log(img.replace(dirFrom,dirTo))
        return image.writeAsync(dirTo+img.split('\\').at(-1)); // сохраняем изображение
    })
    .catch(err => {
        console.error(err);
    }));