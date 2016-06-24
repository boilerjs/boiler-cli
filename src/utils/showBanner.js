import pkg from '../../package.json';
import { gray, cyan } from 'chalk';

export default function () {
	let banner = [
		gray(' ___    ___    ___   _      ___   ___ '),
		gray('| _ )  / _ \\  |_ _| | |    | __| | _ \\'),
		gray('| _ \\ | (_) |  | |  | |__  | _|  |   /'),
		gray('|___/  \\___/  |___| |____| |___| |_|_\\ ') + cyan(pkg.version),
	].join('\n');

	console.log(banner);
	console.log();
}