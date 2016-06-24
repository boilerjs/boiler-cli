import { resolve } from 'path';
import { ensureLink } from 'fs-extra';
import { green, red, cyan, bold } from 'chalk';
import ora from 'ora';
import compiler from '../utils/compiler';
import showErrors from '../utils/showErrors';

let spinner = ora('Building the application').start();
let showErrorMessage = showErrors(`${green('?')} ${bold('Build:')} ${red('FAILED :(')}`);

compiler('production', {}, (hasErrors, details) => {
	if (hasErrors) {
		spinner.stop();
		return showErrorMessage(details);
	}

	let configSrc = resolve(process.cwd(), 'config.js');
	let configDest = resolve(process.cwd(), 'dist/config.js');

	ensureLink(configSrc, configDest, (error) => {
		spinner.stop();

		if (error) {
			return showErrorMessage(error);
		} else {
			console.log(`${green('?')} ${bold('Build:')} ${cyan('SUCCESS :)')}`);
		}
	});
});