import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the disable command, this command will disable a service.
 * This command will only require a parameter for the service to disable.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const disable = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  for (let i: number = 0; i < parameters.length; i++) {
    switch (parameters[i]) {
      case "terminal-service":
        runtimeInfo.stack.getVariable("$!PROTECTED_SHELL_ALLOWED").value ===
        "false"
          ? new CompilerError(
              "Service already disabled.",
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            )
          : runtimeInfo.stack
              .getVariable("$!PROTECTED_SHELL_ALLOWED")
              .modify("false");
        break;

      case "file-system-service":
        runtimeInfo.stack.getVariable("$!PROTECTED_FILE_SYSTEM_ALLOWED")
          .value === "false"
          ? new CompilerError(
              "Service already disabled.",
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            )
          : runtimeInfo.stack
              .getVariable("$!PROTECTED_FILE_SYSTEM_ALLOWED")
              .modify("false");
        break;

      case "network-service":
        runtimeInfo.stack.getVariable("$!PROTECTED_NETWORK_ALLOWED").value ===
        "false"
          ? new CompilerError(
              "Service already disabled.",
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            )
          : runtimeInfo.stack
              .getVariable("$!PROTECTED_NETWORK_ALLOWED")
              .modify("false");
        break;

      default:
        new CompilerError(
          "No service or invalid service provided, please provide a valid service to disable.",
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
        break;
    }
  }
};

export default disable;
