const fs = require("fs-extra");
const path = require("path");

const QUESTIONS = [
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

            var actions = [
                {
                    type: 'remove',
                    path: ['tns-template-blank-ng', '{{nativescript-folder}}'],
                    basePath: '{{config.cwd}}',
                    skipNotExisting: true,
                },
                {
                    type: 'copy',
                    src: ['tns-template-blank-ng'],
                    dest: '{{config.cwd}}',
                    skipNotExisting: true,
                },
                {
                    type: 'tnsCreate',
                    template: 'tns-template-blank-ng',
                    nativescriptFolder: '{{nativescript-folder}}',
                    projectPath: '{{config.cwd}}',
                },
                {
                    type: 'remove',
                    path: ['tns-template-blank-ng'],
                    basePath: '{{config.cwd}}',
                },
            ];

            return actions;
        }
    });
};
