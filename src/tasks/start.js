import findFreePort from 'find-free-port';
import { resolve } from 'path';
import { green, red, cyan, bold } from 'chalk';
import compiler from '../utils/compiler';
import showErrors from '../utils/showErrors';

const MIN_PORT = 3000;
const HOST = '0.0.0.0';
let showErrorMessage = showErrors(red('An error occurred while starting the application! Are you in a wrong folder, maybe?'));

findFreePort(MIN_PORT, HOST, (error, port) => {
	if (error) { return showErrorMessage(error); }

	console.log(`${green('?')} ${bold('Application started:')} ${cyan('yes')}`);
	console.log(`${green('?')} ${bold('Application watching for changes:')} ${cyan('yes')}`);
	console.log(`${green('?')} ${bold('Application address:')} ${cyan('http://' + HOST + ':' + port)}`);
	console.log();
	console.log(green('Happy coding :)'));
	console.log();

	compiler('development', { HOST, PORT: port }, (hasErrors, details) => {
		if (hasErrors) { return showErrorMessage(details); }

		console.log(details);
		console.log();
	});
});