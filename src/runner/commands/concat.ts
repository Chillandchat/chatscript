import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the concat command, this command add a string to a string or add a element to the array depending on the type.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const concat = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
    if (parameters[parameters.length - 1].includes("$ARR")) {
      const value: string = JSON.stringify(
        JSON.parse(
          runtimeInfo.stack.getVariable(parameters[parameters.length - 1]).value
        ).concat(parameters[0])
      );
      runtimeInfo.stack
        .getVariable(parameters[parameters.length - 1])
        .modify(value);
    } else {
      const value: string = runtimeInfo.stack
        .getVariable(parameters[parameters.length - 1])
        .value.concat(parameters[0]);

      runtimeInfo.stack
        .getVariable(parameters[parameters.length - 1])
        .modify(value);
    }
  } else {
    new CompilerError(
      `${
        parameters[parameters.length - 1]
      } is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default concat;
