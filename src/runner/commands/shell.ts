import { exec } from "child_process";

import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This the shell command, this command will execute a shell command.
 * This command will only require a parameter for the shell command to execute.
 *
 * @note This command requires the terminal service to be enabled.
 * Please use the enable command to enable the terminal service.
 * @see enable.ts
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const shell = async (
  parameters: Array<string>,
  runtimeInfo: RuntimeInfo
): Promise<void> => {
  if (!runtimeInfo.stack.variableExists("$!PROTECTED_SHELL_ALLOWED", true)) {
    new CompilerError(
      `Shell commands are not allowed.`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  if (
    runtimeInfo.stack.getVariable("$!PROTECTED_SHELL_ALLOWED", true).value !==
    "true"
  ) {
    new CompilerError(
      `Shell commands are not allowed.`,
      runtimeInfo.file,
      runtimeInfo.line.toString(),
      "error"
    );
  }

  let shellCommand: string = parameters[0];

  if (parameters[0][0] === "$") {
    if (!runtimeInfo.stack.variableExists(parameters[0])) {
      new CompilerError(
        `${parameters[0]} is undefined, did you forget to define it??`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }

    shellCommand = runtimeInfo.stack.getVariable(parameters[0]).value;
  }

  exec(shellCommand, (error: any, stdout: any, stderr: any): void => {
    if (error) {
      new CompilerError(
        `Unable to execute command on shell: ${error.message}`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }

    if (stderr) {
      new CompilerError(
        `Unable to execute command on shell: ${stderr}`,
        runtimeInfo.file,
        runtimeInfo.line.toString(),
        "error"
      );
    }

    if (stdout) {
      console.log(stdout);
    }
  });
};

export default shell;
