/**
 * This is the help function for the CLI, this function is mainly for code
 * tidiness and prints out a help message.
 *
 * @note No arguments are required for this function.
 */

const help = (): void => {
  const text: string = "Welcome to Chill&chat chatscript v1.1.0!";

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
  console.log("usage: chatscript [<allowed services>] <command> [file]");
  console.log("\n\n");
};

export default help;
