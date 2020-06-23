/**
 * Алгоритм для вычисления и вывода чисел на основе номера телефона
 * Использует:
 * 1. Алгоритм хеширования crc8. Источник: https://github.com/mode80/crc8js
 * 2. Маску для инпута. Источник: https://github.com/uNmAnNeR/imaskjs
 * @type {Element}
 */

/**
 * Поле ввода чисел
 * @type {Element}
 */
let input = document.querySelector('#phone');
/**
 * Маска для инпута
 * @type {InputMask}
 */
let phoneMask = IMask(input, {
  mask: '+{7} (000) 000-00-00',
  lazy: false // Placeholder включен
});
/**
 * Перехват изменений в поле ввода
 */
input.addEventListener('input', mainFunction);

/**
 * Форма ввода
 * @type {Element}
 */
let form = document.querySelector('#form');
/**
 * Отключение отправки формы
 */
form.addEventListener('submit', (e) => e.preventDefault());

/**
 * Блок вывода выходных данных
 * @type {Element}
 */
let output = document.querySelector('#log');

/**
 * Точка запуска
 */
function mainFunction() {
  let numbers = getPhoneNumbers(phoneMask); // Массив чисел (тип: string)
  let intNumbers = stringToInt(numbers); // Преобразование чисел типа string в integer
  let sumOfNumber = getSum(intNumbers); // Сумма чисел массива
  let bigArray = makeArrayOfElements(intNumbers, sumOfNumber); // Создание большого массива
  let multiDimensionalArray = makeMultidimensionalArray(bigArray, 20, 1); // Создание многомерного массива для вычесления хеш суммы
  let crc8Array = getCRC8(multiDimensionalArray); // Вычисление котрольной суммы (crc8) массива
  let output = makeArrayValuesDifferent(crc8Array, sumOfNumber); // Деформирования выходных чисел

  addOutputValues(output); // Вывод результата в целевой блок
}

/**
 * Возвращает массив чисел без первого элемента (7)
 * @param inputValue
 * @returns {string[]}
 */
function getPhoneNumbers(inputValue) {
  let unmaskedValue = inputValue.unmaskedValue;
  let outputArray = unmaskedValue.split('');
  outputArray.shift();
  return outputArray;
}

/**
 * Возврает массив целых чисел
 * @param inputArray
 * @returns {*}
 */
function stringToInt(inputArray) {
  return inputArray.map(number => parseInt(number));
}

/**
 * Возвращает сумму чисел массива
 * @param inputArray
 * @returns {*}
 */
function getSum(inputArray) {
  return inputArray.reduce((accumulator, currentValue) => accumulator + currentValue);
}

/**
 * Создает массив определенной длины: исходный размер входного массива * 2
 * @param inputArray
 * @param sum
 * @returns {Array}
 */
function makeArrayOfElements(inputArray, sum) {
  const PHI = Math.round(1.618); // Потоянная Фи (золотое сечение) //TODO: explain why the round method is needed
  let outputArray = [];
  // let sum = getSum(inputArray); //TODO: Delete me

  //FIXME: Refactor this and the following for loops
  for (let i = 0; i < inputArray.length; i++) {
    let cachedIndex = i; // Кеширование индекса для продолжения цикла
    if (i === 0) i = PHI; // Замена нулевых значений (индекса) для удобного вычисления

    let calculatedValue = Math.round((sum / i) * inputArray[i]); // Вычесление первых 10 чисел массива
    outputArray.push(calculatedValue);

    i = cachedIndex; // Возвращение шага итерации
  }

  //FIXME: Refactor this and previous for loops
  for (let i = 0; i < inputArray.length; i++) {
    let cachedIndex = i; // Кеширование индекса для продолжения цикла
    if (i === 0) i = PHI; // Замена нулевых значений (индекса) для удобного вычисления

    let calculatedValue = Math.round(sum * (inputArray[i] + i)); // Вычесление 11-20 чисел массива
    outputArray.push(calculatedValue);

    i = cachedIndex; // Возвращение шага итерации
  }

  return outputArray;
}

/**
 * Возвращает многомерный массив (массив с 20-ю вложенными массивами с одним элементом)
 * @param inputArray
 * @param arraysCount
 * @param arrayLength
 * @returns {any[][]}
 */
function makeMultidimensionalArray(inputArray, arraysCount = 20, arrayLength = 1) {
  return [...Array(arraysCount)]
    .map((item, index) => {
      return Array(arrayLength).fill(inputArray[index])
    })
}

/**
 * Вычисляет и возвращает контрольную сумму crc8 (массив)
 * @param inputArray
 * @returns {*}
 */
function getCRC8(inputArray) {
  let crc8 = new CRC8();

  // console.info(inputArray);
  return inputArray
    .map(number => {
      // console.info(number);
      return crc8.checksum(number);
    });
}

/**
 * Служит для достижения разнообразий в числах
 * @param inputArray
 * @param sum
 * @returns {*}
 */
function makeArrayValuesDifferent(inputArray, sum) {
  return inputArray.map(number => {
    if (number % 3 === 0) {
      number *= sum;
    } else if (number % 2 === 0) {
      number *= (number + sum);
    }
    return number;
  })
}

/**
 * Вставляет сгенерированные числа в нужное место
 * @param inputArray
 */
function addOutputValues(inputArray) {
  output.innerHTML = `<div>${inputArray.join(' &nbsp; ')}</div>`;
}