import { RuntimeInfo } from "../../../utils";
import CompilerError from "../../../utils/error";
import unfollowUser from "../../../utils/scripts/unfollowUser";

const _unfollowUser = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
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

    await unfollowUser(
      targetUser,
      JSON.parse(runtimeInfo.stack.getVariable("$!PROTECTED_USER_INFO").value)
        ?.username
    )
      .then((): void => {})
      .catch((err: unknown): void => {
        new CompilerError(
          `Unable to unfollow ${targetUser}: ${err}`,
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

export default _unfollowUser;
