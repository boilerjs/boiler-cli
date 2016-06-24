import { spawn } from 'child_process';
import { resolve } from 'path';

spawn('node', [resolve(process.cwd(), 'deploy.js')], { stdio: 'inherit' });