import axios, { AxiosResponse } from "axios";

import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the post command, this command will send a POST request to the server in parameter 1 with the data in parameter 2,
 * finally it will return all data into the variable in parameter 3.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const post = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
  if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
    if (!runtimeInfo.stack.variableExists(parameters[1])) {
      new CompilerError(
        `${parameters[1]} is undefined, did you forget to define it??`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }

    const body: string = runtimeInfo.stack.getVariable(parameters[1]).value;

    await axios
      .post(parameters[0], JSON.parse(body))
      .then((response: AxiosResponse): void => {
        const returnValue: any = response.data;

        runtimeInfo.stack
          .getVariable(parameters[parameters.length - 1])
          .modify(JSON.stringify(returnValue));
      })
      .catch((err: unknown): void => {
        new CompilerError(
          `Server: ${parameters[0]} responded with an error. \nError message: ${err}`,
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
};

export default post;
