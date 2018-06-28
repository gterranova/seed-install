const fs = require("fs-extra");
const path = require("path");
const args = process.argv.slice(2);
const argv = require('minimist')(args);

const QUESTIONS = [
  {
    name: 'component-name',
    type: 'input',
    message: 'Component name:',
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

            var flat = (answers.config && answers.config.argv['flat'])||false;

            var actions = [{
                type: "add",
                path: `{{config.cwd}}${flat?'':'/{{dashCase component-name}}'}/{{dashCase component-name}}.component.ts`,
                templateFile: "__component__.component.ts",
            },{
                type: "add",
                path: `{{config.cwd}}${flat?'':'/{{dashCase component-name}}'}/{{dashCase component-name}}.component.tns.ts`,
                templateFile: "__component__.component.tns.ts",
            },{
                type: "add",
                path: `{{config.cwd}}${flat?'':'/{{dashCase component-name}}'}/{{dashCase component-name}}.component.html`,
                templateFile: "__component__.component.html",
            },{
                type: "add",
                path: `{{config.cwd}}${flat?'':'/{{dashCase component-name}}'}/{{dashCase component-name}}.component.tns.html`,
                templateFile: "__component__.component.tns.html",
            },{
                type: "add",
                path: `{{config.cwd}}${flat?'':'/{{dashCase component-name}}'}/{{dashCase component-name}}.component.scss`,
                templateFile: "__component__.component.scss",
            },{
                type: "add",
                path: `{{config.cwd}}${flat?'':'/{{dashCase component-name}}'}/{{dashCase component-name}}.component.tns.scss`,
                templateFile: "__component__.component.tns.scss",
            },{
                type: "addDeclaration",
                symbolName: "{{ properCase component-name }}Component",
                importPath: `{{config.cwd}}${flat?'':'/{{dashCase component-name}}'}/{{dashCase component-name}}.component.ts`,
            }];
            return actions;
        }
    });
};
