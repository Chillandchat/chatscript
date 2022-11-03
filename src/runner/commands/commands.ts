import { Command } from "../../utils";
import call from "./call";
import compare from "./compare";
import deleteVariable from "./delete";
import _function from "./function";
import sin from "./math/sin";
import print from "./print";
import set from "./set";

namespace Commands {
  export const commands: Array<Command> = [
    { name: "print", method: print },
    { name: "set", method: set },
    { name: "delete", method: deleteVariable },
    { name: "compare", method: compare },
    { name: "function", method: _function },
    { name: "sin", method: sin },
    { name: "call", method: call },
  ];
}

export default Commands;
