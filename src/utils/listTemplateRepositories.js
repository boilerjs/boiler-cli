import request from 'request';

export default function (callback) {
	let url = 'https://api.github.com/users/boilerjs-templates/repos';
	let headers = { 'User-Agent': 'boiler-cli' };

	request({ url, headers }, (error, response, data) => {
		if (error) { return callback(error); }

		callback(null, JSON.parse(data));
	});
}