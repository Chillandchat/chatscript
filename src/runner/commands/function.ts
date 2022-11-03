import parse from "../../compiler/parse";
import { RuntimeInfo } from "./../../utils/index.d";
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
