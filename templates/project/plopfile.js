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
            console.log("Creating a new project in", answers.config['cwd']);

            //var actions = [];
            var actions = [
                {
                    type: 'plop',
                    path: '../templates/ng-project',
                    stdout: process.stdout,
                    cwd: '{{config.cwd}}/{{project-name}}'
                },
                {
                    type: 'plop',
                    path: '../templates/tns-project',
                    stdout: process.stdout,
                    cwd: '{{config.cwd}}/{{project-name}}'
                },         
                {
                    type: 'mergePackages',
                    path: '{{config.cwd}}/{{project-name}}/{{nativescript-folder}}',
                    sources: ['package.inc.json'],
                    basePath: 'assets/nativescriptApp',
                },
                {
                    type: 'remove',
                    path: ['src/app', 'src/assets', 'src/fonts'],
                    basePath: '{{config.cwd}}/{{project-name}}/{{angular-folder}}',
                },
                {
                    type: 'add',
                    templateFile: 'install.js',
                    path: '{{config.cwd}}/{{project-name}}/install.js',
                    skipIfExists: true
                },
                {
                    type: 'copy',
                    src: config.nsAssets,
                    basePath: 'assets/nativescriptApp',
                    dest: '{{config.cwd}}/{{project-name}}/{{nativescript-folder}}'
                },
                {
                    type: 'add',
                    templateFile: 'assets/nativescriptApp/dot.gitignore',
                    path: '{{config.cwd}}/{{project-name}}/{{nativescript-folder}}/.gitignore',
                    skipIfExists: true
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
                    type: 'modify',
                    path: '{{config.cwd}}/{{project-name}}/tsconfig.json',
                    pattern:  /nativescriptApp/gi,
                    template: '{{nativescript-folder}}',
                },
                {
                    type: 'modify',
                    path: '{{config.cwd}}/{{project-name}}/references.d.ts',
                    pattern:  /nativescriptApp/gi,
                    template: '{{nativescript-folder}}',
                },
                {
                    type: 'modify',
                    path: '{{config.cwd}}/{{project-name}}/{{nativescript-folder}}/App_Resources/Android/app.gradle',
                    pattern:  /__PACKAGE__/gi,
                    template: 'org.nativescript.nsApp',
                },
                {
                    type: 'modify',
                    path: '{{config.cwd}}/{{project-name}}/{{nativescript-folder}}/App_Resources/Android/src/main/AndroidManifest.xml',
                    pattern:  /__PACKAGE__/gi,
                    template: 'org.nativescript.nsApp',
                },
                {
                    type: 'modify',
                    path: '{{config.cwd}}/{{project-name}}/{{nativescript-folder}}/App_Resources/Android/src/main/AndroidManifest.xml',
                    pattern:  /__APILEVEL__/gi,
                    template: '25',
                },
                {
                    type: 'exec',
                    command: 'node install.js',
                    cwd: '{{config.cwd}}/{{project-name}}'
                },
                {
                    type: 'exec',
                    command: 'cd {{nativescript-folder}} && npm i && npm run prepCLITablet',
                    cwd: '{{config.cwd}}/{{project-name}}'
                }
            ];

            return actions;
        }
    });
};
