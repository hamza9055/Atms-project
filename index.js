#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue("Enter any username and any pin"));
const userInput = await inquirer.prompt([
    {
        name: "userID",
        type: "string",
        message: "Please provide your User ID",
    },
    {
        name: "pinCode",
        type: "number",
        message: "Enter your Pin Code",
        when(answers) {
            return chalk.blue(answers.userID);
        },
    },
]);
const newUser = {
    userID: userInput.userID,
    pinCode: userInput.pinCode,
};
let balanceAmount = Math.floor(Math.random() * 1000000);
async function doTransaction() {
    console.clear();
    console.log(chalk.bgBlue(`Welcome to Bank ${newUser.userID}\n`));
    const newTransaction = await inquirer.prompt([
        {
            name: "transactionOption",
            type: "list",
            message: "Choose Option Given blow : \n",
            choices: ["Balance Inquiry", "Fast Cash", "Withdrawl"],
        },
        {
            name: "fastCash",
            type: "list",
            message: "Choose the amount given blow : \n",
            choices: [5000, 10000, 15000, 20000, 25000],
            when(answers) {
                return answers.transactionOption == "Fast Cash";
            },
        },
        {
            name: "withdrawlCash",
            type: "number",
            message: "Enter your Amount for withdrawl : ",
            when(answers) {
                return answers.transactionOption == "Withdrawl";
            },
        },
    ]);
    newTransaction.date = new Date();
    switch (newTransaction.transactionOption) {
        case "Balance Inquiry":
            console.log(chalk.greenBright(`\nYour Current Balance is ${balanceAmount} PKR. 
        \nDated : ${newTransaction.date}\n`));
            break;
        case "Fast Cash":
            if (newTransaction.fastCash <= balanceAmount) {
                balanceAmount = balanceAmount - newTransaction.fastCash;
                console.log(chalk.greenBright(`
            \nTransaction of ${newTransaction.fastCash} PKR is Successfull!
            \nYour Current Balance is ${balanceAmount} PKR. 
            \nDated : ${newTransaction.date}\n`));
            }
            else {
                console.log(chalk.redBright(`You requested insufficient Balance`));
            }
            break;
        case "Withdrawl":
            if (newTransaction.withdrawlCash <= balanceAmount) {
                balanceAmount = balanceAmount - newTransaction.withdrawlCash;
                console.log(chalk.greenBright(`
            \nTransaction of ${newTransaction.withdrawlCash} PKR is Successfull!
            \nYour Current Balance is ${balanceAmount} PKR. 
            \nDated : ${newTransaction.date}\n`));
            }
            else {
                console.log(chalk.redBright(`You requested insufficient Balance`));
            }
            break;
        default:
            console.log(chalk.redBright(`Something went wrong`));
            break;
    }
}
async function runAgain() {
    do {
        await doTransaction();
        var again = await inquirer.prompt([
            {
                type: "input",
                name: "restart",
                message: "Do you want to continue to new Transaction? Press y or Y",
            },
        ]);
    } while (again.restart == "y" || again.restart == "Y");
}
await runAgain();
