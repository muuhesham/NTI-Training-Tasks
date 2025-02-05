function button(a) {
  document.getElementById("ans").value += a;
}

// function che() {
//   const value = document.getElementById("ans").value;
//   let res;
//   const operators = ["+", "-", "*", "/"];

//   for (let i = 0; i < operators.length; i++) {
//     if (value.includes(operators[i])) {
//       res = value.split(operators[i]);
//       switch (operators[i]) {
//         case "+":
//           return parseInt(res[0]) + parseInt(res[1]);
//         case "-":
//           return parseInt(res[0]) - parseInt(res[1]);
//         case "/":
//           if (res[1] == 0) {
//             return "Cannot divide by zero";
//           }
//           return parseInt(res[0]) / parseInt(res[1]);
//         case "*":
//           return parseInt(res[0]) * parseInt(res[1]);
//       }
//     }
//   }
//   return null;
// }

function che() {
  const value = document.getElementById("ans").value;


  const numbers = value.split(/[\+\-\*\/]/).map(Number); 
  const operators = value.match(/[\+\-\*\/]/g); 

  if (!numbers || !operators) return "Invalid Expression";

  for (let i = 0; i < operators.length; i++) {
    switch (operators[i]) {
      case "*":
        numbers.splice(i, 2, numbers[i] * numbers[i + 1]);
        operators.splice(i, 1);
        i--; 
        break;
      case "/":
        if (numbers[i + 1] === 0) {
          return "Cannot divide by zero";
        }
        numbers.splice(i, 2, numbers[i] / numbers[i + 1]);
        operators.splice(i, 1);
        i--; 
        break;
    }
  }

  
  for (let i = 0; i < operators.length; i++) {
    switch (operators[i]) {
      case "+":
        numbers.splice(i, 2, numbers[i] + numbers[i + 1]);
        operators.splice(i, 1);
        i--; 
        break;
      case "-":
        numbers.splice(i, 2, numbers[i] - numbers[i + 1]);
        operators.splice(i, 1);
        i--; 
        break;
    }
  }


  return numbers[0];
}

function button1() {
  var a = che();
  document.getElementById("ans").value = a;
}

function buttonclear() {
  document.getElementById("ans").value = "";
}



