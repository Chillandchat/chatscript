import fs from "fs";

import CompilerError from "./error";

/**
 * This is the read file function, this function will read the selected file and return the data.
 *
 * @param file The file to read.
 * @returns {string | void} The data the file contains.
 * @note Will return nothing when file does not exist.
 */

const readFile = (file: string): string | void => {
  if (fs.existsSync(file)) {
    const data: Buffer = fs.readFileSync(file);

    return data.toString();
  } else {
    new CompilerError(
      `${file} does not exist, please make sure it exists in the directory.`,
      file,
      "0",
      "error"
    );
    return;
  }
};

export default readFile;
