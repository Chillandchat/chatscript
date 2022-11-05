import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the cos function, this function will just return the cos value from the math library.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const cos = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[1])) {
    runtimeInfo.stack
      .getVariable(parameters[1])
      .modify(String(Math.cos(Number(parameters[0]))));
  } else {
    new CompilerError(
      `${parameters[1]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default cos;
