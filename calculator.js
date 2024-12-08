let display;
let previous = null;
let operator = null;
let operatorClicked = false;
let isFoot = false;
let isInch = false;
let isFraction = false;
let isFracted = false;
/**
 * Calculates the operation and updates the display.
 */
function performOperation() {
  let result;
  display.value =  feetToInchDecimal(display.value);
  const current = parseNumber(display.value);
  previous = parseNumber(previous);

  switch(operator) {
    case '+' :
      result = previous + current;
    break;
    case '-' :
        result = previous - current;
    break;
    case '*' :
        result = previous * current;
    break;
    case '/' :
        result = previous / current;
    break;
  }

  display.value = InchDecimalToFeet(result);
  operator = null;
}

/**
 * Parses the display value into a number (float or int).
 * @param {String} num 
 */
function parseNumber(num) {
  return num.includes('.') ? parseFloat(num) : parseInt(num);
}

/**
 * Capture the previous value and the clicked operator
 * so that an operation can be performed.
 */
function clickOperator(event) {
  operator = event.target.value;
  previous = feetToInchDecimal(display.value);
  addMeasurementListeners();
  operatorClicked = true;
}

/**
 * Captures a number click and updates the display value.
 * @param {Event} event 
 */
function clickNumber(event) {
  const val = event.target.value;

  if( operatorClicked ) {
    display.value = val;
    operatorClicked = false;
  } 
  else {
    if(val === "'" && !isInch){
      isFoot = true;
      const foot = document.querySelector('.foot');
      foot.removeEventListener('click', clickNumber);
    }
    else if(val === '"'){
      const inch = document.querySelector('.inch');
      inch.removeEventListener('click', clickNumber);
      isInch = true;
    }
    else if(val === '-'){
      isFraction = true;
      const fraction = document.querySelector('.fraction');
      fraction.removeEventListener('click', clickNumber);
    }
    else if(val === '/'){
      isFracted = true;
      const divide = document.querySelector('.divide');
      divide.removeEventListener('click', clickNumber);
    }
    display.value == 0 ? display.value = val : display.value += val;
  }

}

/**
 * Resets the display value.
 */
function clear() {
  display.value = 0;
  addMeasurementListeners();
}
function feetToInchDecimal(display){
  if(isFoot || isInch){
    let inches = 0;
    let footToInch = 0;
    let fraction = 0;
    const feetIndex = display.indexOf("'");
    const inchIndex = display.indexOf('"');
    const numeratorIndex = display.indexOf('-');
    const denominatorIndex = display.indexOf('/');
    if(feetIndex != -1){
     footToInch = display.substring(0,feetIndex) * 12;
    }
    if(inchIndex !=-1){

      
      
        if(numeratorIndex !=-1){
          const numerator = parseInt(display.substring(numeratorIndex+1,denominatorIndex));
          const denominator = parseInt(display.substring(denominatorIndex+1));
           fraction = (numerator/denominator);
           if(feetIndex !== numeratorIndex-1){
           inches = parseInt(display.substring(feetIndex+1,numeratorIndex));
           }
           inches = inches + fraction;
        }
        else{
          inches = display.substring(feetIndex+1,inchIndex);
        }
      
    }
    display = ((+inches) + (+footToInch));
  
    return display.toFixed(3);
  }
  else{
    return display;
  }

}


