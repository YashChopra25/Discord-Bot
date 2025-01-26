# Discord Interaction Handler

This project is a Discord bot script that handles various interactions using the Discord.js library. The bot supports handling commands like `ping`, `search`, and responding to messages in guild channels. It also registers commands on the Discord API and responds to user messages like "hello", "hi", and "bye".

---

## Features

1. **Ping Command**:
   - Responds with "Hello from ping" when the `/ping` command is used.

2. **Search Command**:
   - Searches for specific keywords across messages in all text channels of a guild.
   - Supports a limit on the number of results returned.
   - Excludes messages from bots.

3. **Message Responses**:
   - Responds to messages like "hello", "hi", and "bye".

4. **Command Registration**:
   - Registers commands on Discord during bot startup.
   - If commands are already registered, it will log their details.

---

## Requirements

- [Node.js](https://nodejs.org/) (v16.9.0 or higher recommended)
- [Discord.js](https://discord.js.org/) library installed
- A registered Discord bot token
- `client` instance set up in your `index.js` file
- Environment file (`secret.js`) for credentials
- check the variable name in the (`sample.secret.js`) file 
---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/YashChopra25/Discord-Bot
