const fs = require("fs-extra");
const path = require("path");

const QUESTIONS = [
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'angular-folder',
    type: 'input',
    message: 'Angular folder:',
    default: 'angularApp',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Folder name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'nativescript-folder',
    type: 'input',
    message: 'Nativescript folder:',
    default: 'nativescriptApp',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Folder name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'angular-version',
    type: 'input',
    default:"6.0.0",
    message: 'Which ng version:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d\.])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, dots, underscores and hashes.';
    }
  }
];

module.exports = function (plop) {

    plop.setGenerator('default', {
        description: 'this is a skeleton plopfile',
        prompts: QUESTIONS, // array of inquirer prompts
        actions: function(answers) {

            process.chdir(plop.getPlopfilePath());
            var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
            console.log("Creating a new material project in", answers.config['cwd']);

            //var actions = [];
            var actions = [
                {
                    type: 'plop',
                    path: '../templates/project',
                    stdout: process.stdout,
                    cwd: '{{config.cwd}}'
                },
                {
                    type: 'remove',
                    path: ['app/**/*', 'assets/**/*', 'fonts/**/*'],
                    basePath: '{{config.cwd}}/{{project-name}}/src',
                },                
                {
                    type: 'copy',
                    src: config.nsAssets,
                    basePath: 'assets/nativescriptApp',
                    dest: '{{config.cwd}}/{{project-name}}/{{nativescript-folder}}'
                },
                {
                    type: 'copy',
                    src: config.ngAssets,
                    basePath: 'assets/angularApp',
                    dest: '{{config.cwd}}/{{project-name}}/{{angular-folder}}',
                },
                {
                    type: 'copy',
                    src: config.commonAssets,
                    basePath: 'assets',
                    dest: '{{config.cwd}}/{{project-name}}',
                },
                {
                    type: 'mergePackages',
                    path: '{{config.cwd}}/{{project-name}}/{{nativescript-folder}}',
                    sources: ['package.inc.json'],
                    basePath: 'assets/nativescriptApp',
                },
                {
                    type: 'mergePackages',
                    path: '{{config.cwd}}/{{project-name}}/{{angular-folder}}',
                    sources: ['package.inc.json'],
                    basePath: 'assets/angularApp',
                },
                {
                    type: 'plop',
                    path: '../templates/material-module',
                    stdout: process.stdout,
                    cwd: '{{config.cwd}}/{{project-name}}/{{angular-folder}}/src/app'
                },
                {
                    type: 'plop',
                    path: '../templates/router-directives',
                    stdout: process.stdout,
                    cwd: '{{config.cwd}}/{{project-name}}/src/app'
                },
            ];

            return actions;
        }
    });
};
