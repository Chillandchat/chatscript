import { Variable } from "./commands/variable";
import { Command, TreeNode } from "../utils";
import CompilerError from "../utils/error";
import CallStack from "./commands/callStack";
import Commands from "./commands/commands";

const run = (
  ast: string,
  stack?: CallStack,
  returnStack?: boolean
): void | Array<Variable> => {
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

  tree.forEach((value: TreeNode, treeIndex: number): void => {
    Commands.commands.forEach((command: Command, index: number): void => {
      if (command.name === value.command) {
        ran = true;
        command.method(value.arguments, {
          line: index + 1,
          file: process.argv[2],
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
    });
  });

  if (returnStack) {
    return callStack.stack;
  }
};

export default run;
