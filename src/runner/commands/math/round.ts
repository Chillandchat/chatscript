import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the round command, this command will as the name suggests, rounds the number provided in the first parameter.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const round = (parameters: Array<string>, runtimeInfo: RuntimeInfo) => {
  if (runtimeInfo.stack.variableExists(parameters[1])) {
    runtimeInfo.stack
      .getVariable(parameters[1])
      .modify(String(Math.round(Number(parameters[0]))));
  } else {
    new CompilerError(
      `${parameters[1]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default round;
