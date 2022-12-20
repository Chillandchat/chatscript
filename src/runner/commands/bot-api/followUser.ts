import CompilerError from "../../../utils/error";
import followUser from "../../../utils/scripts/followUser";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the follow user command, this command will follow the user in parameter 1.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _followUser = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    followUser(
      parameters[0],
      JSON.parse(runtimeInfo.stack.getVariable("$!PROTECTED_USER_INFO").value)
        ?.username
    )
      .then((): void => {})
      .catch((err: unknown): void => {
        new CompilerError(
          `Unable to follow ${parameters[0]}: ${err}`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      });
  } else {
    new CompilerError(
      "Error: Not authenticated, please authenticate using the login method first.",
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default _followUser;
