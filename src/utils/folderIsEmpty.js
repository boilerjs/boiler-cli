import { existsSync, readdirSync } from 'fs-extra';

export default function(folder) {
	let folderExists = existsSync(folder);

	if (folderExists) {
		return readdirSync(folder).length === 0;
	} else {
		return true;
	}

	return false;
}