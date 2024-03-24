//prompt-sync module to get input from the user
const prompt = require("prompt-sync")({ sigint: true });
// the user inputs the score
const score= prompt("Enter the grade:");
function calculatorgrade() {

  
  if (score >= 0 && score <= 100) { // Check if the score is within the valid range
    if (score >= 80) {
    //calculation of the grade based on the score
      return 'A'; // Return 'A' if the score is 80 or higher
    } else if (score >= 60 && score <= 79) {
      return 'B'; // Return 'B' if the score is between 60 and 79 
    } else if (score >= 50 && score <= 59) {
      return 'C'; // Return 'C' if the score is between 50 and 59
    } else if (score >= 40 && score <= 49) {
      return 'D'; // Return 'D' if the score is between 40 and 49 
    } else {
      return 'E'; // Return 'E' if the score is below 40
    }
  } else {
    return 'Invalid score. Score should be between 0 and 100.'; // Return an error message if the score is outside the valid range
  }
}
// call the function calculatorgrade to get the grade
let grade = calculatorgrade(); 

//output the grade
console.log("Grade: " + grade);