function InchDecimalToFeet(results){
  if(isFoot || isInch){
    let feet = 0;
    let inchesDecimal = 0;
    let fraction = 0;
    if(operator ==="*"){
      results = results/12;
    }
    if(results > 12){
      feet = Math.floor(results / 12);
      const inchesInFeet = findDecimal((results/12).toString());
      inchesDecimal = (inchesInFeet*12).toString();
    }
    else{
      inchesDecimal = results;
    }
    if(!Number.isInteger(inchesDecimal)){
    const fractionDecimal = findDecimal(inchesDecimal.toString());
    
      if(fractionDecimal > .998 || fractionDecimal <.005){
        inches = Math.round(inchesDecimal);
      }
      else{
        let numerator = Math.round(fractionDecimal * 32);
        let denominator = 32;
        divisor = gcd(numerator, denominator);
        fraction = `${numerator/divisor.toString()}/${denominator/divisor}`;
        inches = Math.floor(inchesDecimal);
      }
    }
    else{

      inches = results;
    }
    addMeasurementListeners();
    if(fraction == 0 && inches == 0){
      return `${feet}'`;
    }
    else if(feet === 0 && inches === 0){
      return `${fraction}"`
    }
    else if(feet === 0){
      return `${inches}-${fraction}"`
    }
    else{
      return `${feet}'${inches}-${fraction}"`;
    }
  }
  
  return results;
  
}
function findDecimal(number){
  const decimalIndex = number.indexOf('.');
  if(decimalIndex === -1){
    return "0";
  }
  else{
    return number.substring(decimalIndex);
  }
}
function gcd(numerator, denominator){
  let remainder;
  remainder = denominator % numerator;
  while (remainder != 0){
    denominator = numerator;
    numerator = remainder;
    remainder = denominator % numerator;
  }
  return numerator;
}

function addMeasurementListeners(){
  isFoot = false;
  isInch = false;
  isFraction = false;
  isFracted = false;
const foot = document.querySelector('.foot');
foot.addEventListener('click', clickNumber); 

const inch = document.querySelector('.inch');  
inch.addEventListener('click', clickNumber); 

const fractionEvent = document.querySelector('.fraction');
fractionEvent.addEventListener('click', clickNumber);

const fractIt = document.querySelector(".divide");
fractIt.addEventListener('click', clickNumber);
}

// add event listener for when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  display = document.getElementById('display');
  // set the variable called display declared at the top of this file equal to the display element
  // HINT: use its id #display to get a reference to it
  const nums = document.querySelectorAll('.number');
  for(const num of nums){
    num.addEventListener('click', clickNumber);
  }
  // get a reference to all of the numbers
  // loop over each of the numbers
  // add a click event listener to each number to call the function clickNumber
  const decimalPoint = document.querySelector('.decimal');
  decimalPoint.addEventListener('click', clickNumber); 
  
  const foot = document.querySelector('.foot');
  foot.addEventListener('click', clickNumber); 
  
  const inch = document.querySelector('.inch');  
  inch.addEventListener('click', clickNumber); 

  const fraction = document.querySelector('.fraction');
  fraction.addEventListener('click', clickNumber);

  const fractIt = document.querySelector(".divide");
  fractIt.addEventListener('click', clickNumber);
  // get a reference to the decimal point button
  // add a click event listener to call the function clickNumber
  // the decimal point is part of the number so you can call clickNumber for it 
  // as you would for a number
  const clearButton = document.querySelector('.all-clear');
  clearButton.addEventListener('click', clear);
  // get a reference to the all clear button
  // add a click event listener to call the function clear  
  const operators = document.querySelectorAll('.operator');
  for(const operator of operators){
    operator.addEventListener('click', clickOperator);
  }
  // get a reference to all of the operators;
  // loop over each of the operators
  // add a click event listener to each operator to call the function clickOperator
  const equal = document.querySelector('.equal-sign');
  equal.addEventListener('click', performOperation);
  // add click event listener for the equal sign
  // should call the function performOperation
  const triangle = document.querySelector('.triangulate');
  triangle.addEventListener('click', function() {
    isFoot=true;
    side1 = document.getElementById('sideA').value;
    side2 = document.getElementById('sideB').value;
    sideX = feetToInchDecimal(side1) ** 2;
    sideY = feetToInchDecimal(side2) ** 2;
    hypotenuse = Math.sqrt(sideX + sideY);
    sideC = InchDecimalToFeet(Math.sqrt(sideX + sideY));
    const side3 = document.getElementById('sideC');
    side3.innerText = sideC;
    isFoot=false;
  });
  
  const octagon = document.querySelector('.octagon');
  octagon.addEventListener('click', function() {
    isFoot = true;
    side = document.getElementById('sideOfSquare').value;
    sideY = feetToInchDecimal(side) * 0.414;
    convertedSide = InchDecimalToFeet(sideY);
    const results = document.getElementById('sideY');
    results.innerText = convertedSide;
  })
});

