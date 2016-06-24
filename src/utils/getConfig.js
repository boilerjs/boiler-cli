import { resolve } from 'path';
import { readJsonSync, outputJsonSync } from 'fs-extra';

export default function () {
	const HOME_DIR = process.env.HOME;
	let configPath = resolve(HOME_DIR, '.boilerrc');
	let config = {
		organization: 'ACME Inc.'
	};

	try {
		config = readJsonSync(configPath);
	} catch (error) {
		outputJsonSync(configPath, config);
	}

	return config;
}