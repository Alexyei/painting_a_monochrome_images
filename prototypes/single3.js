function paint(image, sector, startPoint) {
    const [rowStart, columnStart, rowEnd, columnEnd] = sector;
    let [row, column] = startPoint

    //иди по диагонали слева на право, сверху вниз
    let i = row+1, j = column+1
    for(;i<rowEnd && j < columnEnd;++i, ++j){
        //проверяем что диагональный элемент не 0
        if (image[i][j]===0){
            break
        }

        let no_zero = true
        //проверяем что в колонке нет нулей
        for(let k = row;k<i;++k){
            if (image[k][j]===0){
                no_zero = false
                break
            }
        }

        if (!no_zero)
            break;

        //проверяем что в строке нет нулей
        for(let k = column;k<j;++k){
            if (image[i][k]===0){
                no_zero = false
                break
            }
        }

        if (!no_zero)
            break;
    }

    // не включительно
    let [endPointI, endPointJ] = [i,j]

    //идём вправо
    for (;j<columnEnd;++j){
        let no_zero = true
        for(let k = row;k<endPointI;++k){
            if (image[k][j]===0){
                no_zero = false
                break
            }
        }

        if (!no_zero)
            break;
    }
    endPointJ = j

    //идём вниз
    for (;i<rowEnd;++i){
        let no_zero = true
        for(let k = column;k<endPointJ;++k){
            if (image[i][k]===0){
                no_zero = false
                break
            }
        }

        if (!no_zero)
            break;
    }
    endPointI = i

    //идём влево
    for (j=column-1;j>=columnStart;--j){
        let no_zero = true
        for(let k = row;k<endPointI;++k){
            if (image[k][j]===0){
                no_zero = false
                break
            }
        }

        if (!no_zero)
            break;

        // обновляем в цикле, так как этот индекс включительный при закрасе
        column = j
    }


    //вверх идти не нужно

    //выполняем закрас получившегося прямоугольника
    for (let i = row;i<endPointI;++i)
        for (let j=column;j<endPointJ;++j)
            image[i][j]+=1
}

export default (image, sector) => {
    const [rowStart, columnStart, rowEnd, columnEnd] = sector;
    let total = 0;
    for (let i = rowStart; i < rowEnd; ++i) {
        for (let j = columnStart; j < columnEnd; ++j) {
            // проверяем, что за границей нашего сектора слева нет чёрных точек, если есть нашу фигуру закрасит другой агент, поэтому переходим к следующему пикселю
            if (i && (image[i - 1][j] === 1))
                continue
            // проверяем, что за границей нашего сектора сверху нет чёрных точек,
            if (j && (image[i][j - 1] === 1))
                continue
            if (image[i][j] === 1) {
                paint(image, sector, [i, j])
                // console.log(image)
                total += 1
            }
        }
    }
    return total;
}