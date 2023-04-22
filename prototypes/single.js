function paint(image, sector) {
    const [rowStart, columnStart, rowEnd, columnEnd] = sector;
    // идём максимально вправо
    let j = columnStart
    for (; j < columnEnd; ++j) {
        if (image[rowStart][j] > 0)
            image[rowStart][j] += 1
        else {
            // ++j
            break
        }
    }
    // идём максимально вниз
    for (let i = rowStart + 1; i < rowEnd; ++i) {
        // если все элементы в строке i по индексам от columnStart до j > 0
        if (image[i].slice(columnStart, j).every((value) => value > 0))
            //     закрашиваем строку
            for (let k = columnStart; k < j; ++k) {
                image[i][k] += 1
            }
        else {
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
                paint(image, [i, j, rowEnd, columnEnd])
                // console.log(image)
                total += 1
            }
        }
    }
    return total;
}