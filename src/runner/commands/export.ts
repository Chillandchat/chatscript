import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the export command, this command will add an export marker to the variable you want to export.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _export = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  for (let i = 0; i < parameters.length; i++) {
    const variableName: string = `$EXPORT_${runtimeInfo.stack
      .getVariable(parameters[i])
      .name.slice(1)}`;

    if (runtimeInfo.stack.variableExists(variableName)) {
      new CompilerError(
        "Variable already in export list!",
        runtimeInfo.file,
        String(runtimeInfo.line),
        "error"
      );
    }

    runtimeInfo.stack.newVariable(
      variableName,
      runtimeInfo.stack.getVariable(parameters[i]).value
    );
  }
};

export default _export;
