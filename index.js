#!/usr/bin/env node
require('babel-register')({ presets: ['es2015'], only: /src/, });

var task = process.argv.slice(2)[0];
var chalk = require('chalk');
var tasks = require('./src/tasks/tasks.json');
var showBanner = require('./src/utils/showBanner').default;
var showTasks = require('./src/utils/showTasks').default;

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
	require('./src/tasks/' + task);
}