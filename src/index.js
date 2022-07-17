#!/usr/bin/env/node
var inquirer = require("inquirer");
var signup = require("./signup.js");

console.log("Welcome to the Chill&chat server interface!\n");
console.log("Please select an option below to continue:");
console.log("1. Parse script\n2. Signup\n3. Exit\n");

inquirer
  .prompt([
    {
      name: "option",
      message: "Please select an option:",
      type: "input",
    },
  ])
  .then(function (answer) {
    switch(answer.option){
      case "1":
        console.log("Parse script selected");
        break;

      case "2":
        console.log("Signup selected");
        break;

      case "3":
        console.log("Exit selected, terminating.");
        process.exit(0);
        break;
  
      default:
        console.log("Invalid option selected, terminating.");
        process.exit(1);
        break;
    }
  });
