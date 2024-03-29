import { v4 as uuid } from "uuid";

import { TreeNode } from "../utils/index.d";
import insert from "../utils/insert";

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
  let isComment: boolean = false;

  let current: string = "";
  for (let i = 0; i < data.length; i++) {
    let opened: boolean = false;

    if (isComment || data[i] === "#") {
      if (data[i] === "#") {
        isComment = true;
      }

      if (isComment && data[i] === "\n") {
        isComment = false;
      }
      continue;
    }

    if (
      openedBracket &&
      !openedQuote &&
      data[i] === ")" &&
      closedNestedBracket !== 0
    ) {
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
    if (data[i] === "(" && !openedQuote && !openedBracket) openedBracket = true;
    if (data[i] === ")" && !openedQuote && closedNestedBracket === 0)
      openedBracket = false;

    if (data[i] !== ";") current = current.concat(data[i]);
    if (data[i] === ";" && (openedBracket || openedQuote))
      current = current.concat(data[i]);

    if (data[i] === ";" && !openedBracket && !openedQuote) {
      lines.push(current);
      current = "";
    }
    if (openedBracket && !openedQuote && data[i] === "(") {
      closedNestedBracket -= 1;
    }
  }
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/(\r\n|\n|\r)/gm, "");

    // @ts-ignore
    lines[i] = lines[i].replaceAll("<endline>", "\n");
  }

  lines.forEach((value: string, index: number): void => {
    value.slice(0, value.length - 1).includes(` `)
      ? undefined
      : (value = value.concat(" "));

    let currentNode: TreeNode = { command: "", arguments: [] };
    let currentCommand: string = "";
    let currentArgument: string = "";

    let openedQuote: boolean = false;
    let openedBracket: boolean = false;

    let closedNestedBracket: number = 0;

    // Pre-processors
    // @ts-ignore
    if (value.replaceAll(" ", "")[0] === "#") {
      lines.splice(index, 1);
      return;
    }

    // @ts-ignore
    if (value.replaceAll(" ", "")[0] === "$") {
      // @ts-ignore
      if (value.replaceAll(" ", "").slice(0, 5) === "$FUNC")
        value = `call ${value}`;
      else {
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
            // @ts-ignore
            openedQuote ? currentArgument.replaceAll(`"`, "") : currentArgument
          );
          currentArgument = "";
        }
        if (i === value.length - 1 && !openedQuote && !openedBracket) {
          currentNode.arguments.push(
            // @ts-ignore
            openedQuote ? currentArgument.replaceAll(`"`, "") : currentArgument
          );
          currentArgument = "";
        }
        if (value[i] === `"` || value[i] === `(` || value[i] === `)`) {
          if (value[i] === "(" && openedBracket) {
            closedNestedBracket -= 1;
          }

          if (value[i] === "(" && !openedBracket) {
            openedBracket = true;
          }
          if (value[i] === ")" && closedNestedBracket === 0) {
            openedBracket = false;
            currentNode.arguments.push(currentArgument);
            currentArgument = "";
            i++;
            continue;
          }

          if (value[i] === ")" && openedBracket) {
            closedNestedBracket += 1;
          }

          if ((openedQuote || i === value.length - 1) && !openedBracket) {
            // @ts-ignore
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
        if (value[i] === " " && currentCommand !== "") {
          currentNode.command = currentCommand;
          currentCommand = "";
        }

        if (value[i] !== " ") {
          currentCommand = currentCommand.concat(value[i]);
        }
      }
    }

    closedNestedBracket = 0;
    tree.push(currentNode);
    currentNode = { command: "", arguments: [] };
    currentArgument = "";
    currentCommand = "";
  });

  tree.forEach((value: TreeNode, index: number): void => {
    value.arguments.forEach((argument: string, argumentIndex: number): void => {
      if (argument.includes("!(")) {
        const variableName: string = `$OBJ_$ARR_${uuid().toUpperCase()}`;

        tree = insert(tree, index - 1, [
          { command: "set", arguments: [`${variableName}`, argument.slice(1)] },
        ]) as Array<TreeNode>;

        value.arguments[argumentIndex] = variableName;

        tree = insert(tree, index + 2, [
          { command: "delete", arguments: [`${variableName}`] },
        ]) as Array<TreeNode>;
      }
    });
  });
  return tree;
};

export default parse;
