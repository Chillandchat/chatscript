import { RoomType } from "./../../../utils/scripts/index.d";
import CompilerError from "../../../utils/error";
import { RuntimeInfo } from "./../../../utils/index.d";
import login from "../../../utils/scripts/login";
import getUser from "../../../utils/scripts/getUser";
import { AuthType } from "../../../utils/scripts";
import getRooms from "../../../utils/scripts/getRooms";

/**
 * This is the login command, this command will log the bot in using the username and password,
 * and will fetch crucial information about the bot.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _login = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
  if (
    Boolean(runtimeInfo.stack.getVariable("$!PROTECTED_IS_AUTHENTICATED", true))
  ) {
    new CompilerError(
      "Already logged in!",
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "warn"
    );
  }

  runtimeInfo.stack.newVariable("$!PROTECTED_IS_AUTHENTICATED", "null");
  runtimeInfo.stack.newVariable("$!PROTECTED_USER_INFO", "null");
  runtimeInfo.stack.newVariable("$!PROTECTED_ROOMS", "null");

  let username: string = parameters[0];
  let password: string = parameters[1];

  if (parameters[0].includes("$")) {
    if (runtimeInfo.stack.variableExists(parameters[0])) {
      username = runtimeInfo.stack.getVariable(parameters[0]).value;
    } else {
      new CompilerError(
        `${parameters[0]} is undefined, did you forget to define it??`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }
  }
  if (parameters[1].includes("$")) {
    if (runtimeInfo.stack.variableExists(parameters[1])) {
      password = runtimeInfo.stack.getVariable(parameters[1]).value;
    } else {
      new CompilerError(
        `${parameters[1]} is undefined, did you forget to define it??`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }
  }

  await login(username, password)
    .then((): void => {
      runtimeInfo.stack
        .getVariable("$!PROTECTED_IS_AUTHENTICATED", true)
        .modify("true", true);
    })
    .catch((err: unknown): void => {
      new CompilerError(
        `Unable to login: ${err}`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    });

  await getUser(username).then((data: AuthType | {}): void => {
    // @ts-ignore
    if (Object.keys(data).length !== 0 && data?.bot)
      runtimeInfo.stack
        .getVariable("$!PROTECTED_USER_INFO", true)
        //@ts-ignore
        .modify(JSON.stringify(data), true);
    else
      new CompilerError(
        "Invalid user.",
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
  });

  await getRooms(username)
    .then((data: Array<RoomType>): void => {
      runtimeInfo.stack
        .getVariable("$!PROTECTED_ROOMS", true)
        .modify(JSON.stringify(data), true);
    })
    .catch((err: unknown): void => {
      new CompilerError(
        `Unable to get rooms: ${err}`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    });
};

export default _login;
