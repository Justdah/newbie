let display;
let previous = null;
let operator = null;
let operatorClicked = false;
let isFoot = false;
let isInch = false;
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
     
    }
    else if(val === '"'){
      isInch = true;
    }
    
    display.value == 0 ? display.value = val : display.value += val;
  }

}

/**
 * Resets the display value.
 */
function clear() {
  display.value = 0;
}
function feetToInchDecimal(display){
  if(isFoot || isInch){
    let feet = display;
    let inches = 0;
    let footToInch = 0;
    const feetIndex = feet.indexOf("'");
    const inchIndex = feet.indexOf('"');
    if(feetIndex != -1){
    footToInch = feet.substring(0,feetIndex) * 12;
    }
    if(inchIndex !=-1){
     inches = feet.substring(feetIndex+1,feet.length-1);
    }
     display = ((+inches) + (+footToInch)).toString();
     return display;
  }
  else{
    return display;
  }

}
function InchDecimalToFeet(results){
  if(isFoot || isInch){
    let measurement = results;
    let fullMeasure;
    let feet = (measurement/12).toString();
    let decimalIndex = feet.indexOf(".");
    if(decimalIndex > -1){
    
    let inch = feet.substring(decimalIndex);
    inch = Math.round((inch * 12)).toString();
    fullMeasure = feet.substring(0,decimalIndex) + "'" + inch + '"';
    }
    else{
      fullMeasure = feet + "'";
    }
    return fullMeasure;
  }
  else{
    return results;
  }
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

});

