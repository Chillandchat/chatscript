#!/usr/bin/env/node
var inquirer = require("inquirer");
var signup = require("./signup.js");

var username;
var password;
var confirmPassword;

console.log("Welcome to the Chill&chat command line interface.\n");
console.log("Please enter details below to register a bot.\n");

async function askInput() {
  await inquirer
    .prompt({
      type: "input",
      name: "username",
      message: "Please enter username:",
    })
    .then(function (data) {
      username = data.username;
    });

  await inquirer
    .prompt({
      type: "password",
      name: "password",
      message: "Please enter your password:",
    })
    .then(function (data) {
      password = data.password;
    });

  await inquirer
    .prompt({
      type: "password",
      name: "confirmPassword",
      message: "Please confirm your password:",
    })
    .then(function (data) {
      confirmPassword = data.confirmPassword;
    });
}

askInput();
if (password === confirmPassword) {
  signup(username, password).then(function (data) {
    console.log("Successfully created bot.\n");
    console.log("Bot ID: " + data + "\n");
  });
}
