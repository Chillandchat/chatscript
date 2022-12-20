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
    let targetUser: string = parameters[0];
    if (parameters[0].includes("$")) {
      if (!runtimeInfo.stack.variableExists(parameters[0])) {
        new CompilerError(
          `${parameters[0]} is undefined.`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }
      targetUser = runtimeInfo.stack.getVariable(parameters[0]).value;
    }

    followUser(
      targetUser,
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
      "Not authenticated, please authenticate using the login method first.",
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default _followUser;
