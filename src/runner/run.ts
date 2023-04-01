import { Variable } from "./commands/variable";
import { Command, TreeNode } from "../utils";
import CompilerError from "../utils/error";
import CallStack from "./commands/callStack";
import Commands from "./commands/commands";

const run = async (
  ast: string,
  stack?: CallStack,
  returnStack?: boolean
): Promise<void | Array<Variable>> => {
  let callStack: CallStack;

  const tree: Array<TreeNode> = JSON.parse(
    Buffer.from(ast, "base64").toString("ascii")
  );

  if (stack === undefined) {
    callStack = new CallStack();
  } else {
    callStack = stack;
  }

  let ran: boolean = false;
  let treeIndex: number = 0;

  for (const value of tree) {
    let index: number = 0;
    for (const command of Commands.commands) {
      if (command.name === value.command) {
        ran = true;
        await command.method(value.arguments, {
          line: treeIndex + 1,
          file: process.argv[process.argv.length - 1],
          stack: callStack,
        });
      }
      if (
        !ran &&
        command.name !== value.command &&
        index === Commands.commands.length - 1
      ) {
        new CompilerError(
          `${value.command} is not a valid command, did you mis-spell something??`,
          process.argv[2],
          String(treeIndex + 1),
          "error"
        );
      }
      index++;
    }
    index = 0;
    treeIndex++;
  }
  if (returnStack) {
    return callStack.stack;
  }
};

export default run;
