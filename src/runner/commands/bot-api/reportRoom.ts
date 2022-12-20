import { RuntimeInfo } from "../../../utils";
import CompilerError from "../../../utils/error";
import reportRoom from "../../../utils/scripts/reportRoom";

/**
 * This is the report room command, this command will report the room in argument 1 with the message in argument 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _reportRoom = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    let room: string = parameters[0];
    let message: string = parameters[0];

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
    if (parameters[1].includes("$")) {
      if (!runtimeInfo.stack.variableExists(parameters[1])) {
        new CompilerError(
          `${parameters[1]} is undefined.`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }
      message = runtimeInfo.stack.getVariable(parameters[0]).value;
    }
    await reportRoom(
      room,
      message,
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

export default _reportRoom;
