import {CommandInteraction, CommandInteractionOption, MessageEmbed} from 'discord.js';
import {CDClient} from '../cdclient';
import {Item} from '../classes/item';
// interface ItemDrop {

// }

export default async function(
    interaction:CommandInteraction,
    options: readonly CommandInteractionOption[],
    cdclient: CDClient) {
  console.log('/drop');
  const item = new Item(cdclient.db, parseInt(options[0].value.toString()));
  await item.create();
  console.log({item});
  const embed = new MessageEmbed();
  embed.setTitle(`${item.name} [${item.id}]`);
  embed.setURL(item.getURL());
  let c = 1;
  item.drop.forEach((eachDrop) => {
    if (eachDrop.enemies.length > 0) {
      // embed.addField(`${c}. ${eachDrop.destructibleNames.join(", ")}`, `1/${Math.round(1/eachDrop.totalChance)}`)
      let range:string;
      if (eachDrop.minToDrop === eachDrop.maxToDrop) {
        range = eachDrop.minToDrop.toString();
      } else {
        range = `${eachDrop.minToDrop}-${eachDrop.maxToDrop}`;
      }
      embed.addField(
          `${c++}. 1/${Math.round(1 / eachDrop.totalChance)} for ${range} ${item.name}`,
          `From ${eachDrop.enemies.map(({name, id}) => `${name} [${id}]`).join(', ')}`,
      );
    }
  });

  interaction.reply({
    // content: `${item.name} [[${item.id}]](https://explorer.lu-dev.net/objects/${item.id})`,
    // content: "```json\n"+JSON.stringify(item,null,2)+"\n```",
    embeds: [embed],
    ephemeral: true,
  });
}
