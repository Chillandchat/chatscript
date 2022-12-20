import CompilerError from "../../../utils/error";
import deleteMessage from "../../../utils/scripts/deleteMessage";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the delete message command, this command will delete the message with the id of parameter 1 in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _deleteMessage = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    if (
      !JSON.parse(
        runtimeInfo.stack.getVariable("$!PROTECTED_ROOMS", true).value
      ).includes(parameters[1])
    ) {
      new CompilerError(
        "Room does not exist.",
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }

    let message: string = parameters[0];
    let room: string = parameters[1];

    if (parameters[0].includes("$")) {
      if (!runtimeInfo.stack.variableExists(parameters[0])) {
        new CompilerError(
          `${parameters[0]} is undefined.`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }
      message = runtimeInfo.stack.getVariable(parameters[0]).value;
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
      room = runtimeInfo.stack.getVariable(parameters[1]).value;
    }

    await deleteMessage(parameters[0], parameters[1])
      .then((): void => {})
      .catch((err: unknown): void => {
        new CompilerError(
          `Cannot delete message ${parameters[0]}: ${err}`,
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

export default _deleteMessage;
