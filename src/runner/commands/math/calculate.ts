import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This the calculate command, this commands will return the result of the expression in argument 1.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const calculate = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  let answer: number;
  let expression: string = parameters[0];

  for (let i = 0; i < runtimeInfo.stack.stack.length; i++) {
    expression = parameters[0].replaceAll(
      runtimeInfo.stack.stack[i].name,
      runtimeInfo.stack.stack[i].value
    );
  }

  if (expression.includes("$")) {
    new CompilerError(
      `Cannot evaluate expression!!`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  eval(`answer = ${expression}`);

  if (!runtimeInfo.stack.variableExists(parameters[1])) {
    new CompilerError(
      `${parameters[1]} is not defined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  //@ts-ignore
  runtimeInfo.stack.getVariable(parameters[1]).modify(answer.toString());
};

export default calculate;
