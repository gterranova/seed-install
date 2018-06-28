const fs = require("fs-extra");
const path = require("path");

const args = process.argv.slice(2);
const argv = require('minimist')(args);

const chalk = require('chalk');
const nodePlop = require('node-plop');

var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

const defaultChoosingMessage = chalk.blue('[PLOP]') + ' Please choose a generator.';

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

module.exports = function (plop, config) {

    // setup config defaults
    const cfg = Object.assign({
        prefix: '',
        argv: argv,
        cwd: process.cwd()
    }, config || {});

    plop.setDefaultInclude({ actionTypes: true, generators: true });

    plop.setActionType('marked', function (answers, config, plop) {
        if (fs.existsSync(config.mdTemplateFile)) {
            console.log(marked(fs.readFileSync(config.mdTemplateFile, 'utf8')).trim());
            process.exit(0);        
        } 
        logError(`${config.mdTemplateFile} not found`);
        process.exit(1);        
    });
    
    // create your generators here
    plop.setActionType('plop', function (answers, config, plop) {

        if (config.stdout) {
            process.stdout = config.stdout;
        }
        
        return new Promise((resolve, reject) => {        
            var plopPath = plop.renderString(config.path, answers);
            var plopfile = path.join(__dirname, plopPath, 'plopfile.js');
            var readmefile = path.join(plopPath, 'README.md');
            var usagefile = path.join(plopPath, 'USAGE.md');

            cfg.oldCwd = answers.config? answers.config.cwd : process.cwd();
            
            if (config.cwd) {
                if (!answers['config'])
                    answers.config = {};
                answers.config['cwd'] = cfg.cwd = path.resolve(plop.renderString(config.cwd, answers));
            }
    
    
            if (!fs.existsSync(plopfile)) {
                logError(`${path.resolve(plopfile)} not found`);
                reject(`${plopfile} not found`);
                process.exit(1);
            }

            var subPlop = nodePlop(plopfile, {
                    force: cfg.argv.force || cfg.argv.f
                });
            
            // Extend all loaded plops
            subPlop.load(path.join(__dirname, 'helpers.js'));
            subPlop.load(path.join(__dirname, 'plop-helpers.js'));
            subPlop.load(path.join(__dirname, 'ng-helpers.js'));

            if (fs.existsSync(usagefile)) {
                subPlop.setGenerator('help', {
                    description: 'Show help screen',
                    prompts: [], // array of inquirer prompts
                    actions: [{ 
                        type: "marked",
                        mdTemplateFile: usagefile
                    }]
                });
            }                    
            if (fs.existsSync(readmefile)) {
                console.log(marked(fs.readFileSync(readmefile, 'utf8')).trim());
            }

            const generators = subPlop.getGeneratorList();
            const generatorNames = generators.map(function (v) { return v.name; });

            // locate the generator name based on input and take the rest of the
            // user's input as prompt bypass data to be passed into the generator
            let generatorName = '';
            let bypassArr = [];

            const excludedAnswers = ['config'];
            let providedAnswers = Object.keys(answers)
                .filter( key => excludedAnswers.indexOf(key) == -1)
                .map( a => answers[a] );

            let purgedArgs = cfg.argv._;
            //console.log(purgedArgs, generatorNames, providedAnswers);
            if (purgedArgs.length && generatorNames.indexOf(purgedArgs[providedAnswers.length]) >= 0) {
                purgedArgs = purgedArgs.slice(providedAnswers.length);
                generatorName = purgedArgs.shift();
            } else {
                //console.log(purgedArgs, providedAnswers);
                providedAnswers.map( (ans, idx) => {
                    if (purgedArgs.length) {
                        if (purgedArgs.indexOf(ans) == 0 || purgedArgs[0]=='_') {
                            purgedArgs.shift();
                        }
                    }
                });    
            }
            //console.log(purgedArgs);
            cfg.argv._ = purgedArgs;

            generatorName = generatorName||config.defaultGenerator;
            // Remove help from generators list (the only 1 other will be the default generator)
            if (generatorNames.indexOf('help') >= 0) {
                generators.splice(generatorNames.indexOf('help'), 1);
            }

            // hmmmm, couldn't identify a generator in the user's input
            if (!generatorName && !generators.length) {
                // no generators?! there's clearly something wrong here
                logError('No generator found in plopfile');
                process.exit(1);
            } else if (!generatorName && generators.length === 1) {
                // only one generator in this plopfile... let's assume they
                // want to run that one!
                doThePlop(subPlop, generatorNames[0], answers, cfg)
                    .then(resolve).catch(reject);
                
            } else if (!generatorName && generators.length > 1) {
                // more than one generator? we'll have to ask the user which
                // one they want to run.
                chooseOptionFromList(generators, subPlop.getWelcomeMessage()).then(function (generatorName) {
                    doThePlop(subPlop, generatorName, answers, cfg)
                        .then(resolve).catch(reject);
                });
            } else if (generatorNames.indexOf(generatorName) >= 0) {
                // we have found the generator, run it!
                doThePlop(subPlop, generatorName, answers, cfg)
                    .then(resolve).catch(reject);
            } else {
                // we just can't make sense of your input... sorry :-(
                const fuzyGenName = (generatorName + ' ' + bypassArr.join(' ')).trim();
                logError('Could not find a generator for "' + fuzyGenName + '"');
                process.exit(1);
            }
        });
    });
};

