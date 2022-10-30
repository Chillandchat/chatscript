import { Command } from "../../utils";
import deleteVariable from "./delete";
import print from "./print";
import set from "./set";

namespace Commands {
  export const commands: Array<Command> = [
    { name: "print", method: print },
    { name: "set", method: set },
    { name: "delete", method: deleteVariable },
  ];
}

export default Commands;
