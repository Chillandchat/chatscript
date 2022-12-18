import axios, { AxiosResponse } from "axios";

import CompilerError from "../../utils/error";
import { RuntimeInfo } from "./../../utils/index.d";

/**
 * This is the fetch command, this command will send a GET request to the server url in parameter 1,
 * and will return the response in the variable in parameter 2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const fetch = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
  if (runtimeInfo.stack.variableExists(parameters[parameters.length - 1])) {
    await axios
      .get(parameters[0])
      .then((response: AxiosResponse): void => {
        let tmpResponse: any = response;
        delete tmpResponse.data;

        const returnValue: any = response.data;
        returnValue.meta = tmpResponse;

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

export default fetch;