function doThePlop(plop, generatorName, prevAnswers, config) {

    return new Promise((resolve, reject) => {
        let generator = plop.getGenerator(generatorName);
        let plopfile = path.join(plop.getPlopfilePath(), 'plopfile.js');
        let bypassArr = config.argv._;
        if (bypassArr.length && bypassArr[0] == generatorName)
            bypassArr.shift();
                
        let validationFailures = [];
        //console.log("Running", generatorName, bypassArr);

        if (bypassArr && generator.prompts && generator.prompts.length) {
            let alreadyAnswered = [];
            let answerKeys = Object.keys(prevAnswers);
            for (let prompt of generator.prompts) {
                if (answerKeys.indexOf(prompt.name) == -1) {
                    break;
                }
                alreadyAnswered.push(prevAnswers[prompt.name]);
            }
            bypassArr = [...alreadyAnswered, ...bypassArr];
            let bypassedPrompts = generator.prompts.slice(0, Math.min(generator.prompts.length, bypassArr.length));
            bypassedPrompts.map( (prompt, idx) => {
                if (bypassArr[idx] != '_' && prompt.validate && prompt.validate(bypassArr[idx]) !== true) {
                    logError('plop', prompt.validate(bypassArr[idx]), `Your input is "${bypassArr[idx]}"`);
                    validationFailures.push(prompt.validate(bypassArr[idx]));
                }
            });
        }
        if (validationFailures.length)
            reject(plopfile);

        if (!validationFailures.length)
        generator.runPrompts(bypassArr)
        .then( newAnswers => {            
            var a = Object.assign({}, prevAnswers, newAnswers);
            a.config = config;            
            return generator.runActions(a);
        })
        .then(function (result) {
            result.changes.forEach(function(line) {
                logSuccess(line.type, line.path);
            });
            result.failures.forEach(function (line) {
                const logs = [];
                if (line.type) { logs.push(line.type); }
                if (line.path) { logs.push(line.path); }

                const error = line.error || line.message;
                logs.push(error);

                logError.apply(logError, logs);
            });

            config.cwd = prevAnswers.config.cwd = config.oldCwd;
            process.chdir(config.cwd);

            if (result.failures.length)
                reject(plopfile);
            else resolve(plopfile);
        })
        .catch(function (err) {
            logError(plopfile, err.message);
            reject(err.message);
        });    
    });    
}            

function chooseOptionFromList(plopList, message) {
    const plop = nodePlop();
    const generator = plop.setGenerator('choose', {
        prompts: [{
            type: 'list',
            name: 'generator',
            message: message || defaultChoosingMessage,
            choices: plopList.map(function (p) {
                return {
                    name: p.name + chalk.gray(!!p.description ? ' - ' + p.description : ''),
                    value: p.name
                };
            })
        }]
    });
    return generator.runPrompts().then(results => results.generator);
}

function logSuccess(...arguments) {
    console.log([chalk.green('[SUCCESS]'), ...arguments].join(' '));
}
function logError(...arguments) {
    console.log([chalk.red('[FAILED]'), ...arguments].join(' '));
}