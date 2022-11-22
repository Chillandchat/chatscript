import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the delay command, this command will delay/halt the program for however many milliseconds provided in argument 1.
 *
 * @note
 * You may also specify 'minutes' or 'seconds' in parameter 2 to infer that it is in a seconds or minutes format.
 *
 * @note The default format is milliseconds.
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
  if (parameters[1] === "seconds")
    parameters[0] = String(Number(parameters[0]) * 1000);

  if (parameters[1] === "minutes")
    parameters[0] = String(Number(parameters[0]) * 6000);

  const startTime: number = Date.now();
  while (Date.now() - startTime < Number(parameters[0]));
};

export default delay;
