import { green, red, cyan, bold } from 'chalk';
import downloadGitRepo from 'download-git-repo';
import { resolve, basename } from 'path';
import inquirer from 'inquirer';
import { removeSync } from 'fs-extra';
import folderIsEmpty from '../utils/folderIsEmpty';
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
			default: 'ACME Inc.'
		},
		{
			type: 'list',
			name: 'appTemplate',
			message: 'Template:',
			choices: [
				{
					name: 'Marionette (legacy)',
					value: 'boilerjs-templates/template-marionette'
				},
				{
					name: 'Vue',
					value: 'boilerjs-templates/template-vue'
				}
			]
		}
	];

	inquirer.prompt(questions).then(({ appName, organization, appTemplate }) => {

		console.log();

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

				console.log(`${green('Application')} ${cyan(appName)} ${green('successfully created!')}`);
			});
		});
	});
}



// import { green, red, cyan, bold } from 'chalk';
// import { outputFileSync } from 'fs-extra';
// import { resolve, relative, basename } from 'path';
// import inquirer from 'inquirer';
// import folderIsEmpty from './folderIsEmpty';
// import getTemplate from './getTemplate';
// import downloadDeps from './downloadDeps';
// import showErrors from './showErrors';

// let applicationPath = process.argv.slice(2)[1] || process.cwd();
// let applicationName = basename(applicationPath);

// if ( !folderIsEmpty(applicationPath) ) {
// 	showErrors(`${red('The')} ${cyan(applicationName)} ${red('folder is not empty!')}`)();
// } else {
// 	let questions = [
// 		{
// 			type: 'input',
// 			name: 'applicationName',
// 			message: 'Application name:',
// 			default: applicationName
// 		},
// 		{
// 			type: 'input',
// 			name: 'organization',
// 			message: 'Organization:',
// 			default: 'ACME Inc.'
// 		},
// 		{
// 			type: 'list',
// 			name: 'cssFramework',
// 			message: 'CSS framework:',
// 			choices: ['Bootstrap', 'Spectre.css']
// 		}
// 	];

// 	inquirer.prompt(questions).then(({ applicationName, organization, cssFramework }) => {
// 		cssFramework = cssFramework.toLowerCase();

// 		let files = [
// 			['.gitignore', 'commons/.gitignore'],
// 			['application/main.js', 'commons/main.js'],
// 			['application/router.js', 'commons/router.js'],
// 			['index.html', 'commons/index.html'],
// 			['config.js', 'commons/config.js'],
// 			['package.json', 'commons/package.json'],
// 			['webpack.development.config.js', 'commons/webpack.development.config.js'],
// 			['webpack.production.config.js', 'commons/webpack.production.config.js'],
// 			['application/components/commons/app.vue', `${cssFramework}/app.vue`],
// 			['application/components/commons/home.vue', `${cssFramework}/home.vue`],
// 			['application/components/commons/header.vue', `${cssFramework}/header.vue`],
// 			['application/components/commons/footer.vue', `${cssFramework}/footer.vue`],
// 			['application/components/commons/notFound.vue', `${cssFramework}/notFound.vue`],
// 			['application/components/countries/index.vue', `${cssFramework}/example.vue`],
// 			['application/assets/css/main.css', `${cssFramework}/main.css`],
// 			['application/assets/img/.gitkeep'],
// 			['application/filters/.gitkeep'],
// 			['application/models/.gitkeep']
// 		];
// 		let notifierPath = resolve(__dirname, 'notifier.js');

// 		notifierPath = notifierPath.replace(/\\/g, '/');

// 		files.forEach(([filePath, template] = file) => {
// 			if (template) {
// 				outputFileSync(resolve(applicationPath, filePath), getTemplate(template, { applicationName, organization, notifierPath }));
// 			} else {
// 				outputFileSync(resolve(applicationPath, filePath), '');
// 			}
// 		});

// 		console.log(`${green('?')} ${bold('Folder and files:')} ${cyan('created')}`);

// 		downloadDeps(applicationPath, cssFramework, () => {
// 			console.log(`\n${green('Application')} ${cyan(applicationName)} ${green('successfully created!')}`);
// 		});
// 	});
// }