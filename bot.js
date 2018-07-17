const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
let bot;

// instagram-save functional
const createUrl = require('./lib/create-url');
const parsePage = require('./lib/parse-page');

if(process.env.NODE_ENV === 'production') {
	bot = new Bot(token);
	bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
	bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;

	if(text.indexOf('instagram.com') !== -1) {
		const url = createUrl(text);

		parsePage(url)
			.then(post => {
				if( post.success ) {
					if( post.data.length > 0 ) {
						const media = post.data.map(url => {
							return {
								'type': 'photo',
								'media': url
							};
						});

						bot.sendMediaGroup(chatId, media).then(() => {
							// Media group sent!
						});
					} else {
						bot.sendPhoto(chatId, data[0]).then(() => {
							// Photo sent!
						});
					}
				} else {
					bot.sendMessage(chatId, '[E] No success in post parsing.').then(() => {
						// reply sent!
					});
				}
			})
			.catch(err => {
				bot.sendMessage(chatId, '[E] Failed to request resource. Error: ' + err.message).then(() => {
					// reply sent!
				});
			});
	}
	else {
		bot.sendMessage(chatId, 'I will wait for correct instagram link, dude.').then(() => {
			// reply sent!
		});
	}
});

module.exports = bot;
