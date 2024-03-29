import { RuntimeInfo } from "../../../utils";
import CompilerError from "../../../utils/error";
import { RoomType } from "../../../utils/scripts";
import getRoom from "../../../utils/scripts/getRooms";

/**
 * This is the get rooms command, this command will get the rooms that the logged belongs in,
 * and will return it into the variable in the parameter.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _getRooms = async (
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

      await getRoom(
        JSON.parse(
          runtimeInfo.stack.getVariable("$!PROTECTED_USER_INFO", true).value
        )?.username
      )
        .then((rooms: Array<RoomType>): void => {
          runtimeInfo.stack
            .getVariable(parameters[parameters.length - 1])
            .modify(JSON.stringify(rooms));
        })
        .catch((err: unknown): void => {
          new CompilerError(
            `Unable to get rooms: ${err}`,
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

export default _getRooms;
