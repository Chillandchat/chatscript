import { Variable } from "./variable";
import parse from "../../compiler/parse";
import { FunctionInstance, RuntimeInfo } from "../../utils";
import run from "../run";
import CompilerError from "../../utils/error";

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
      runtimeInfo.stack.stack.forEach((value: Variable): void => {
        editedBody = editedBody.replaceAll(value.name, value.value);
      });

      if (editedBody.includes("$")) {
        new CompilerError(
          "Unable to run repeat function.",
          runtimeInfo.file,
          String(runtimeInfo.line),
          "error"
        );
      }
      body = Buffer.from(JSON.stringify(parse(editedBody))).toString("base64");
    }
    run(body);
  }
};

export default repeat;

// Syntax:
// repeat num_of_times (function body);
//             arg1^       arg2^
