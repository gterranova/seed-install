const fs = require("fs-extra");
const path = require("path");
const args = process.argv.slice(2);
const argv = require('minimist')(args);

const QUESTIONS = [
  {
    name: 'service-name',
    type: 'input',
    message: 'service name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Service name may only include letters, numbers, underscores and hashes.';
    }
  }
];

module.exports = function (plop) {

    plop.setGenerator('default', {
        description: 'this is a skeleton service',
        prompts: QUESTIONS, // array of inquirer prompts
        actions: function(answers) {

            process.chdir(plop.getPlopfilePath());
            var config = fs.existsSync('config.json') ?
                JSON.parse(fs.readFileSync('config.json', 'utf8')) :
                {};

            var actions = [{
                type: "add",
                path: "{{config.cwd}}/{{dashCase service-name}}.service.ts",
                templateFile: "__service__.service.ts"
            },{
                type: "add",
                path: "{{config.cwd}}/{{dashCase service-name}}.service.tns.ts",
                templateFile: "__service__.service.ts"
            },{
                type: "add",
                path: "{{config.cwd}}//{{dashCase service-name}}.service.spec.ts",
                templateFile: "__service__.service.spec.ts"
            },{
                type: "addProvider",
                symbolName: "{{ properCase service-name }}Service",
                importPath: `{{config.cwd}}/{{dashCase service-name}}.service.ts`,
            }];
            return actions;
        }
    });
};