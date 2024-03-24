//prompt-sync module to get input from the user
const prompt = require("prompt-sync")({ sigint: true });

//Prompt the user to enter the speed
const speed = parseInt(prompt('Enter speed:'));

// Function to check the speed
function speedcheck(speed) {

    const speedlimit = 70; // Speed limit in km/h
    const kmperdemerit = 5; // Number of km per demerit point
    const maxdemeritpoints = 12; // Maximum demerit points allowed

    if (speed <= speedlimit) {

        return "OK"; // Speed is within the limit
    }
     else {
        // calculate the demerit points
        const demeritpoints = Math.floor((speed - speedlimit) / kmperdemerit);
        //cheking if the demerit points exceed the maximum
        if (demeritpoints > maxdemeritpoints) {
            return "License suspended"; // License suspended if exceeding maximum demerit points
        }
         else {
            return "Points: " + demeritpoints; // Return the number of demerit points
        }
    }
}

 // Output the result of the speed check
console.log(speedcheck(speed));