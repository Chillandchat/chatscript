import { RuntimeInfo } from "../../utils";
import CompilerError from "../../utils/error";

/**
 * This is the enable command, this command will enable a service.
 * This command will enable all services beyond the first parameter.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const enable = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  runtimeInfo.stack.variableExists("$!PROTECTED_SHELL_ALLOWED", true)
    ? undefined
    : runtimeInfo.stack.newVariable("$!PROTECTED_SHELL_ALLOWED", "false");

  runtimeInfo.stack.variableExists("$!PROTECTED_FILE_SYSTEM_ALLOWED", true)
    ? undefined
    : runtimeInfo.stack.newVariable("$!PROTECTED_FILE_SYSTEM_ALLOWED", "false");

  runtimeInfo.stack.variableExists("$!PROTECTED_NETWORK_ALLOWED", true)
    ? undefined
    : runtimeInfo.stack.newVariable("$!PROTECTED_NETWORK_ALLOWED", "false");

  for (let i: number = 0; i < parameters.length; i++) {
    switch (parameters[i]) {
      case "terminal-service":
        if (!process.argv.includes("--allow-terminal-service")) {
          new CompilerError(
            "Terminal service is not allowed, please use the --allow-terminal-service flag to enable this service.",
            runtimeInfo.file,
            runtimeInfo.line.toString(),
            "error"
          );
        }

        runtimeInfo.stack.getVariable("$!PROTECTED_SHELL_ALLOWED", true)
          .value === "true"
          ? new CompilerError(
              "Service already enabled.",
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            )
          : runtimeInfo.stack
              .getVariable("$!PROTECTED_SHELL_ALLOWED", true)
              .modify("true", true);
        break;

      case "file-system-service":
        if (!process.argv.includes("--allow-file-system-service")) {
          new CompilerError(
            "File system service is not allowed, please use the --allow-file-system-service flag to enable this service.",
            runtimeInfo.file,
            runtimeInfo.line.toString(),
            "error"
          );
        }

        runtimeInfo.stack.getVariable("$!PROTECTED_FILE_SYSTEM_ALLOWED", true)
          .value === "true"
          ? new CompilerError(
              "Service already enabled.",
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            )
          : runtimeInfo.stack
              .getVariable("$!PROTECTED_FILE_SYSTEM_ALLOWED", true)
              .modify("true", true);
        break;

      case "network-service":
        if (!process.argv.includes("--allow-network-service")) {
          new CompilerError(
            "Network service is not allowed, please use the --allow-network-service flag to enable this service.",
            runtimeInfo.file,
            runtimeInfo.line.toString(),
            "error"
          );
        }

        runtimeInfo.stack.getVariable("$!PROTECTED_NETWORK_ALLOWED", true)
          .value === "true"
          ? new CompilerError(
              "Service already enabled.",
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            )
          : runtimeInfo.stack
              .getVariable("$!PROTECTED_NETWORK_ALLOWED", true)
              .modify("true", true);
        break;

      default:
        new CompilerError(
          "No valid service provided, please provide a valid service to enable.",
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
        break;
    }
  }
};

export default enable;
