import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the get command, this command will get the element in a variable in parameter 1.
 * And will return the data to the variable in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const get = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
    if (parameters[parameters.length - 1].includes("$ARR")) {
      const value: string = JSON.stringify(
        JSON.parse(
          runtimeInfo.stack.getVariable(parameters[parameters.length - 1]).value
        )[Number(parameters[0])]
      );
      runtimeInfo.stack
        .getVariable(parameters[parameters.length - 1])
        .modify(value);
    }
    if (parameters[parameters.length - 1].includes("$OBJ")) {
      const value: string = JSON.stringify(
        JSON.parse(
          runtimeInfo.stack.getVariable(parameters[parameters.length - 1]).value
        )[parameters[0]]
      );
      runtimeInfo.stack
        .getVariable(parameters[parameters.length - 1])
        .modify(value);
    } else {
      const value: string = runtimeInfo.stack.getVariable(
        parameters[parameters.length - 1]
      ).value[Number(parameters[0])];

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

export default get;
