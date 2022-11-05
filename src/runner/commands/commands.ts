import { Command } from "../../utils";
import call from "./call";
import compare from "./compare";
import deleteVariable from "./delete";
import _function from "./function";
import _if from "./if";
import calculate from "./math/calculate";
import cos from "./math/cos";
import pi from "./math/pi";
import rand from "./math/rand";
import round from "./math/round";
import sin from "./math/sin";
import sqrt from "./math/sqrt";
import tan from "./math/tan";
import print from "./print";
import set from "./set";

namespace Commands {
  export const commands: Array<Command> = [
    { name: "print", method: print },

    { name: "set", method: set },
    { name: "delete", method: deleteVariable },

    { name: "compare", method: compare },
    { name: "function", method: _function },
    { name: "if", method: _if },

    { name: "sin", method: sin },
    { name: "call", method: call },
    { name: "calculate", method: calculate },
    { name: "cos", method: cos },
    { name: "rand", method: rand },
    { name: "sqrt", method: sqrt },
    { name: "tan", method: tan },
    { name: "round", method: round },
    { name: "pi", method: pi },
  ];
}

export default Commands;
