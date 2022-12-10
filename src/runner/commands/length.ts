import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the length command, this command will calculate the length of a string or array.
 * @note Functions and objects CANNOT be counted.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const length = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[1])) {
    if (!parameters[0].includes("$ARR")) {
      runtimeInfo.stack
        .getVariable(parameters[1])
        .modify(parameters[0].length.toString());
    }
    if (parameters[0].includes("$ARR")) {
      runtimeInfo.stack
        .getVariable(parameters[1])
        .modify(JSON.parse(parameters[0]).length.toString());
    } else {
      new CompilerError(
        `${parameters[0]} is not a countable variable.`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }
  } else {
    new CompilerError(
      `${parameters[1]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default length;
