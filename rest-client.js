import { REST, Routes } from "discord.js";
import { DISCOD_TOKEN } from "./secret.js";

const rest = new REST({ version: "10" }).setToken(DISCOD_TOKEN);

export default rest;
