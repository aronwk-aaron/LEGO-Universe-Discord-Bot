import { BaseCommandInteraction, CommandInteraction, CommandInteractionOption, MessageActionRow, MessageComponentInteraction, MessageEmbed, Modal, ModalActionRowComponent, ModalSubmitInteraction, TextInputComponent } from 'discord.js';
import { CDClient } from '../cdclient';
import { dropHomeRow, itemHomeRow } from '../components';
import { reportChannelId } from '../config';
import { fillEmbedWithLootDrops } from '../discord';
import { notFound } from '../error';
import { bracketURL, getOption, replyOrUpdate } from '../functions';
import { decimalToFraction } from '../math';
import { Button } from '../types/Button';
import { Embed } from '../types/Embed';
import { Item } from '../types/Item';
import { SlashCommand } from '../types/SlashCommand';

export default {
  name: 'report',
  description: 'Open a dialog to report anything about this bot!',
  options: [],
  run: async function (
    interaction,
    options,
    cdclient) {

    const modal = new Modal()
      .setCustomId('report')
      .setTitle('Report');
    const title = new TextInputComponent()
      .setCustomId('title')
      .setLabel("Title")
      .setStyle('SHORT');
    const input = new TextInputComponent()
      .setCustomId('input')
      .setLabel("What's would you like to report?")
      .setStyle('PARAGRAPH');

    const subject = new MessageActionRow<ModalActionRowComponent>().addComponents(title);
    const description = new MessageActionRow<ModalActionRowComponent>().addComponents(input);
    modal.addComponents(subject, description);

    await interaction.showModal(modal);


  },
} as SlashCommand;
