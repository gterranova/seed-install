const fs = require("fs-extra");
const path = require("path");
const args = process.argv.slice(2);
const argv = require('minimist')(args);

const QUESTIONS = [
  {
    name: 'plop-template-name',
    type: 'input',
    message: 'Template name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Template name may only include letters, numbers, underscores and hashes.';
    }
  }
];

module.exports = function (plop) {

    plop.setGenerator('default', {
        description: 'this is a skeleton plopfile',
        prompts: QUESTIONS, // array of inquirer prompts
        actions: function(answers) {

            process.chdir(plop.getPlopfilePath());
            var config = fs.existsSync('config.json') ?
                JSON.parse(fs.readFileSync('config.json', 'utf8')) :
                {};

            var actions = [{
                type: "add",
                path: "{{config.cwd}}/{{dashCase plop-template-name}}/plopfile.js",
                templateFile: "__plop-template__.plopfile.js",
            },{
                type: "add",
                path: "{{config.cwd}}/{{dashCase plop-template-name}}/{{dashCase plop-template-name}}.default.txt",
                template: "Default for {{ plop-template-name }}",
            }];
            return actions;
        }
    });
};
