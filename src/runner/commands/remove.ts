import CompilerError from "../../utils/error";
import { RuntimeInfo } from "../../utils";

/**
 * This is the remove variable function, this function will remove the selected variable from the call stack.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const removeVariable = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  for (let i = 0; i < parameters.length; i++) {
    if (runtimeInfo.stack.variableExists(parameters[i]))
      runtimeInfo.stack.removeVariable(parameters[i]);
    else {
      new CompilerError(
        `${parameters[i]} is undefined, did you forget to define it??`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }
  }
};

export default removeVariable;
