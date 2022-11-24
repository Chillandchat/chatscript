import fs from "fs";

import parse from "../../compiler/parse";
import { RuntimeInfo, TreeNode } from "../../utils";
import CompilerError from "../../utils/error";
import run from "../run";
import Variable from "./variable";

/**
 * This is the import command, this command will import the functions and variables from an external file.
 * The directory can be specified in parameter 1.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _import = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  if (!fs.existsSync(parameters[0]) || !parameters[0].includes(".chat")) {
    new CompilerError(
      `${parameters[0]} is not a valid directory, please select a directory that exists!`,
      runtimeInfo.file,
      String(runtimeInfo.line),
      "error"
    );
  }

  const code: Array<TreeNode> = parse(String(fs.readFileSync(parameters[0])));

  const newStack: void | Array<Variable> = run(
    Buffer.from(JSON.stringify(code)).toString("base64"),
    undefined,
    true
  );

  newStack?.forEach((value: Variable): void => {
    if (value.name.includes("$EXPORT_")) {
      value.name = value.name.replace("$EXPORT_", "$");
      runtimeInfo.stack.stack.push(value);
    }
  });
};

export default _import;
