import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the clear command, this command will just simply clear the console.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const clear = (_parameters: Array<string>, _runtimeInfo: RuntimeInfo): void => {
  console.clear();
};

export default clear;
