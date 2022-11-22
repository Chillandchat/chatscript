import fs from "fs";

import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the write function, this function will write the string in parameter 1 into the file in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const write = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (
    parameters[0][0] === "$" &&
    !runtimeInfo.stack.variableExists(parameters[0])
  ) {
    new CompilerError(
      `${parameters[0]} is undefined. Did you forget to define ${parameters[0]}??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  parameters[0][0] === "$"
    ? (parameters[0] = runtimeInfo.stack.getVariable(parameters[0]).value)
    : undefined;

  if (
    parameters[1][0] === "$" &&
    !runtimeInfo.stack.variableExists(parameters[0])
  ) {
    new CompilerError(
      `${parameters[1]} is undefined. Did you forget to define ${parameters[1]}??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  parameters[1][0] === "$"
    ? (parameters[1] = runtimeInfo.stack.getVariable(parameters[1]).value)
    : undefined;

  fs.writeFileSync(parameters[1], parameters[0]);
};

export default write;
