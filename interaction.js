import client from "./index.js";

export const interactionCreate = async (interaction) => {
  console.log("interaction", interaction.commandName);

  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;

    if (commandName === "ping") {
      interaction.reply("Hello from ping");
    }

    if (commandName === "search") {
      const word = interaction.options.getString("word"); // The word to search for
      const limit = interaction.options.getInteger("limit"); // Max number of results
      const guildId = interaction.guildId; // Current guild ID
      const guild = client.guilds.cache.get(guildId); // Fetch the guild

      if (!guild) {
        return interaction.reply("Guild not found!");
      }

      let foundMessages = []; // To store matching messages

      // Iterate through all text channels in the guild
      for (const channel of guild.channels.cache.values()) {
        if (channel.type === 0) {
          // Channel type 0 = Text channel
          try {
            const messages = await channel.messages.fetch({ limit: 100 }); // Fetch last 100 messages

            for (const message of messages.values()) {
              if (message.content.includes(word) && !message.author.bot) {
                foundMessages.push({
                  content: message.content,
                  author: message.author.username,
                  channel: channel.name,
                });

                if (foundMessages.length >= limit) break; // Stop if the limit is reached
              }
            }

            if (foundMessages.length >= limit) break; // Stop iterating channels if limit is reached
            console.log(
              `Searched ${messages.size} messages in #${channel.name}`
            );
          } catch (error) {
            console.error(
              `Could not fetch messages from #${channel.name}:`,
              error
            );
          }
        }
      }

      // Reply with the results
      if (foundMessages.length === 0) {
        return interaction.reply(`No messages found containing "${word}".`);
      }

      // Format the results
      const results = foundMessages
        .map(
          (msg, index) =>
            `${index + 1}. [${msg.author} in #${msg.channel}]: ${msg.content}`
        )
        .join("\n");

      // Send the results
      interaction.reply(
        `Found ${foundMessages.length} messages:\n${results} \n This fetches the data from the only the last 100 messages`
      );
    }
  }
};
