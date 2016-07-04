import { resolve } from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Notifier from '../utils/notifier';

let plugins = {
	development: { HtmlWebpackPlugin, Notifier },
	production: { ExtractTextPlugin, HtmlWebpackPlugin, Notifier }
};

export default function (mode = 'development', options = {}, callback = () => {}) {
	options.webpack = webpack;
	options.BOILER_PATH = resolve(__dirname, '../../');
	options.plugins = plugins[mode];

	let webpackConfigPath = resolve(process.cwd(), `build/webpack.${mode}.config.js`);
	let webpackConfig = require(webpackConfigPath)(options);
	let compiler = webpack(webpackConfig);

	if (mode === 'development') {
		new WebpackDevServer(compiler, {
			hot: true,
			quiet: true,
			stats: {
				colors: true
			}
		}).listen(options.PORT);
	} else {
		compiler.run(() => {});
	}

	compiler.plugin('done', (stats) => {
		let details = stats.toString({
			colors: true,
			version: true,
			timings: true,
			hash: false,
			assets: true,
			children: false,
			chunks: false
		});

		if (stats.hasErrors() || stats.hasWarnings()) {
			details = stats.toString({
				colors: true,
				version: false,
				timings: false,
				hash: false,
				assets: false,
				children: false,
				chunks: false
			});
		}

		callback(stats.hasErrors(), details);
	});
}