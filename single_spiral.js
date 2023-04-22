function paint(image, sector,point, direction){
    let [rowStart, colStart, rowEnd, colEnd] = sector;
    let [pointRowStart, pointColStart] = point
    let [pointRowEnd, pointColEnd] = [pointRowStart+1, pointColStart+1]

    switch (direction){
        case "down":
            // выполняем проход слева направо
            for (let j=pointColStart+1;j<colEnd;++j){
                if (image[pointRowStart][j]>0)
                    pointColEnd++
                else
                    break
            }

            // а затем сверху вниз
            for(let i=pointRowStart+1;i<rowEnd;++i){
                let no_zero = true;
                for(let j=pointColStart;j<pointColEnd;++j)
                {
                    if (image[i][j]===0){
                        no_zero = false
                        break
                    }
                }

                if (!no_zero) break;

                pointRowEnd++
            }

            break
        case "left":
            // выполняем проход сверху вниз
            for (let i = pointRowStart+1;i<rowEnd;++i){
                if (image[i][pointColStart]>0)
                    pointRowEnd++
                else
                    break
            }
            // а затем справа налево
            for (let j=pointColStart-1;j>=colStart;--j){
                let no_zero = true
                for (let i = pointRowStart;i<pointRowEnd;++i){
                    if (image[i][j]===0)
                    {
                        no_zero = false
                        break;
                    }
                }

                if (!no_zero) break;
                pointColStart--
            }
            break
        case "up":
            // выполняем проход справа налево
            for (let j=pointColStart-1;j>=colStart;--j){
                if (image[pointRowStart][j]>0)
                    pointColStart--
                else
                    break
            }

            // а затем снизу вверх
            for (let i=pointRowStart-1;i>=rowStart;--i){
                let no_zero = true
                for (let j=pointColStart;j<pointColEnd;++j){
                    if (image[i][j]===0){
                        no_zero = false
                        break
                    }
                }

                if (!no_zero) break;
                pointRowStart--
            }

            break
        case "right":
            // выполняем проход снизу вверх
            for (let i=pointRowStart-1;i>=rowStart;--i){
                if (image[i][pointColStart]>0)
                    pointRowStart--
                else
                    break
            }

            // а затем слева направо
            for(let j=pointColStart+1;j<colEnd;++j){
                let no_zero = true
                for (let i=pointRowStart;i<pointRowEnd;++i){
                    if (image[i][j]===0){
                        no_zero = false
                        break
                    }
                }

                if (!no_zero) break;
                pointColEnd++
            }
            break
    }

    //закрашиваем получившуюся область
    for (let i=pointRowStart;i<pointRowEnd;++i)
        for(let j=pointColStart;j<pointColEnd;++j)
            image[i][j]+=1
}


export default (image, sector) => {
    let [rowStart, colStart, rowEnd, colEnd] = sector;
    // у сектора конечные границы не включительные, но для прохода по спирали я сделаю их включительными
    rowEnd--
    colEnd--
    
    let total = 0;
    
    // идём по спирали по часовой стрелке
    while(rowStart <= rowEnd && colStart <= colEnd){
        // слева направо
        for (let j=colStart;j<=colEnd;++j){
            if (image[rowStart][j]===1){
                paint(image,sector,[rowStart,j],"down")
                total++
            }

            // console.log(image[rowStart][j])
        }
        rowStart++

        // сверху вниз
        for (let i=rowStart;i<=rowEnd;++i){
            if (image[i][colEnd]===1){
                paint(image,sector,[i,colEnd],"left")
                total++
            }
                // paint("left")
            // console.log(image[i][colEnd])
        }
        colEnd--

        // справа налево
        for (let j=colEnd;j>=colStart;--j){
            if (image[rowEnd][j]===1){
                paint(image,sector,[rowEnd,j],"up")
                total++
            }
            // console.log(image[rowEnd][j])
        }
        rowEnd--

        //снизу вверх
        for (let i=rowEnd;i>=rowStart;--i){
            if (image[i][colStart]===1){
                paint(image,sector,[i,colStart],"right")
                total++
            }
            // console.log(image[i][colStart])
        }
        colStart++

    }
    
    
    return total;
}