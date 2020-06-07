// instagram-save functional
const createUrl = require('./lib/create-url');
const parsePage = require('./lib/parse-page');

const text = 'https://www.instagram.com/p/CA5vab5pgRI/?utm_source=ig_web_copy_link';

if(text.indexOf('instagram.com') !== -1) {
	console.log(text);

	const url = createUrl(text);

	console.log(url);

	parsePage(url)
		.then(post => {
			if( post.success ) {
				console.log(JSON.stringify(post.data));
				// if( post.data.length > 0 ) {
				// 	const media = post.data.map(url => {
				// 		return {
				// 			'type': 'photo',
				// 			'media': url
				// 		};
				// 	});

				// 	bot.sendMediaGroup(chatId, media).then(() => {
				// 		// Media group sent!
				// 	});
				// } else {
				// 	bot.sendPhoto(chatId, data[0]).then(() => {
				// 		// Photo sent!
				// 	});
				// }
			} else {
				console.log('[E] No success in post parsing.');
			}
		})
		.catch(err => {
			console.log('[E] Failed to request resource. Error: ' + err.message);
		});
}
else {
	console.log('I will wait for correct instagram link, dude.');
}