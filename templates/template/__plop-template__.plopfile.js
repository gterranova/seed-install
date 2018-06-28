const fs = require("fs-extra");
const path = require("path");
const args = process.argv.slice(2);
const argv = require('minimist')(args);

const QUESTIONS = [
  {
    name: '{{dashCase plop-template-name}}-name',
    type: 'input',
    message: '{{plop-template-name}} name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return '{{titleCase plop-template-name}} name may only include letters, numbers, underscores and hashes.';
    }
  }
];

module.exports = function (plop) {

    plop.setGenerator('default', {
        description: 'this is a skeleton {{plop-template-name}}',
        prompts: QUESTIONS, // array of inquirer prompts
        actions: function(answers) {

            process.chdir(plop.getPlopfilePath());
            var config = fs.existsSync('config.json') ?
                JSON.parse(fs.readFileSync('config.json', 'utf8')) :
                {};

            var actions = [{
                type: "add",
                path: "\{{config.cwd}}/\{{dashCase {{dashCase plop-template-name}}-name}}/\{{dashCase {{dashCase plop-template-name}}-name}}.default.txt",
                templateFile: "__{{dashCase plop-template-name}}__.default.txt"
            }];
            return actions;
        }
    });
};