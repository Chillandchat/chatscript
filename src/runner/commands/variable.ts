/**
 * This is the variable class, it's a basic structure for the variable.
 *
 * @param {string} name The name of the variable.
 * @param {string} value The value of the variable
 */

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
   */

  public modify(value: string): void {
    this.value = value;
  }
}

export default Variable;
