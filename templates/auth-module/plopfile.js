const fs = require("fs-extra");
const path = require("path");
const args = process.argv.slice(2);
const argv = require('minimist')(args);

module.exports = function (plop) {

    plop.setGenerator('default', {
        description: 'this is a skeleton auth-module',
        prompts: [], // array of inquirer prompts
        actions: function(answers) {

            process.chdir(plop.getPlopfilePath());

            var actions = [{
                type: 'copy',
                src: ["**/*", "**/.*", "!package.inc.json", "!plopfile.js"],
                dest: '{{config.cwd}}/auth'
            },{
                type: 'mergePackages',
                path: '{{config.cwd}}',
                sources: ['package.inc.json']
            }];
            return actions;
        }
    });
};