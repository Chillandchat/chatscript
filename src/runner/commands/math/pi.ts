import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the pi function, this function will just return the pi value from the math library.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const pi = (parameters: Array<string>, runtimeInfo: RuntimeInfo) => {
  if (runtimeInfo.stack.variableExists(parameters[0])) {
    runtimeInfo.stack.getVariable(parameters[0]).modify(String(Math.PI));
  } else {
    new CompilerError(
      `${parameters[0]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default pi;
