import fs from "fs";

import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the delete command, this command will delete a file or folder from the file system.
 * This command will only require a parameter for the path to delete.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const deleteFile = (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): void => {
  let path: string = parameters[0];

  if (parameters[0][0] === "$") {
    path = runtimeInfo.stack.getVariable(parameters[0]).value;

    if (!runtimeInfo.stack.variableExists(parameters[0])) {
      new CompilerError(
        `${parameters[0]} is undefined, did you forget to define it??`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }
  }

  if (!fs.existsSync(path)) {
    new CompilerError(
      `${path} does not exist. Please choose a valid path.`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  const pathType: any = fs.statSync(path);
  pathType.isFile() ? fs.unlinkSync(path) : fs.rmdirSync(path);
};

export default deleteFile;
