import { AutocompleteInteraction, Client, CommandInteraction, CommandInteractionOption, CommandInteractionOptionResolver, Interaction } from "discord.js"
import { CDClient } from "./cdclient";
import { token, sqlite_path } from "./config.json";
import { getSlashCommands, updateSlashCommands } from "./setup";
import { LocaleXML } from "./locale";

const cdclient = new CDClient();
const locale = new LocaleXML()

const client = new Client({
  intents: []
})

var slashCommands:Map<string, Function> = getSlashCommands();

client.once("ready", async () => {
  console.log("\n------------------------------------\n");
  await locale.load()
  await cdclient.load()
  // updateSlashCommands(client)
  console.log("\n------------------------------------\n");
  console.log("LEGO Universe Discord Bot is online.");
  // process.exit(0)
})

client.on("interactionCreate", async (interaction: CommandInteraction) => {
  const options: readonly CommandInteractionOption[] = interaction.options?.data || [];
  // console.log(options);

  if(interaction.type === "APPLICATION_COMMAND"){
    slashCommands.get(interaction.commandName)(interaction, options, cdclient)
  }
  else if(interaction.type === "APPLICATION_COMMAND_AUTOCOMPLETE"){

  }
})

client.login(token)
