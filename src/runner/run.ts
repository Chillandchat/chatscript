import { Command, TreeNode } from "../utils";
import CallStack from "./commands/callStack";
import Commands from "./commands/commands";

const run = (ast: string): void => {
  const tree: Array<TreeNode> = JSON.parse(
    Buffer.from(ast, "base64").toString("ascii")
  );

  const callStack = new CallStack();

  tree.forEach((value: TreeNode, line: number): void => {
    Commands.commands.forEach((command: Command, index: number): void => {
      if (command.name === value.command)
        command.method(value.arguments, {
          line: index,
          file: process.argv[2],
          stack: callStack,
        });
    });
  });
};

run(
  "W3siY29tbWFuZCI6InNldCIsImFyZ3VtZW50cyI6WyIkVkFSIiwiSGVsbG8gd29ybGQhIl19LHsiY29tbWFuZCI6ImRlbGV0ZSIsImFyZ3VtZW50cyI6WyIkVkFSIl19LHsiY29tbWFuZCI6InByaW50IiwiYXJndW1lbnRzIjpbIiRWQVIiXX1d"
);
