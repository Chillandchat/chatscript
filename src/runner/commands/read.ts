import fs from "fs";
import { Variable } from "./variable";
import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the read command, this command will read the file in the first parameter and return the value in the variable in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const read = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (!runtimeInfo.stack.variableExists(parameters[1])) {
    new CompilerError(
      `${parameters[1]} is undefined. Did you forget to define ${parameters[1]}??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

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

  if (!fs.existsSync(parameters[0])) {
    new CompilerError(
      `${parameters[0]} is not a valid directory`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  runtimeInfo.stack.stack.forEach((value: Variable): void => {
    if (value.name === parameters[1]) {
      value.modify(fs.readFileSync(parameters[0]).toString());
    }
  });
};

export default read;
