/**
 * This is the help function for the CLI, this function is mainly for code
 * tidiness and prints out a help message.
 *
 * @note No arguments are required for this function.
 */

const help = (): void => {
  const text: string = "Welcome to the Chill&chat CLI v1.1.0!";

  console.clear();
  console.log("\n\n");
  if (process.stdout.columns < text.length) {
    console.log(text);
  } else {
    console.log(
      `${"-".repeat(
        Math.ceil((process.stdout.columns - text.length) / 2 - 1)
      )} ${text} ${"-".repeat(
        Math.floor((process.stdout.columns - text.length) / 2 - 1)
      )}\n`
    );
  }

  console.log(
    "For more information on the language and it's technical details, please see: https://github.com/Chillandchat/cli/wiki \n"
  );
  console.log(
    "usage: <exec_name> [--compile Sets compile mode] [--help Get help information] [--run Sets run mode] [input]"
  );
  console.log("\n\n");
};

export default help;
