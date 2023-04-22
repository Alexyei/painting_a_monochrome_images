## Прямоугольное сжатие изображения.
Дано монохромное изображение: матрица NxM,
содержащее только нули и единицы. Определить, можно ли покрыть все единичные
элементы изображения не более чем K прямоугольниками.

## Описание проекта
Проект читает изображения из файла .xlsx или из папки images/monochrome. Далее для каждого файла изображения или для каждого листа excel строится двумерный массив состоящий только из единиц и нулей. Далее каждый массив разбивается на сектора, и для каждого сектора находится количество прямоугольников, необходимое, чтобы покрыть все единичные элементы. Обработка секторов и каждого массива происходит асинхронно.

## Как происходит деление изображения на сектора?
Разделение на сектора реализовано методом `getSectors(image, minCols = 5, minRows = 5)`. 
Сначала разбиение происходит по колонкам. Находятся две соседние колонки, которые не имеют общих чёрных клеток (например, все колонки шахматной доски подходят под это условие, или одна из колонок не содержит единиц).
Минимальное расстояние между двумя колонками-секторами равно `minСols`. 
Возьмём к примеру шахматную доску размером 8х8. Разбивающую вертикальную линию можно провести после любой из колонок. Однако, `minCols=5`, а это значит, что после разбиения минимальное количество колонок в каждой части должно быть равно 5. Таким образом нельзя произвести разбиение по колонкам. И поэтому будет один сектор-колонка, который включает всю доску.

Далее для каждой из найденных секторов колонок выполняется разбиение по строкам. Минимальной число строк после разбиения в каждой части равно `minRows`. Разбиение возможно только если у двух соседних строк нет соприкасающихся чёрных клеток.
Примеры разбиения на сектора можно посмотреть в файле sectors.xlsx, в нём красными линиями обозначены сектора.

## Как происходит подсчёт количество прямоугольников для каждого из секторов?
Каждый сектор проходится по спирали (по часовой стрелке), начиная от верхнего левого угла. Если находится ячейка содержащая единицу выполняется закрашивание прямоугольника в перпендикулярном направлении относительно текущей стороны спирали. Количество закрашенных прямоугольников суммируется и возвращается как результат.
Визуализацию данного процесса можно посмотреть в файле data/paint.xlsx

## Файлы проекта
Основной файл для запуска: main_threaded_sectors_images.js

Файлы данных:
- data/sectors.xlsx - тестовые примеры для проверки правильности разбиения на сектора
- data/spiral.xlsx - тестовый пример для проверки правильности обхода по спирали, название листа - это количество секторов на который разбивается массив
- data/test.xlsx - основные тестовые примеры, название листа - это количество прямоугольников необходимых для закрытия всех единичных областей
- data/paint.xlsx - визуализация процесса обхода сектора

Модули:
- load_data.js - выполняет чтение файлов .xlsx
- colors_to_monochrome.js - выполняет преобразование цветных картинок в монохромные. Поместите цветные каретники в папку images/colors, запустить данный скрипт, в папке images/monochrome появятся их монохромные копии.
- spiral.js - выполняет создание массива по спирали и его обход по спирали (по часовой стрелке).
- single_spiral.js - выполняет обход изображения по спирали и подсчитывает количество прямоугольников необходимых для его закрашивания, без использования worker-ов и без разбиения на сектора.
- threaded_spiral.js - выполняет обход изображения по спирали и подсчитывает количество прямоугольников необходимых для его закрашивания, с использованием worker-ов и без разбиения на сектора.
- threaded_spiral_sectors.js - выполняет обход изображения по спирали и подсчитывает количество прямоугольников необходимых для его закрашивания, с использованием worker-ов и с разбиением на сектора.

Скрипты:
- main.js - для test.xlsx используя single_spiral.js, выполняет подсчёт количества прямоугольников необходимых для закрашивания.
- main_threaded.js - для test.xlsx используя threaded_spiral.js, выполняет подсчёт количества прямоугольников необходимых для закрашивания.
- main_threaded_images.js - для монохромных изображений из папки images/monochrome используя threaded_spiral.js, выполняет подсчёт количества прямоугольников необходимых для закрашивания.
- main_threaded_sectors.js - для test.xlsx используя threaded_spiral_sectors.js, выполняет подсчёт количества прямоугольников необходимых для закрашивания.
- main_threaded_sectors_images.js - для монохромных изображений из папки images/monochrome используя threaded_spiral_sectors.js, выполняет подсчёт количества прямоугольников необходимых для закрашивания.