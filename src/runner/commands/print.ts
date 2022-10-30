import CompilerError from "../../utils/error";
import { RuntimeInfo } from "../../utils/index.d";

/**
 * This is the print function, as the name suggests this function will print the passed text into the screen.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const print = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  for (let i = 0; i < parameters.length; i++) {
    if (parameters[i][0] === "$") {
      if (runtimeInfo.stack.variableExists(parameters[i])) {
        console.log(runtimeInfo.stack.getVariable(parameters[i]).value);
      } else {
        new CompilerError(
          `${parameters[i]} is undefined, did you forget to define it??`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }
    } else {
      console.log(parameters[i]);
    }
  }
};

export default print;
