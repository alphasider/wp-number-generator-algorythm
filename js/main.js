// import IMask from 'imask';
// import crc32 from 'crc32';

let phoneMask = IMask(document.getElementById('phone'), {
  mask: '+{7} (000) 000-00-00'
});
let input = document.querySelector('#phone');

input.addEventListener('input', mainFunction);

function mainFunction() {
  getPhoneNumbers(phoneMask);
}


// Возвращает массив
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
  console.log(typeof arrayOfInt[0], arrayOfInt);
  // console.log(Array.isArray(arrayOfStrings), ' - ', arrayOfStrings)
}
