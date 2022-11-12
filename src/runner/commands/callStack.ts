import { Variable } from "./variable";

/**
 * This is call stack class, this class provides basic methods and functions to manage the stack
 *
 * @note This class has no constructor method nor arguments.
 */

class CallStack {
  public stack: Array<Variable> = [];

  /**
   * This is the new variable method, this method will create a new variable and add it to the stack.
   *
   * @param {string} name The name of the variable to be created.
   * @param {string} value The initial value of the variable.
   */

  public newVariable(name: string, value: string): void {
    const data: Variable = new Variable(name, value);
    this.stack.push(data);
  }

  /**
   * This is the get variable method, this method will return the data of the variable.
   *
   * @param {string} name The name of the variable.
   * @returns {Variable} The instance of the variable.
   */

  public getVariable(name: string): Variable {
    let data: Variable;
    this.stack.forEach((value: Variable): void => {
      if (value.name === name) data = value;
    });

    // @ts-ignore
    return data;
  }

  /**
   * This is the variable exists method, this method will check if the variable exists in the call stack.
   *
   * @param {string} name The name of the variable.
   * @returns {boolean} Whether the variable exists
   */

  public variableExists(name: string): boolean {
    return this.getVariable(name) !== undefined;
  }

  /**
   * This is the remove variable method, this method will as the name suggests remove a variable.
   *
   * @param {string} name The name of the variable to be removed.
   */

  public removeVariable(name: string): void {
    this.stack.forEach((value: Variable, index: number): void => {
      if (value.name === name) this.stack.splice(index, 1);
    });
  }
}

export default CallStack;
