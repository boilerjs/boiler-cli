import path from 'path';
import notifier from 'node-notifier';

module.exports = function() {
	let pkg = require(path.resolve(process.cwd(), 'package.json'));
	let successIcon = path.resolve(__dirname, '../../logo/compilation-ok.png');
	let errorIcon = path.resolve(__dirname, '../../logo/compilation-error.png');

	return {
		apply(compiler) {
			compiler.plugin('done', (stats) => {
				let time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);
				let successMessage = 'Compilation done with success in ' + time + 's';
				let errorMessage = 'Compilation done with errors in ' + time + 's';

				notifier.notify({
					title: 'Boiler [' + pkg.name + ']',
					message: stats.hasErrors() ? errorMessage : successMessage,
					icon: stats.hasErrors() ? errorIcon : successIcon,
					sound: true,
					time: 5000
				});
			});
		}
	};
};