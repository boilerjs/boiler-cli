import { statSync, readdirSync } from 'fs-extra';

export default function(folder) {
	try {
		return readdirSync(folder).length === 0;
	} catch (error) {
		return true;
	}

	return false;
}