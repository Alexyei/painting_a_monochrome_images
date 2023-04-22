function paint(image, sector, startPoint) {
    const [rowStart, columnStart, rowEnd, columnEnd] = sector;
    const [row, column] = startPoint
    // идём максимально вправо
    let j = column
    for (; j < columnEnd; ++j) {
        if (image[row][j] > 0)
            image[row][j] += 1
        else {
            // ++j
            break
        }
    }
    // идём максимально вниз
    let i = row + 1;
    for (; i < rowEnd; ++i) {
        // если все элементы в строке i по индексам от columnStart до j > 0
        if (image[i].slice(column, j).every((value) => value > 0))
            //     закрашиваем строку
            for (let k = column; k < j; ++k) {
                image[i][k] += 1
            }
        else {
            break
        }
    }
    // пробуем дозакрасить столбцы слева от изначальной точки
    for (let k = column-1; k >= columnStart; --k) {
        let no_zero = true
        for (let n = row; n < i; ++n) {
            if (image[n][k] === 0) {
                no_zero = false;
                break;
            }
        }
        // закрашиваем столбец
        if (no_zero) {
            for (let n = row; n < i; ++n) {
                image[n][k] += 1
            }
        } else {
            break
        }
    }
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