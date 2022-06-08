import { CommandInteraction, CommandInteractionOption, MessageEmbed } from 'discord.js';
import { CDClient } from '../cdclient';
import { decimalToFraction } from '../math';
import { Item } from '../types/Item';
import { SlashCommand } from '../types/SlashCommand';

export default {
  name: 'unpack',
  description: 'View all packages that drop an item!',
  options: [
    {
      name: 'package',
      description: 'A package in LEGO Universe.',
      type: 'STRING',
      required: true,
      autocomplete: true,
    }],
  run: async function (
    interaction: CommandInteraction,
    options: readonly CommandInteractionOption[],
    cdclient: CDClient) {

    const query = options.find((option) => option.name === 'package').value.toString();
    const itemId = parseInt(query) || await cdclient.getObjectId(query);
    const item = new Item(cdclient, itemId);
    await item.create();
    await item.addUnpacks();

    const embed = new MessageEmbed();
    embed.setTitle(`${item.name} [${item.id}]`);
    embed.setURL(item.getURL());
    embed.setThumbnail(item.imageURL)

    let c = 1;
    item.unpack.forEach((eachDrop, index) => {
      if (eachDrop.smashables.length > 0 && embed.fields.length < 25) {
        let range: string;
        if (eachDrop.minToDrop === eachDrop.maxToDrop) {
          range = eachDrop.minToDrop.toString();
        } else {
          range = `${eachDrop.minToDrop}-${eachDrop.maxToDrop}`;
        }

        embed.addField(

          `${c++}. ${(decimalToFraction(eachDrop.chance))} for ${range} ${item.name}`,
          `From ${eachDrop.smashables.map(({ name, id }) => `${name} [[${id}]](${item.getURL(id)})`).join(', ')}`.slice(0, 1023),
        );
      }
    });
    if (embed.fields.length === 0) {
      embed.addField("Not Unpacked!", `${item.name} is not found by opening a package!`)
    }

    interaction.reply({
      embeds: [embed],
    });
  },
} as SlashCommand;