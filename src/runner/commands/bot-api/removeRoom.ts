import CompilerError from "../../../utils/error";
import removeRoom from "../../../utils/scripts/removeRoom";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the remove room command, this command will as the name suggest remove the room in parameter 1.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _removeRoom = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    let room: string = parameters[0];

    if (parameters[0].includes("$")) {
      if (!runtimeInfo.stack.variableExists(parameters[0])) {
        new CompilerError(
          `${parameters[0]} is undefined.`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }
      room = runtimeInfo.stack.getVariable(parameters[0]).value;
    }

    removeRoom(
      room,
      JSON.parse(runtimeInfo.stack.getVariable("$!PROTECTED_USER_INFO").value)
        ?.username
    )
      .then((): void => {})
      .catch((err: unknown): void => {
        new CompilerError(
          `Unable to remove room: ${err}`,
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

export default _removeRoom;
