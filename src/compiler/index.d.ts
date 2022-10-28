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
