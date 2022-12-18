import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the prompt command, this command will prompt the user for input, and return the inputted value in the variable.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const prompt = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
    runtimeInfo.stack
      .getVariable(parameters[parameters.length - 1])
      .modify(require("prompt-sync")()(parameters[0]));
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

export default prompt;
