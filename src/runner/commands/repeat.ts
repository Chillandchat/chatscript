import { Variable } from "./variable";
import parse from "../../compiler/parse";
import { FunctionInstance, RuntimeInfo } from "../../utils";
import run from "../run";

/**
 * This is the repeat function, this function will run the code snippet in parameter 2 parameter 1 times.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const repeat = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  let body: string;
  console.log(parameters);
  runtimeInfo.stack.stack.forEach((value: Variable): void => {
    parameters[0] = parameters[0].replaceAll(value.name, value.value);
  });

  for (let i = 0; i < Number(parameters[0]); i++) {
    if (parameters[1][0] === "$") {
      const functionData: FunctionInstance = JSON.parse(
        runtimeInfo.stack.getVariable(parameters[1]).value
      );

      for (let i = 0; i < functionData.parameters.length; i++) {
        functionData.body = JSON.parse(
          JSON.stringify(functionData.body).replaceAll(
            functionData.parameters[i],
            parameters[i + 2]
          )
        );
      }
      body = Buffer.from(JSON.stringify(functionData.body)).toString("base64");
    } else {
      let editedBody: string = parameters[1].slice(1, parameters[1].length - 1);
      body = Buffer.from(JSON.stringify(parse(editedBody))).toString("base64");
    }
    run(body, runtimeInfo.stack);
  }
};

export default repeat;
