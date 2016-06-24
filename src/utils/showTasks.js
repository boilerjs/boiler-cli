import { gray, cyan, bold } from 'chalk';
import tasks from '../tasks/tasks.json';

export default function () {
	console.log(bold('Available tasks:'));
	console.log();

	for (let task in tasks) {
		console.log(`${cyan(task)} ${gray(tasks[task])}`);
	}
}