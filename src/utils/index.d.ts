import CallStack from "../runner/commands/callStack";

/**
 * This is the log type, this type contains the argument options for the compile error class.
 *
 * @option warn A console warning.
 * @option error A console error message.
 * @option log A log to the console.
 */
export type LogType = "warn" | "error" | "log";

/**
 * This is the tree node interface, this interface is the structure for the AST in the parse script.
 *
 * @param {string} command The command of the line.
 * @param {Array<string>} arguments The list of arguments given in the line.
 */
export interface TreeNode {
  command: string;
  arguments: Array<string>;
}

/**
 * This is the command structure type, this just defines the structure of the command object.
 *
 * @param {string} name The name of the command.
 * @param {(parameters: Array<string>) => any} method The method that is called when the command is triggered.
 */

export interface Command {
  name: string;
  method: (parameters: Array<string>, runtimeInfo: RuntimeInfo) => any;
}

/**
 * This is the runtime information passed in the command method when running.
 * This runtime information can be helpful when error logging.
 *
 * @param {number} line The line number of the command.
 * @param {string} file The file of the command.
 * @param {CallStack} stack The call stack for variables.
 */

export interface RuntimeInfo {
  line: number;
  file: string;
  stack: CallStack;
}

/**
 * This is the function instance interface, this interface outlines the shape of a chat-script function.
 *
 * @param {Array<string>} parameters The array of parameters suppliable to the function.
 * @param {string} name The call name of the function.
 * @param {Array<TreeNode>} body The PARSED body of the function.
 * @note The body is the part that get run when called.
 */

export interface FunctionInstance {
  body: Array<TreeNode>;
  parameters: Array<string>;
  name: string;
}
