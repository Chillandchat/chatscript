import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the sqrt command, this command will return the sqrt(square root) or the value in argument 1.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const sqrt = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[1])) {
    runtimeInfo.stack
      .getVariable(parameters[1])
      .modify(String(Math.sqrt(Number(parameters[0]))));
  } else {
    new CompilerError(
      `${parameters[1]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default sqrt;
