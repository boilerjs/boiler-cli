import { green, red, cyan, bold } from 'chalk';
import downloadGitRepo from 'download-git-repo';
import { resolve, basename } from 'path';
import inquirer from 'inquirer';
import { removeSync } from 'fs-extra';
import ora from 'ora';
import folderIsEmpty from '../utils/folderIsEmpty';
import listTemplateRepositories from '../utils/listTemplateRepositories';
import getConfig from '../utils/getConfig';
import replacer from '../utils/replacer';
import showErrors from '../utils/showErrors';

let appPath = process.argv.slice(2)[1] || process.cwd();
let appName = basename(appPath);

if ( !folderIsEmpty(appPath) ) {
	showErrors(`${red('The')} ${cyan(appName)} ${red('folder is not empty!')}`)();
} else {
	let questions = [
		{
			type: 'input',
			name: 'appName',
			message: 'Application name:',
			default: appName
		},
		{
			type: 'input',
			name: 'organization',
			message: 'Organization:',
			default: getConfig().organization
		}
	];
	let templateChoices = [];

	listTemplateRepositories((error, repositories) => {
		if (error) {
			return showErrors(red('An error occurred while fetching templates repositories!'))(error);
		}

		repositories.forEach(({ description: name, full_name: value } = repository) => {
			templateChoices.push({ name, value });
		});

		questions.push({
			type: 'list',
			name: 'appTemplate',
			message: 'Template:',
			choices: templateChoices
		});

		inquirer.prompt(questions).then(({ appName, organization, appTemplate }) => {

			console.log();

			let spinner = ora('Fetching template').start();

			downloadGitRepo(appTemplate + '#dev', appPath, (error) => {
				if (error) {
					removeSync(appPath);
					return showErrors(`${red('An error occurred while downloading')} ${cyan(appTemplate)} ${red('template!')}`)(error);
				}

				replacer(appPath, { appName, organization }, (error) => {
					if (error) {
						removeSync(appPath);
						return showErrors(`${red('An error occurred while replacing files!')}`)(error);
					}

					spinner.stop();

					console.log(`${green('Application')} ${cyan(appName)} ${green('successfully created!')}`);
				});
			});
		});
	});
}