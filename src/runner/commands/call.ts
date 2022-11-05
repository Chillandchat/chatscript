import CompilerError from "../../utils/error";
import run from "../run";
import { FunctionInstance, RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the call command, this command will call a function stored in the call stack.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const call = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (!parameters[0].includes("FUNC")) {
    new CompilerError(
      `${parameters[0]} is not a callable variable!`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  if (runtimeInfo.stack.variableExists(parameters[0])) {
    const functionData: FunctionInstance = JSON.parse(
      runtimeInfo.stack.getVariable(parameters[0]).value
    );
    for (let i = 0; i < functionData.parameters.length; i++) {
      functionData.body = JSON.parse(
        JSON.stringify(functionData.body).replaceAll(
          functionData.parameters[i],
          parameters[i + 1]
        )
      );
    }
    run(Buffer.from(JSON.stringify(functionData.body)).toString("base64"));
  } else {
    new CompilerError(
      `${parameters[0]} is undefined, did you forget to define it??`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default call;
