import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the object command, this command will create an object in parameter 1 to the variable in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const object = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
    if (!parameters[parameters.length - 1].includes("$OBJ")) {
      new CompilerError(
        `${parameters[parameters.length - 1]} is not an object data type!`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }

    parameters[0] = parameters[0].slice(1, parameters[0].length - 1);

    let returnValue: any = {};

    let isKey: boolean = true;
    let isValue: boolean = false;

    let currentKey: string = "";
    let currentValue: string = "";

    for (let i: number = 0; i < parameters[0].length; i++) {
      if (parameters[0][i] === ":" && isKey) {
        isKey = false;
        isValue = true;
      }
      if (parameters[0][i] === ";" && isValue && parameters[0][i - 1] !== "/") {
        isValue = false;

        currentValue = currentValue.slice(3, currentValue.length - 1);

        if (currentValue[0] === "$" && parameters[0][i - 1] !== "/") {
          if (!runtimeInfo.stack.variableExists(currentValue)) {
            new CompilerError(
              `${currentValue} is undefined, did you forget to define it??`,
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            );
          }
          currentValue = runtimeInfo.stack.getVariable(currentValue).value;
        }
        returnValue[currentKey] = currentValue;
        currentKey = "";
        currentValue = "";

        isValue = false;
        isKey = true;

        i++;
      } else {
        if (isKey) {
          currentKey = currentKey.concat(parameters[0][i]);
        }
        if (isValue) {
          currentValue = currentValue.concat(parameters[0][i]);
        }
      }
    }

    runtimeInfo.stack
      .getVariable(parameters[parameters.length - 1])
      .modify(JSON.stringify(returnValue));
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

export default object;
