#!/usr/bin/env node

'use strict';

const path = require('path');
const Liftoff = require('liftoff');
const args = process.argv.slice(2);
const argv = require('minimist')(args);
const v8flags = require('v8flags');
const interpret = require('interpret');
const chalk = require('chalk');

const nodePlop = require('node-plop');
const globalPkg = require('./package.json');

const Plop = new Liftoff({
	name: 'plop',
	extensions: interpret.jsVariants,
	v8flags: v8flags
});

Plop.launch({
	cwd: argv.cwd,
}, run);

function run(env) {
	// set the default base path to the plopfile directory
	const plop = nodePlop();

	// handle request for usage and options
	if (argv.help || argv.h) {
		console.log('displayHelpScreen');
		process.exit(0);
	}

	// handle request for initializing a new plopfile
	if (argv.init || argv.i) {
		console.log('createInitPlopfile');
		process.exit(0);
		/*
		return out.createInitPlopfile(env.cwd, function(err){
			if (err){
				console.log(err);
				process.exit(1);
			}
			process.exit(0);
		});
		*/
	}

	// handle request for version number
	if (argv.version || argv.v) {
		if (env.modulePackage.version !== globalPkg.version) {
			console.log(chalk.yellow('CLI version'), globalPkg.version);
			console.log(chalk.yellow('Local version'), env.modulePackage.version);
		} else {
			console.log(globalPkg.version);
		}
		return;
	}
	
    plop.load(path.resolve(path.join(__dirname, 'src', 'plop-helpers.js')));

    plop.setGenerator('cli', {
        description: 'Run main plopfile',
        prompts: [], 
        actions: [{
			type: 'plop',
			path: '..',
			stdout: process.stdout,
			cwd: process.cwd(),
			defaultGenerator: 'generate'
		}] 
    });
	
	plop.getGenerator('cli').runActions();
}
