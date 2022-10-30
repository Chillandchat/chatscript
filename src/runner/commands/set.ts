import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This the set command, this command will modify a variable or create one if it's not created.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const set = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  runtimeInfo.stack.variableExists(parameters[0])
    ? runtimeInfo.stack.getVariable(parameters[0]).modify(parameters[1])
    : runtimeInfo.stack.newVariable(parameters[0], parameters[1]);
};

export default set;
