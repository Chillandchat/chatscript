import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the delay command, this command will delay/halt the program for however many milliseconds provided in argument 1.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const delay = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (parameters[0][0] === "$") {
    runtimeInfo.stack.variableExists(parameters[0])
      ? (parameters[0] = runtimeInfo.stack.getVariable(parameters[0]).value)
      : new CompilerError(
          `${parameters[1]} is undefined, did you forget to define it??`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
  }
  const startTime: number = Date.now();
  while (Date.now() - startTime < Number(parameters[0]));
};

export default delay;
