import parse from "../../compiler/parse";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the function command, this command will declare a function in the call stack.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _function = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  const functionName: string = parameters[0];
  let functionParameters: Array<string> = [];
  let functionBody: string = "";

  for (let i = 1; i < parameters.length; i++) {
    if (parameters[i][0] !== "(") {
      functionParameters.push(parameters[i]);
    } else {
      functionBody = parameters[i].slice(1, parameters[i].length - 1);
    }
  }

  runtimeInfo.stack.newVariable(
    functionName,
    JSON.stringify({
      body: parse(functionBody),
      parameters: functionParameters,
      name: functionName,
    })
  );
};
export default _function;
