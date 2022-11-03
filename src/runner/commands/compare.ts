import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the compare command, this command will return the boolean value of wether
 * parameter 1 is equal to parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const compare = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[2])) {
    runtimeInfo.stack
      .getVariable(parameters[2])
      .modify(String(parameters[1] === parameters[0]));
  } else {
    new CompilerError(
      `${parameters[2]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default compare;
