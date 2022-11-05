import inquirer from "inquirer";

import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the prompt command, this command will prompt the user for input, and return the inputted value in the variable.
 *
 * @note You can specify 'password' in the second argument for a password input or 'input' for a regular input.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const prompt = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[2])) {
    inquirer
      .prompt({
        type:
          parameters[1] === "password" || parameters[1] === "input"
            ? parameters[1]
            : new CompilerError(
                `${parameters[1]} is NOT a valid option, valid options are: "input" or "password"!`,
                runtimeInfo.file,
                runtimeInfo.line.toString(),
                "error"
              ),
        name: "answer",
        message: parameters[0],
      })
      .then((answer: any): void => {
        runtimeInfo.stack.getVariable(parameters[2]).modify(answer.answer);
      });
  } else {
    new CompilerError(
      `${parameters[2]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default prompt;
