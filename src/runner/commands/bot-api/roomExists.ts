import { RuntimeInfo } from "../../../utils";
import CompilerError from "../../../utils/error";

/**
 * This is the room exists command, this command will check if the room id in parameter 1 exists on the user's room list.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const roomExists = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
    if (
      Boolean(
        runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true)
      )
    )
      runtimeInfo.stack
        .getVariable(parameters[parameters.length - 1])
        .modify(
          String(
            JSON.parse(
              runtimeInfo.stack.getVariable("$!PROTECTED_ROOMS", true).value
            ).includes(parameters[0])
          )
        );
    else {
      new CompilerError(
        "Error: Not authenticated, please authenticate using the login method first.",
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
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

export default roomExists;
