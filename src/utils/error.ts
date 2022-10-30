import { LogType } from ".";

/**
 * This is the compile error, as the name suggests it is a compiler error.
 *
 * @param {string} message The error message.
 * @param {string} file The file of the error.
 * @param {string} line The line of the error.
 * @optional @param {LogType} type The type of the log.
 * @note You can specify the type to auto print.
 */

class CompilerError {
  private message: string;
  private file: string;
  private line: string;

  constructor(message: string, file: string, line: string, type?: LogType) {
    this.message = message;
    this.file = file;
    this.line = line;

    type !== undefined ? this.print(type) : undefined;
  }

  /**
   * This is the print method, this method will print the error message to the screen.
   *
   * @param {LogType} type  The type of the log.
   * @note You can specify the type argument to print the message automatically.
   */

  public print(type: LogType): void {
    const message: string = `${type.toUpperCase()}: ${
      this.message
    } \n      at ${this.file} \n      at ${this.line}`;

    if (type === "warn") console.warn(message);
    if (type === "log") console.log(message);
    if (type === "error") {
      console.error(message);
      process.exit(1);
    }
  }
}

export default CompilerError;
