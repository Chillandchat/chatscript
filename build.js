const dotenv = require("dotenv");
const fs = require("fs");

console.log("Starting build...");

const variables = dotenv.parse(
  Buffer.from(fs.readFileSync("./.env", { flag: "r" }))
);

let envFileWriteData = "";
let keys = [];
for (const [key, data] of Object.entries(variables)) {
  envFileWriteData = envFileWriteData.concat(
    `export const ${key} = "${data}"; \n`
  );
  keys.push(key);
}

fs.writeFileSync("./build/tmp/vars.ts", envFileWriteData);

let sendMessageFileWriteData = fs
  .readFileSync("./src/utils/scripts/sendMessage.ts")
  .toString();
sendMessageFileWriteData = sendMessageFileWriteData.replace(
  "dotenv.config();",
  ""
);
sendMessageFileWriteData = sendMessageFileWriteData.replace(
  `import dotenv from "dotenv";`,
  ""
);
sendMessageFileWriteData = sendMessageFileWriteData.replaceAll(
  "process.env.",
  ""
);

sendMessageFileWriteData =
  `import {${JSON.stringify(keys)
    .slice(1, -1)
    .replaceAll(`"`, "")}} from "../../vars";` + sendMessageFileWriteData;

fs.writeFileSync(
  "./build/tmp/utils/scripts/sendMessage.ts",
  sendMessageFileWriteData
);

let deleteMessageFileWriteData = fs
  .readFileSync("./src/utils/scripts/deleteMessage.ts")
  .toString();
deleteMessageFileWriteData = deleteMessageFileWriteData.replace(
  "dotenv.config();",
  ""
);
deleteMessageFileWriteData = deleteMessageFileWriteData.replace(
  `import dotenv from "dotenv";`,
  ""
);
deleteMessageFileWriteData = deleteMessageFileWriteData.replaceAll(
  "process.env.",
  ""
);

deleteMessageFileWriteData =
  `import {${JSON.stringify(keys)
    .slice(1, -1)
    .replaceAll(`"`, "")}} from "../../vars";` + deleteMessageFileWriteData;

fs.writeFileSync(
  "./build/tmp/utils/scripts/deleteMessage.ts",
  deleteMessageFileWriteData
);

let setKeyboardSocketFileWriteData = fs
  .readFileSync("./src/utils/scripts/setKeyboardSocket.ts")
  .toString();
setKeyboardSocketFileWriteData = setKeyboardSocketFileWriteData.replace(
  "dotenv.config();",
  ""
);
setKeyboardSocketFileWriteData = setKeyboardSocketFileWriteData.replace(
  `import dotenv from "dotenv";`,
  ""
);
setKeyboardSocketFileWriteData = setKeyboardSocketFileWriteData.replaceAll(
  "process.env.",
  ""
);

setKeyboardSocketFileWriteData =
  `import {${JSON.stringify(keys)
    .slice(1, -1)
    .replaceAll(`"`, "")}} from "../../vars";` + setKeyboardSocketFileWriteData;

fs.writeFileSync(
  "./build/tmp/utils/scripts/setKeyboardSocket.ts",
  setKeyboardSocketFileWriteData
);

let apiFileWriteData = fs.readFileSync("./src/utils/scripts/api.ts").toString();
apiFileWriteData = apiFileWriteData.replace("dotenv.config();", "");
apiFileWriteData = apiFileWriteData.replace(`import dotenv from "dotenv";`, "");
apiFileWriteData =
  `import {${JSON.stringify(keys)
    .slice(1, -1)
    .replaceAll(`"`, "")}} from "../../vars";` + apiFileWriteData;
apiFileWriteData = apiFileWriteData.replaceAll("process.env.", "");

fs.writeFileSync("./build/tmp/utils/scripts/api.ts", apiFileWriteData);

console.log("Done 👍");
