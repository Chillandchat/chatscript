import { Command } from "../../utils/index.d";
import call from "./call";
import compare from "./compare";
import deleteVariable from "./delete";
import exit from "./exit";
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
import prompt from "./prompt";
import set from "./set";
import repeat from "./repeat";
import read from "./read";
import clear from "./clear";
import delay from "./delay";
import write from "./write";
import append from "./append";
import create from "./create";

namespace Commands {
  export const commands: Array<Command> = [
    { name: "print", method: print },
    { name: "prompt", method: prompt },
    { name: "clear", method: clear },

    { name: "set", method: set },
    { name: "delete", method: deleteVariable },
    { name: "call", method: call },

    { name: "compare", method: compare },
    { name: "function", method: _function },
    { name: "if", method: _if },
    { name: "exit", method: exit },
    { name: "repeat", method: repeat },
    { name: "delay", method: delay },

    { name: "sin", method: sin },
    { name: "calculate", method: calculate },
    { name: "cos", method: cos },
    { name: "rand", method: rand },
    { name: "sqrt", method: sqrt },
    { name: "tan", method: tan },
    { name: "round", method: round },
    { name: "pi", method: pi },

    { name: "read", method: read },
    { name: "write", method: write },
    { name: "append", method: append },
    { name: "create", method: create },
  ];
}

export default Commands;
