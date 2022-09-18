import ChillAndChatBotInstance from "../../src/index";
import { MessageType } from "../../src/script";

const bot: ChillAndChatBotInstance = new ChillAndChatBotInstance();

bot
  .login("<USERNAME>", "<PASSWORD>")
  .then((): void => {
    // Listener:
    bot.onMessage("<ROOM>", (message: MessageType): void => {
      if (message.content === "!test") {
        // Will fire when user sends "!test".
        bot.sendMessage("Hi!", message.room);
      } else {
        // Will fire when user type anything other than "!test".
      }

      // Tip: You can also use a switch statement if you have many commands!
    });
  })
  .catch((err: any): void => {
    console.error(err);
    process.exit(1);
  });
