function generateSpiralArray(rows, cols) {
    let result = [];
    for (let i = 0; i < rows; i++) {
        result.push(new Array(cols));
    }

    let rowStart = 0;
    let rowEnd = rows - 1;
    let colStart = 0;
    let colEnd = cols - 1;
    let direction = "right";
    let counter = 1;

    while (rowStart <= rowEnd && colStart <= colEnd) {
        if (direction === "right") {
            for (let i = colStart; i <= colEnd; i++) {
                result[rowStart][i] = counter++;
            }
            rowStart++;
            direction = "down";
        } else if (direction === "down") {
            for (let i = rowStart; i <= rowEnd; i++) {
                result[i][colEnd] = counter++;
            }
            colEnd--;
            direction = "left";
        } else if (direction === "left") {
            for (let i = colEnd; i >= colStart; i--) {
                result[rowEnd][i] = counter++;
            }
            rowEnd--;
            direction = "up";
        } else if (direction === "up") {
            for (let i = rowEnd; i >= rowStart; i--) {
                result[i][colStart] = counter++;
            }
            colStart++;
            direction = "right";
        }
    }

    return result;
}

function printSpiralArray(arr){
    let rowStart = 0
    let colStart = 0
    let rowEnd = arr.length - 1
    let colEnd = arr[0].length - 1

    while(rowStart <= rowEnd && colStart <= colEnd){
        // слева направо
        for (let j=colStart;j<=colEnd;++j){
            // if (arr[rowStart][j]===1)
            //     paint("down")
            console.log(arr[rowStart][j])
        }
        rowStart++

        // сверху вниз
        for (let i=rowStart;i<=rowEnd;++i){
            // if (arr[i][colEnd]===1)
            //     paint("down")
            console.log(arr[i][colEnd])
        }
        colEnd--

        // справа налево
        for (let j=colEnd;j>=colStart;--j){
            // if (arr[rowEnd][j]===1)
            //     paint("down")
            console.log(arr[rowEnd][j])
        }
        rowEnd--

        //снизу вверх
        for (let i=rowEnd;i>=rowStart;--i){
            // if (arr[i][colStart]===1)
            //     paint("down")
            console.log(arr[i][colStart])
        }
        colStart++

    }
}


// Пример использования
const rows = 4;
const cols = 5;
const spiralArray = generateSpiralArray(rows, cols);
console.log(spiralArray);
printSpiralArray(spiralArray)


let spiralArray1 = generateSpiralArray(5, 4);
console.log(spiralArray1);
printSpiralArray(spiralArray1)


spiralArray1 = generateSpiralArray(5, 5);
console.log(spiralArray1);
printSpiralArray(spiralArray1)


spiralArray1 = generateSpiralArray(4, 4);
console.log(spiralArray1);
printSpiralArray(spiralArray1)

spiralArray1 = generateSpiralArray(3, 4);
console.log(spiralArray1);
printSpiralArray(spiralArray1)


spiralArray1 = generateSpiralArray(4, 3);
console.log(spiralArray1);
printSpiralArray(spiralArray1)