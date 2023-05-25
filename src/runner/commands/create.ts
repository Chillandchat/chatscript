import fs from "fs";

import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the create function, this function will create a file or folder specified in parameter 1.
 * And will name the file or folder the name in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const create = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
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
    !runtimeInfo.stack.variableExists(parameters[1])
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

  if (parameters[0] === "file") {
    fs.writeFileSync(parameters[1], " ");
  }

  if (parameters[0] === "folder") {
    fs.mkdirSync(parameters[1]);
  }
};

export default create;
