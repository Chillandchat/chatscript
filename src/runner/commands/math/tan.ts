import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the tan function, this function will just return the tan value from the math library.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const tan = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[1])) {
    runtimeInfo.stack
      .getVariable(parameters[1])
      .modify(String(Math.tan(Number(parameters[0]))));
  } else {
    new CompilerError(
      `${parameters[1]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default tan;
