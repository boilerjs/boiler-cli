var path = require('path');
var notifier = require('node-notifier');
var pkg = require(path.resolve(process.cwd(), 'package.json'));
var successIcon = path.resolve(__dirname, '../../logo/compilation-ok.png');
var errorIcon = path.resolve(__dirname, '../../logo/compilation-error.png');

module.exports = function() {
	return {
		apply: function (compiler) {
			compiler.plugin('done', function (stats) {
				var time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);
				var successMessage = 'Compilation done with success in ' + time + 's';
				var errorMessage = 'Compilation done with errors in ' + time + 's';

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