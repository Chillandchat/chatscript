import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the sign out command, this command will clear the user-specific data.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const signout = (
  _parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    runtimeInfo.stack
      .getVariable("$!PROTECTED_IS_AUTHENTICATED", true)
      .modify("false", true);
    runtimeInfo.stack.getVariable("$!PROTECTED_ROOMS", true).modify("[]", true);
    runtimeInfo.stack
      .getVariable("$!PROTECTED_USER_INFO", true)
      .modify("{}", true);
  } else {
    new CompilerError(
      "Already signed out.",
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default signout;
