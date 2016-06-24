import { gray } from 'chalk';

export default function (message) {
	return function(details) {
		console.log(message);

		if (details) {
			console.log();
			console.log(gray('Error details:'));
			console.log();
			console.log(details);
		}
	};
}