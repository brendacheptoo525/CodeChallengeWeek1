// prompt-sync module to get input from the user
const prompt = require("prompt-sync")({ sigint: true });

// Prompting the user to input basic salary and benefits
const basicSalary = parseInt(prompt("Enter the basic salary: "));
const benefits = parseInt(prompt("Enter the benefits: "));

// Function to calculate the tax
function calculateTax(income) {
    // Tax rates
    const taxRates = [
        { limit: 24000, rate: 0.1 },
        { limit: 32333, rate: 0.25 },
        { limit: 500000, rate: 0.3 },
        { limit: 800000, rate: 0.0325 },
        { limit: Infinity, rate: 0.35 }
    ];

    let tax = 0;
    let remainingIncome = income;

    // Iterating over each tax rate
    for (const rate of taxRates) {
        if (remainingIncome <= 0) break;
        
        // Calculating taxable amount
        const taxableAmount = Math.min(remainingIncome, rate.limit);
        tax += taxableAmount * rate.rate;
        
        // Updating remaining income
        remainingIncome -= taxableAmount;
    }

    return tax;
}

// Function to calculate NHIF deductions
function calculateNHIFDeductions(grossPay) {
    // NHIF rates
    const NHIFRates = [
      { limit: 5999, deductions: 150 },
      { limit: 7999, deductions: 300 },
      { limit: 11999, deductions: 400 },
      { limit: 14999, deductions: 500 },
      { limit: 19999, deductions: 600 },
      { limit: 24999, deductions: 750 },
      { limit: 29999, deductions: 850 },
      { limit: 34999, deductions: 900 },
      { limit: 39999, deductions: 950 },
      { limit: 44999, deductions: 1000 },
      { limit: 49999, deductions: 1100 },
      { limit: 59999, deductions: 1200 },
      { limit: 69999, deductions: 1300 },
      { limit: 79999, deductions: 1400 },
      { limit: 89999, deductions: 1500 },
      { limit: 99999, deductions: 1600 },
  
      
    ];
    if (grossPay>=100000){
      return 1700;
    }

    for (const rate of NHIFRates) {
        if (grossPay <= rate.limit) {
            return rate.deductions;
        }
    }

    // Return deductions for incomes above the highest limit
    return NHIFRates[NHIFRates.length - 1].deductions;
}

// Function to calculate NSSF contributions
function calculateNSSFContributions(pensionablePay) {
    const tier1Rate = 0.06;
    const tier11LowerLimit = 7001; 
    
    if (pensionablePay <= tier11LowerLimit) {
        return pensionablePay * tier1Rate;
    } else {
        return tier11LowerLimit * tier1Rate;
    }
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits;
    const tax = calculateTax(grossSalary);
    const NHIFDeductions = calculateNHIFDeductions(grossSalary);
    const NSSFContributions = calculateNSSFContributions(basicSalary);
    const netSalary = grossSalary - tax - NHIFDeductions - NSSFContributions;
    
    // Return salary details
    return {
        grossSalary,
        tax,
        NHIFDeductions,
        NSSFContributions,
        netSalary,
    };
}

// Calculate net salary
const result = calculateNetSalary(basicSalary, benefits);

// Display calculated salary details
console.log("Gross Salary:", result.grossSalary);
console.log("Tax:", result.tax);
console.log("NHIF Deductions:", result.NHIFDeductions);
console.log("NSSF Contributions:", result.NSSFContributions);
console.log("Net Salary:", result.netSalary);
