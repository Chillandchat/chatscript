import { MessageType } from "./../../../utils/scripts/index.d";
import { RuntimeInfo } from "../../../utils";
import CompilerError from "../../../utils/error";
import getMessages from "../../../utils/scripts/getMessages";

/**
 * This is the get messages command, this command will get all the messages in the room in parameter 1,
 * and return the messages in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _getMessages = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    getMessages(parameters[0])
      .then((messages: Array<MessageType>): void => {
        runtimeInfo.stack
          .getVariable(parameters[1])
          .modify(JSON.stringify(messages));
      })
      .catch((err: unknown): void => {
        new CompilerError(
          `Unable to get messages: ${err}`,
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

export default _getMessages;
