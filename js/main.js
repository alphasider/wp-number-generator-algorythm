// import IMask from 'imask';
// import crc32 from 'crc32';

let phoneMask = IMask(document.getElementById('phone'), {
  mask: '+{7} (000) 000-00-00'
});
let input = document.querySelector('#phone');

input.addEventListener('input', mainFunction);

function mainFunction() {
  let numbers = getPhoneNumbers(phoneMask); // Массив чисел (тип: string)
  let intNumbers = stringToInt(numbers);
  let sumOfNumber = getSum(intNumbers); // Сумма чисел массива

  let some = generateArrayOfElements(intNumbers);

  let arrs = makeMultidimensionalArray(intNumbers, 20, 1);
  let crc8Array = getCRC8(arrs);

  console.info('intNumbers: ', intNumbers);
  console.info('numbers: ', numbers);
  console.info('arrs: ', arrs);
  console.info('crc8Arr: ', crc8Array);
  // let hash = getCRC32(some); // Массив контрольных сумм
  // console.warn(some)
}

// Возвращает массив чисел без первого элемента (7)
function getPhoneNumbers(inputValue) {
  let unmaskedValue = inputValue.unmaskedValue;
  let outputArray = unmaskedValue.split('');
  outputArray.shift();
  return outputArray
}

// Возврает массив целых чисел
function stringToInt(inputArray) {
  return inputArray.map(number => parseInt(number));
}

// Возвращает сумму чисел массива
function getSum(inputArray) {
  return inputArray.reduce((accumulator, currentValue) => accumulator + currentValue);
}

function generateArrayOfElements(inputArray) {
  const PHI = Math.round(1.618); // Потоянная Фи (золотое сечение)
  let outputArray = [];
  let sum = getSum(inputArray);

  for (let i = 0; i < inputArray.length; i++) {
    let cachedIndex = i; // Кеширование индекса для продолжения цикла
    if (i === 0) i = PHI; // Замена нулевых значений (индекса) для удобного вычисления

    let calculatedValue = Math.round((sum / i) * inputArray[i]); // Вычесление первых 10 чисел массива
    outputArray.push(calculatedValue);

    i = cachedIndex; // Возвращение шага итерации
  }

  for (let i = 0; i < inputArray.length; i++) {
    let cachedIndex = i; // Кеширование индекса для продолжения цикла
    if (i === 0) i = PHI; // Замена нулевых значений (индекса) для удобного вычисления

    let calculatedValue = Math.round(sum * (inputArray[i] + i)); // Вычесление 11-20 чисел массива
    outputArray.push(calculatedValue);

    i = cachedIndex; // Возвращение шага итерации
  }
  return outputArray;
}

// Возвращает многомерный массив (массив с 20-ю вложенными массивами с одним элементом)
function makeMultidimensionalArray(inputArray, arraysCount = 20, arrayLength = 1) {
  return [...Array(arraysCount)]
    .map((item, index) => {
      return Array(arrayLength).fill(inputArray[index])
    })
}

function getCRC8(inputArray) {
  let crc8 = new CRC8();

  // console.info(inputArray);
  return inputArray
    .map(number => {
      // console.info(number);
      return crc8.checksum(number);
    });
}

