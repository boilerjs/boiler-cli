#!/usr/bin/env node
require('babel-register')({ presets: ['es2015'], only: /src/, });

require('./src');