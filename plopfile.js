const fs = require("fs-extra");
const path = require("path");

const templatesPath = `${__dirname}/templates`;

const QUESTIONS = [
    {
      name: 'template',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: fs.readdirSync(templatesPath)
    }    
];

module.exports = function (plop) {

    plop.setPlopfilePath(__dirname);
    plop.load(path.join(__dirname, 'src', 'plop-helpers.js'));

    plop.setGenerator('generate', {
        description: 'this is a skeleton plopfile',
        prompts: QUESTIONS, // array of inquirer prompts
        actions: function(answers) {
            if (!answers.config) {
                answers.config = {};
            }

            return [
                {
                    type: 'plop',
                    path: '../templates/{{ template }}',
                    stdout: process.stdout,
                    cwd: process.cwd()
                }
            ]
        }
         
    });
};
