import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This the exit command, this command will stop the program from executing.
 * You can pass a exit code to exit with the first argument, you may also pass nothing to exit with exit code 0.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const exit = (parameters: Array<string>, _runtimeInfo: RuntimeInfo): void => {
  if (parameters[0] === undefined) {
    process.exit(0);
  } else {
    process.exit(Number(parameters[0]));
  }
};

export default exit;
