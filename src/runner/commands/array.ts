import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the array command, this command will create an array to the variable.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const array = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
    if (!parameters[parameters.length - 1].includes("$ARR")) {
      new CompilerError(
        `${parameters[parameters.length - 1]} is not an array data type!`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }

    let returnValue: Array<string> = [];

    for (let i = 0; i < parameters.length - 2; i++) {
      returnValue.push(parameters[i]);
    }

    runtimeInfo.stack
      .getVariable(parameters[parameters.length - 1])
      .modify(JSON.stringify(returnValue));
  } else {
    new CompilerError(
      `${
        parameters[parameters.length - 1]
      } is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default array;
