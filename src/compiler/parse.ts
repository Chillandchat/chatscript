import readFile from "../utils/readFile";
import { TreeNode } from "../utils";

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
    let opened: boolean = false;

    // Pre-processors
    if (value.replaceAll(" ", "")[0] === "#") {
      lines.splice(index, 1);
      return;
    }

    if (value.replaceAll(" ", "")[0] === "$") {
      let replacement = "set";
      let currentProcessArgument = "";

      for (let i = 0; i < value.length; i++) {
        if (value[i] !== " " && value[i] !== "=")
          currentProcessArgument = currentProcessArgument.concat(value[i]);
        if (
          (currentProcessArgument !== "" && value[i] === " ") ||
          i === value.length - 1
        ) {
          replacement = replacement.concat(` ${currentProcessArgument}`);
          currentProcessArgument = "";
        }
      }
      value = replacement;
    }

    for (let i = 0; i < value.length; i++) {
      if (currentNode.command !== "") {
        if (value[i] === ")") {
          currentArgument = `${value.slice(0, i)};`;
        }
        if (value[i] !== " " || (value[i] === " " && opened)) {
          currentArgument = currentArgument.concat(value[i]);
        }
        if (i === value.length - 1 || (value[i] === " " && !opened)) {
          currentNode.arguments.push(
            opened ? currentArgument.replaceAll(`"`, "") : currentArgument
          );
          currentArgument = "";
        }
        if (value[i] === `"` || value[i] === `(` || value[i] === `)`) {
          if (opened && i !== value.length - 1) {
            console.log(currentArgument);
            currentArgument = currentArgument.replaceAll(`"`, "");
            currentNode.arguments.push(currentArgument);
            currentArgument = "";
            opened = false;
            i++;
            continue;
          } else {
            opened = true;
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
  console.log(tree);
  return tree;
};

export default parse;
