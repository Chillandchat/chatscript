import parse from "../../compiler/parse";
import CompilerError from "../../utils/error";
import run from "../run";
import { Command, RuntimeInfo, TreeNode } from "./../../utils/index.d";
import Commands from "./commands";

/**
 * This the set command, this command will modify a variable or create one if it's not created.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const set = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (parameters[1][0] !== "(") {
    runtimeInfo.stack.variableExists(parameters[0])
      ? runtimeInfo.stack.getVariable(parameters[0]).modify(parameters[1])
      : runtimeInfo.stack.newVariable(parameters[0], parameters[1]);
  } else {
    runtimeInfo.stack.newVariable(parameters[0], "");
    const statement: Array<TreeNode> = parse(
      `${parameters[1].slice(1, parameters[1].length - 1)} ${parameters[0]};`
    );

    let ran: boolean = false;
    Commands.commands.forEach((command: Command, index: number): void => {
      if (command.name === statement[0].command) {
        ran = true;
        command.method(statement[0].arguments, {
          line: index + 1,
          file: process.argv[2],
          stack: runtimeInfo.stack,
        });
      }
      if (
        !ran &&
        command.name !== statement[0].command &&
        index === Commands.commands.length - 1
      ) {
        new CompilerError(
          `${statement[0].command} is not a valid command, did you mis-spell something??`,
          process.argv[2],
          String(index + 1),
          "error"
        );
      }
    });
  }
};

export default set;
