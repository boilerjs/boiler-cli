import { walk, statSync, readFileSync, outputFileSync } from 'fs-extra';
import { template } from 'underscore';

function replaceFile (item, params) {
	let isFile = statSync(item.path).isFile();

	if (isFile) {
		let content = readFileSync(item.path, 'utf8');

		content = template(content)(params);

		outputFileSync(item.path, content);
	}
}

export default function (appPath, params, callback) {
	let items = [];
	let re = /(node_modules|\.eot|\.woff2?|\.ttf|\.svg|\.png|\.jpg|\.jpeg|\.bmp|\.ico)/i;

	walk(appPath)
		.on('data', (item) => {
			if (!item.path.match(re)) {
				items.push(item);
			}
		})
		.on('end', () => {
			try {
				items.forEach((item) => {
					replaceFile(item, params);
				});

				callback(null);
			} catch (error) {
				callback(error);
			}
		});
}