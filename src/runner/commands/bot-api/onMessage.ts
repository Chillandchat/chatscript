import { io } from "socket.io-client";

import run from "../../run";
import CompilerError from "../../../utils/error";
import { FunctionInstance, RuntimeInfo } from "./../../../utils/index.d";
import { MessageType } from "../../../utils/scripts";

/**
 * This is the on message command, this command will listen to a message in the room in parameter 1 and call the function in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const onMessage = (
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

    const socket: any = io(String(process.env.SOCKET_URL), {
      transports: ["websocket"],
    });

    socket.on(
      `client-message:room(${room})`,
      (messageResponse: MessageType): void => {
        if (!parameters[1].includes("FUNC")) {
          new CompilerError(
            `${parameters[1]} is not a callable variable!`,
            runtimeInfo.file,
            runtimeInfo.line.toString(),
            "error"
          );
        }

        if (runtimeInfo.stack.variableExists(parameters[1])) {
          const functionData: FunctionInstance = JSON.parse(
            runtimeInfo.stack.getVariable(parameters[1]).value
          );

          if (!functionData.parameters[0].includes("$OBJ")) {
            new CompilerError(
              `${functionData.parameters[0]} is not an object data type.`,
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            );
          }

          runtimeInfo.stack.newVariable(
            functionData.parameters[0],
            JSON.stringify(messageResponse)
          );

          run(
            Buffer.from(JSON.stringify(functionData.body)).toString("base64"),
            runtimeInfo.stack
          );
        } else {
          new CompilerError(
            `${parameters[0]} is undefined, did you forget to define it??`,
            runtimeInfo.file,
            runtimeInfo.line.toString(),
            "error"
          );
        }
      }
    );
  } else {
    new CompilerError(
      "Not authenticated, please authenticate using the login method first.",
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default onMessage;
