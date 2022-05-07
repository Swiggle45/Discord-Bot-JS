const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Roll dice with buttons'),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('')
			.setDescription('dice here');
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('d20')
					.setLabel('d20')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d4')
					.setLabel('d4')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d6')
					.setLabel('d6')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d8')
					.setLabel('d8')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d10')
					.setLabel('d10')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d12')
					.setLabel('d12')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d100')
					.setLabel('d100')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('submit')
					.setLabel('roll')
					.setStyle('SUCCESS'),
			);
		await interaction.reply({ content: 'Unalives, I mean Dice', ephemeral: true, embeds: [embed], components: [row] });
	},
};