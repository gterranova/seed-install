const fs = require("fs-extra");
const path = require("path");
const args = process.argv.slice(2);
const argv = require('minimist')(args);

const QUESTIONS = [
  {
    name: 'module-name',
    type: 'input',
    message: 'Module name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
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
                path: "{{config.cwd}}/{{dashCase module-name}}/{{dashCase module-name}}.module.ts",
                templateFile: "__module__.module.ts",
            },{
                type: "add",
                path: "{{config.cwd}}/{{dashCase module-name}}/{{dashCase module-name}}.module.tns.ts",
                templateFile: "__module__.module.tns.ts",
            },{
                type: "add",
                path: "{{config.cwd}}/{{dashCase module-name}}/{{dashCase module-name}}.common.ts",
                templateFile: "__module__.common.ts",
            },{
                type: "add",
                path: "{{config.cwd}}/{{dashCase module-name}}/{{dashCase module-name}}-routing.module.ts",
                templateFile: "__routing_module__.module.ts",
            },{
                type: "addImport",
                symbolName: "{{ properCase module-name }}Module",
                importPath: `{{config.cwd}}/{{dashCase module-name}}/{{dashCase module-name}}.module.ts`,
                ngModulePaths: `{{config.cwd}}`,
                moduleWildcards: ['*.module.ts', '*.module.tns.ts', '!*-routing.module.*', '!material.module.*']
            }];
            return actions;
        }
    });
};
