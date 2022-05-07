const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll dice because you\'re a nerd')
		.addIntegerOption(option => 
			option.setName('dice')
				.setDescription('What dice to roll (max number on dice)')
				.setRequired(true))
		.addIntegerOption(option => 
			option.setName('amount')
				.setDescription('Amount of dice (default of 1)')
				.setRequired(false)),
	async execute(interaction) {
		
		console.log(interaction.options.getInteger('amount'));
		await interaction.reply((Math.floor(Math.random() * interaction.options.getInteger('dice')) + 1).toString());
	},
};