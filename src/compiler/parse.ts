import { TreeNode } from "../utils/index.d";

/**
 * This is the parse function, this function will parse the chat script file and output the AST of the file.
 *
 * @param {string} data The data to be parsed.
 * @returns {Array<TreeNode>} The AST of the file.
 */

const parse = (data: string): Array<TreeNode> => {
  let lines: Array<string> = [];
  let tree: Array<TreeNode> = [];

  let openedQuote: boolean = false;
  let openedBracket: boolean = false;
  let closedNestedBracket: number = 0;

  let current: string = "";
  for (let i = 0; i < data.length; i++) {
    let opened: boolean = false;

    if (openedBracket && !openedQuote && data[i] === "(") {
      closedNestedBracket -= 1;
    }
    if (openedBracket && !openedQuote && data[i] === ")") {
      closedNestedBracket += 1;
    }

    if (data[i] === '"' && !openedBracket && openedQuote) {
      opened = true;
      openedQuote = false;
    }
    if (data[i] === '"' && !openedBracket && !openedQuote && !opened) {
      openedQuote = true;
      opened = true;
    }
    if (data[i] === "(" && !openedQuote) openedBracket = true;
    if (data[i] === ")" && !openedQuote && closedNestedBracket === 0)
      openedBracket = false;

    if (data[i] !== ";") current = current.concat(data[i]);
    if (data[i] === ";" && (openedBracket || openedQuote))
      current = current.concat(data[i]);
    if (data[i] === ";" && !openedBracket && !openedQuote) {
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
    let openedBracket: boolean = false;

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
        if (
          value[i] !== " " ||
          (value[i] === " " && (openedQuote || openedBracket))
        ) {
          currentArgument = currentArgument.concat(value[i]);
        }
        if (value[i] === " " && !openedQuote && !openedBracket) {
          currentNode.arguments.push(
            openedQuote ? currentArgument.replaceAll(`"`, "") : currentArgument
          );
          currentArgument = "";
        }
        if (i === value.length - 1 && !openedQuote && !openedBracket) {
          currentNode.arguments.push(
            openedQuote ? currentArgument.replaceAll(`"`, "") : currentArgument
          );
          currentArgument = "";
        }
        if (value[i] === `"` || value[i] === `(` || value[i] === `)`) {
          if (value[i] === "(") {
            openedBracket = true;
          }
          if (value[i] === ")") {
            openedBracket = false;
            currentNode.arguments.push(currentArgument);
            currentArgument = "";
            i++;
            continue;
          }

          if ((openedQuote || i === value.length - 1) && !openedBracket) {
            currentArgument = currentArgument.replaceAll(`"`, "");
            currentNode.arguments.push(currentArgument);
            currentArgument = "";
            openedQuote = false;
            i++;
            continue;
          }
          if (value[i] === `"` && !openedQuote && !openedBracket) {
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
