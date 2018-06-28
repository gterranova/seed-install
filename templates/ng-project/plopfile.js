const fs = require("fs-extra");
const path = require("path");

const QUESTIONS = [
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

            //var actions = [];
            var actions = [
                {
                    type: 'remove',
                    path: ['{{angular-folder}}'],
                    basePath: '{{config.cwd}}',
                    skipNotExisting: true,
                },
                {
                    type: 'ngCreate',
                    projectPath: '{{angular-folder}}',
                    cwd: '{{config.cwd}}',
                    angularVersion: '{{angular-version}}'
                }
            ];
            return actions;
        }
    });
};
