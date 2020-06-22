// import IMask from 'imask';
// import crc32 from 'crc32';

let phoneMask = IMask(document.getElementById('phone'), {
  mask: '+{7} (000) 000-00-00'
});
let input = document.querySelector('#phone');

input.addEventListener('input', mainFunction);

function mainFunction() {
  let numbers = getPhoneNumbers(phoneMask);
  let hash = getCRC32(numbers);
  getSum(numbers)
}

// Возвращает массив чисел без первого элемента (7)
/**
 *
 * @param inputValue
 * @returns {Array}
 */

/*
function getPhoneNumbers(inputValue) {
  let unmaskedValue = inputValue.unmaskedValue;
  let arrayOfStrings = unmaskedValue.split('');
  let arrayOfInt = [];


  function res() {
    arrayOfStrings.forEach(number => {
      arrayOfInt.push(parseInt(number))
    });
    return arrayOfInt;
  }

  res();

  return arrayOfInt;
}
 */

function getPhoneNumbers(inputValue) {
  let unmaskedValue = inputValue.unmaskedValue;
  let outputArray = unmaskedValue.split('');
  outputArray.shift();
  return outputArray
}

// Возвращает CRC32 (контрольную сумму) чисел массива
function getCRC32(inputArray) {
  return inputArray.map(number => crc32(number));
}

// Возвращает сумму чисел массива
function getSum(inputArray) {
  let intNumbers = inputArray.map(number => parseInt(number));
  return intNumbers.reduce((accumulator, currentValue) => accumulator + currentValue);
}