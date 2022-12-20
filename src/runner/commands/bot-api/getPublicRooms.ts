import CompilerError from "../../../utils/error";
import { RoomType } from "../../../utils/scripts";
import getPublicRooms from "../../../utils/scripts/getPublicRooms";
import { RuntimeInfo } from "./../../../utils/index.d";

/**
 * This is the get public rooms command,
 * this command will get all the public rooms from the server and return it into the variable in parameter 1.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _getPublicRooms = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
      if (!parameters[parameters.length - 1].includes("$ARR")) {
        new CompilerError(
          `${parameters[parameters.length - 1]} is not an array!`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
      }

      await getPublicRooms()
        .then((data: Array<RoomType>): void => {
          runtimeInfo.stack
            .getVariable(parameters[parameters.length - 1])
            .modify(JSON.stringify(data));
        })
        .catch((err: unknown): void => {
          new CompilerError(
            `Unable to get public rooms: ${err}`,
            runtimeInfo.file,
            runtimeInfo.line.toString(),
            "error"
          );
        });
    } else {
      new CompilerError(
        `${
          parameters[parameters.length - 1]
        } is undefined, did you forget to define it??`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }
  } else {
    new CompilerError(
      "Error: Not authenticated, please authenticate using the login method first.",
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }
};

export default _getPublicRooms;
