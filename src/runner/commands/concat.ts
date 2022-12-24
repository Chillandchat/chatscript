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
    let concatData: string = parameters[0];

    if (parameters[0][0] === "$") {
      if (!runtimeInfo.stack.variableExists(parameters[0])) {
        new CompilerError(
          `${parameters[0]} is undefined.`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }
      concatData = runtimeInfo.stack.getVariable(parameters[0]).value;
    }

    if (parameters[parameters.length - 1].includes("$ARR")) {
      const value: string = JSON.stringify(
        JSON.parse(
          runtimeInfo.stack.getVariable(parameters[parameters.length - 1]).value
        ).concat(concatData)
      );
      runtimeInfo.stack
        .getVariable(parameters[parameters.length - 1])
        .modify(value);
    } else {
      const value: string = runtimeInfo.stack
        .getVariable(parameters[parameters.length - 1])
        .value.concat(concatData);

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
