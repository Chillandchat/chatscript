import { RuntimeInfo, TreeNode } from "../utils/index.d";

/**
* This is the load string function, this function will parse and run the string in parameter 1
* 
* @param {Array<string>} parameters The data from the chat-script command.
* @param {RuntimeInfo} runtimeInfo The runtime information.
*/ 

const loadString = (parameter: Array<string>, runtimeInfo: RuntimeInfo): void => {
  const ast: Array<TreeNode> = parse(parameter[0]);
  run(ast);
}

export default loadString;
