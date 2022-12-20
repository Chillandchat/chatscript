import { v4 as uuid } from "uuid";

import { MessageType } from "./../../../utils/scripts/index.d";
import { RuntimeInfo } from "../../../utils";
import CompilerError from "../../../utils/error";
import sendMessage from "../../../utils/scripts/sendMessage";

/**
 * This is the send message command, this command will send the content in parameter 1 in the room of parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _sendMessage = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
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

    const messageData: MessageType = {
      id: uuid(),
      user: JSON.parse(
        runtimeInfo.stack.getVariable("$!PROTECTED_USER_INFO").value
      )?.username,
      content: message,
      room: room,
    };

    await sendMessage(messageData)
      .then((): void => {})
      .catch((err: unknown): void => {
        new CompilerError(
          `Unable to send message: ${err}`,
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

export default _sendMessage;
