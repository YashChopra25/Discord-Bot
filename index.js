import { Client, GatewayIntentBits, Events, Routes } from "discord.js";
import { DISCOD_TOKEN, CLIENT_ID } from "./secret.js";
import rest from "./rest-client.js";
import RegisterCommands, { commands } from "./commands.js";
import { interactionCreate } from "./interaction.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.ClientReady, (readyClient) => {
  // console.log("ready",readyClient);
  console.log(`Logged in as ${readyClient.user.username}!`);
  if (!readyClient.application) {
    return;
  }
  rest
    .get(Routes.applicationCommands(CLIENT_ID))
    .then((data) => {
      if (Array.isArray(data) && data.length !== commands.length) {
        RegisterCommands();
        console.log("Commands Registered,Successfully");
      } else {
        console.log("Commands Already Registered");
        data.forEach((command) => {
          let name = command.name;
          let options = [];
          if (command.options) {
            command.options.forEach((option) => {
              options.push(option.name);
            });
          }
          console.log(
            `The command name is: ${name} ${
              options.length
                ? `,and this requires an additional query parameter :${options.join(
                    ", "
                  )}`
                : ""
            }, and the command description is :${command.description}`
          );
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
client.on("messageCreate", (message) => {
  console.log("message", message.content);
  if (message.author.bot) return;
  if (
    message.content.toLowerCase() === "hello" ||
    message.content.toLowerCase() === "hi"
  ) {
    message.reply("Hello", message.author.globalName);
  }

  if (message.content.toLowerCase() === "bye") {
    message.reply("Bye", message.author.globalName);
  }
});

//interaction

client.on("interactionCreate", interactionCreate);

client.login(DISCOD_TOKEN);

export default client;
