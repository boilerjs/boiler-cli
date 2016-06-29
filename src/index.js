import chalk from 'chalk';
import showBanner from './utils/showBanner';
import showTasks from './utils/showTasks';
import tasks from './tasks/tasks.json';

let task = process.argv.slice(2)[0];

if (!task) { // task is not passed, so show the banner and the task list
	showBanner();
	showTasks();
} else if (!tasks[task]) { // task is passed but is invalid, so show the banner, a warning message and the task list
	showBanner();
	console.log(chalk.red('Task not found!'));
	console.log();
	showTasks();
} else { // task is passed and is valid, so show the banner and execute the task
	showBanner();
	require('./tasks/' + task);
}