import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the rand command, this command will return a random number from 0 to the number in argument 1.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const rand = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[1])) {
    runtimeInfo.stack
      .getVariable(parameters[1])
      .modify(String(Math.floor(Math.random() * Number(parameters[0]))));
  } else {
    new CompilerError(
      `${parameters[1]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default rand;
