/**
 * This is the variable class, it's a basic structure for the variable.
 *
 * @param {string} name The name of the variable.
 * @param {string} value The value of the variable
 */

import CompilerError from "../../utils/error";

export class Variable {
  public name: string;
  public value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  /**
   * This is the modify method, this method will modify the value of the variable
   *
   * @param {string} value The NEW value of the variable.
   * @optional @param {boolean} allowProtectionBypass If the command is allowed to bypass the variable protection.
   */

  public modify(value: string, allowProtectionBypass?: boolean): void {
    if (this.name.includes("$!PROTECTED") && !allowProtectionBypass)
      new CompilerError(
        "Permission denied, cannot modify protected variables!",
        "Unknown",
        "Unknown",
        "error"
      );

    this.value = value;
  }
}

export default Variable;
