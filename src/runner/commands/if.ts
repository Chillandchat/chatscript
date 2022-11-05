import parse from "../../compiler/parse";
import CompilerError from "../../utils/error";
import run from "../run";
import { RuntimeInfo, TreeNode } from "./../../utils/index.d";

/**
 * This is the if command, as the name suggests this command will check IF a condition is true.
 * Just like all programming languages! This command will check parameter 1 against parameter 3 with the operator in parameter2.
 *
 * @param {Array<string>} parameters The data from the chat-script command.
 * @param {RuntimeInfo} runtimeInfo The runtime information.
 */

const _if = (parameters: Array<string>, runtimeInfo: RuntimeInfo): void => {
  let body: Array<TreeNode> = parse(
    parameters[3].slice(1, parameters[3].length - 1)
  );

  if (parameters[0][0] === "$") {
    runtimeInfo.stack.variableExists(parameters[0])
      ? (parameters[0] = runtimeInfo.stack.getVariable(parameters[0]).value)
      : new CompilerError(
          `${parameters[0]} is undefined, did you forget to define it??`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
  }
  if (parameters[2][0] === "$") {
    runtimeInfo.stack.variableExists(parameters[2])
      ? (parameters[2] = runtimeInfo.stack.getVariable(parameters[2]).value)
      : new CompilerError(
          `${parameters[2]} is undefined, did you forget to define it??`,
          runtimeInfo.file,
          runtimeInfo.line.toString(),
          "error"
        );
  }

  for (let i = 0; i < body.length; i++) {
    for (let j = 0; j < body[i].arguments.length; j++) {
      if (body[i].arguments[j][0] === "$") {
        runtimeInfo.stack.variableExists(body[i].arguments[j])
          ? (body[i].arguments[j] = runtimeInfo.stack.getVariable(
              body[i].arguments[j]
            ).value)
          : new CompilerError(
              `${body[i].arguments[j]} is undefined, did you forget to define it??`,
              runtimeInfo.file,
              runtimeInfo.line.toString(),
              "error"
            );
      }
    }
  }

  switch (parameters[1]) {
    case "==":
      if (parameters[0] === parameters[2]) {
        run(Buffer.from(JSON.stringify(body)).toString("base64"));
      }
      break;

    case "!=":
      if (parameters[0] !== parameters[2]) {
        run(Buffer.from(JSON.stringify(body)).toString("base64"));
      }
      break;

    case ">":
      if (Number(parameters[0]) > Number(parameters[2])) {
        run(Buffer.from(JSON.stringify(body)).toString("base64"));
      }
      break;

    case "<":
      if (Number(parameters[0]) < Number(parameters[2])) {
        run(Buffer.from(JSON.stringify(body)).toString("base64"));
      }
      break;

    case ">=":
      if (Number(parameters[0]) >= Number(parameters[2])) {
        run(Buffer.from(JSON.stringify(body)).toString("base64"));
      }
      break;

    case "<=":
      if (Number(parameters[0]) <= Number(parameters[2])) {
        run(Buffer.from(JSON.stringify(body)).toString("base64"));
      }
      break;
  }
};

export default _if;
