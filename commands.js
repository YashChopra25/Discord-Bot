import { Routes } from "discord.js";
import rest from "./rest-client.js";
import { CLIENT_ID } from "./secret.js";

export const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "search",
    description:
      "this command will return a list of words that matches in the server",
    options: [
      {
        name: "word",
        description: "Word to search for",
        type: 3, // 3 is for the string type
        required: true,
      },
      {
        name: "limit",
        description: "Word limit",
        type: 4, // 4 is for the integer type
        required: true,
      },
    ],
  },
];
const RegisterCommands = async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
export default RegisterCommands;
