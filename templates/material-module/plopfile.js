const fs = require("fs-extra");
const path = require("path");
const args = process.argv.slice(2);
const argv = require('minimist')(args);

module.exports = function (plop) {

    plop.setGenerator('default', {
        description: 'this is a skeleton MaterialModule',
        prompts: [], // array of inquirer prompts
        actions: function(answers) {

            process.chdir(plop.getPlopfilePath());

            var actions = [{
                type: "add",
                path: "{{config.cwd}}/material/material.module.ts",
                templateFile: "material.module.ts"
            },{
                type: "add",
                path: "{{config.cwd}}/material/material.module.tns.ts",
                templateFile: "material.module.tns.ts"
            },{
                type: 'mergePackages',
                path: '{{config.cwd}}',
                sources: ['package.inc.json']
            },{
                type: "addImport",
                symbolName: "MaterialModule",
                importPath: `{{config.cwd}}/material/material.module.ts`,
                ngModulePaths: `{{config.cwd}}`,
                moduleWildcards: ['*.module.ts', '!*-routing.module.*']
            }];
            return actions;
        }
    });
};