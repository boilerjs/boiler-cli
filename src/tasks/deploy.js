import { resolve } from 'path';
import { red, cyan } from 'chalk';
import showErrors from '../utils/showErrors';

let showErrorMessage = showErrors(red('An error occurred while deploying the application!'));

try {
	let deployScriptPath = resolve(process.cwd(), 'build/deploy.js');
	let deployScript = require(deployScriptPath);

	if (typeof deployScript === 'function') {
		deployScript(require('fs-extra'), require('chalk'), require('inquirer'));
	} else {
		showErrorMessage('The deploy script must return a function.');
	}
} catch (error) {
	showErrorMessage(error);
}