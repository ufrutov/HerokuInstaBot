module.exports = createUrl;

/**
 * @param  {string} urlOrMediaId
 * @return {string}
 */
function createUrl(urlOrMediaId) {
	if( isUrl(urlOrMediaId) ) {
		return convertUrl(urlOrMediaId);
	} else {
		return convertUrl(`https://www.instagram.com/p/${urlOrMediaId}/`);
	}
	// return isUrl(urlOrMediaId) ? urlOrMediaId : `https://www.instagram.com/p/${urlOrMediaId}/`;
}

/**
 * @param  {string} urlOrMediaId
 * @return {boolean}
 */
function isUrl(urlOrMediaId) {
	return urlOrMediaId.substring(0, 8) === 'https://' || urlOrMediaId.substring(0, 7) === 'http://';
}

function getUrlArgs(url) {
	return url.split("?");
}

function convertUrl(url) {
	if( getUrlArgs(url).length > 1 ) {
		return url + "&__a=1";
	} else {
		return url + "?__a=1";
	}
}