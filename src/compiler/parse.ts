import readFile from "./readFile";
import { TreeNode } from "./index.d";

/**
 * This is the parse function, this function will parse the chat script file and output the AST of the file.
 *
 * @param {string} file The directory of the file to be parsed.
 * @returns {Array<TreeNode>} The AST of the file.
 */

const parse = (file: string): Array<TreeNode> => {
  let lines: Array<string> = [];
  const data: string = String(readFile(file));
  let tree: Array<TreeNode> = [];

  let current: string = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== ";") current = current.concat(data[i]);
    if (data[i] === ";") {
      lines.push(current);
      current = "";
    }
  }

  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/(\r\n|\n|\r)/gm, "");
  }

  lines.forEach((value: string, index: number): void => {
    let currentNode: TreeNode = { command: "", arguments: [] };
    let currentCommand: string = "";
    let currentArgument: string = "";
    let openedQuote: boolean = false;

    if (value.replaceAll(" ", "")[0] === "#") {
      lines.splice(index, 1);
      return;
    }

    for (let i = 0; i < value.length; i++) {
      if (currentNode.command !== "") {
        if (value[i] !== " ") {
          currentArgument = currentArgument.concat(value[i]);
        }
        if (i === value.length - 1 || (value[i] === " " && !openedQuote)) {
          currentNode.arguments.push(
            openedQuote ? currentArgument.replaceAll(`"`, "") : currentArgument
          );
          currentArgument = "";
        }
        if (value[i] === `"`) {
          if (openedQuote && i !== value.length - 1) {
            currentNode.arguments.push(currentArgument.replaceAll(`"`, ""));
            currentArgument = "";
            openedQuote = false;
            i++;
            continue;
          } else {
            openedQuote = true;
          }
        }
      }

      if (currentNode.command === "") {
        if (value[i] === " ") {
          currentNode.command = currentCommand;
          currentCommand = "";
        }

        if (value[i] !== " ") {
          currentCommand = currentCommand.concat(value[i]);
        }
      }
    }

    tree.push(currentNode);
    currentNode = { command: "", arguments: [] };
    currentArgument = "";
    currentCommand = "";
  });

  return tree;
};

export default parse;
