const fs = require("fs-extra");
const path = require("path");
const exec = require("child_process").exec;
const globby = require("globby");
const makeDir = require('make-dir');
const del = require('del');

const args = process.argv.slice(2);
const argv = require('minimist')(args);

const chalk = require('chalk');
const nodePlop = require('node-plop');
const out = require('plop/src/console-out');

var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

module.exports = function (plop, config) {

    plop.setDefaultInclude({ actionTypes: true });

    plop.setActionType('copy', function (answers, config, plop) {
        // do something
        return new Promise((resolve, reject) => {
            // move the current working directory to the plop file path
            // this allows this action to work even when the generator is
            // executed from inside a subdirectory
            process.chdir(plop.getPlopfilePath());
            if (!(config.src instanceof Array)) {
                config.src = [config.src];
            }
            try {
                let basePath = path.resolve(config.basePath ? 
                    plop.renderString(config.basePath, answers) :
                    '.');

                let dest = path.resolve(plop.renderString(config.dest, answers));
                let srcPaths = config.src.map( p => plop.renderString(p, answers));
                globby(srcPaths).then( files => {
                    files.forEach( src => {
                        //src = path.resolve(src);
                        //console.log(src);
                        if (!fs.existsSync(src) && config.skipNotExisting) {
                            console.log(`Skip ${src}`);
                        } else {
                            let destFile = path.join(dest, path.resolve(src).slice(basePath.length));
                            makeDir.sync(path.dirname(destFile));
                            //console.log("copy", src, destFile);
                            fs.copySync(src, destFile);    
                        }
                    });    
                    resolve(`${srcPaths.join(', ')} to ${dest}`)                
                });
            } catch(err) {
                return reject("COPY:"+err);
            }
        });
    });
    plop.setActionType('remove', function (answers, config, plop) {
        // do something
        return new Promise((resolve, reject) => {
            // move the current working directory to the plop file path
            // this allows this action to work even when the generator is
            // executed from inside a subdirectory
            //process.chdir(plop.getPlopfilePath());

            let basePath = path.resolve(config.basePath ?
                plop.renderString(config.basePath, answers) :
                '.');
            if (!fs.existsSync(basePath)) {
                return resolve(`${basePath} do not exists. Exiting`);
            }
            process.chdir(basePath);

            if (!(config.path instanceof Array)) {
                config.path = [config.path];
            }
            try {
                let srcPaths = config.path.map( p => path.join(basePath, plop.renderString(p, answers)))
                    .filter(p => fs.existsSync(p) || !config.skipNotExisting);
                if (srcPaths.length) {
                    console.log(`Deleting ${srcPaths.join(', ')} from ${basePath}`);
                    del.sync(srcPaths, { cwd: basePath });    
                }
                resolve(srcPaths.join(', '))
            } catch(err) {
                return reject(err);
            }
        });
    });

    plop.setActionType('tnsCreate', function (answers, config, plop) {
        return new Promise((resolve, reject) => {
            // npm prefix returns the closest parent directory to contain a package.json file
            let projectPath = plop.renderString(config.projectPath, answers);
            makeDir.sync(projectPath);
            process.chdir(projectPath);
            let folder = config.nativescriptFolder||'{{ nativescript-folder }}';
            let template = config.template||'{{ nativescript-template }}';
            let cmd = plop.renderString(`tns create ${folder} --template ${template}`, answers);
            var execProcess = exec(cmd, (err, stdout) => {
                if (err) {
                    return reject(err);
                }
                resolve(cmd);
            });
            execProcess.stdout.pipe(process.stdout);
        });
    });
    plop.setActionType('ngCreate', function (answers, config, plop) {
        return new Promise((resolve, reject) => {
            var cwd = plop.renderString(answers.config.cwd, answers);
            makeDir.sync(cwd);
            let projectPath = plop.renderString(config.projectPath, answers);

            let folder = config.angularFolder||'{{ angular-folder }}';
            let version = config.angularVersion||'{{ angular-version }}';
            let cmd = plop.renderString(`ng new ${folder} ${version}`, answers);
            var execProcess = exec(cmd, { cwd: cwd}, (err, stdout) => {
                if (err) {
                    return reject(err);
                }
                resolve(cmd);
            });
            execProcess.stdout.pipe(process.stdout);
        });
    });
    plop.setActionType('mergePackages', function (answers, config, plop) {
        return new Promise((resolve, reject) => {
            getAppRootFolder(plop.renderString(config.path, answers)).then( pkgPath => {
                var merge = require('./merge');
                var packageJsonPath = path.join(pkgPath, 'package.json');
                //console.log(packageJsonPath);
                var content = fs.readFileSync(packageJsonPath);
                
                process.chdir(plop.getPlopfilePath());
                let basePath = plop.renderString(config.basePath||'', answers);

                var updatedContent = config.sources.reduce( (acc, curr) => { 
                    curr = path.resolve(path.join(basePath, curr));
                    return merge(acc, fs.readFileSync(curr))
                }, content);

                fs.writeFile(packageJsonPath, updatedContent, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(config.sources.join(', '));
                });
            }).catch(err => {
                reject(err)
            });
        });
    });

    plop.setActionType('exec', function (answers, config, plop) {
        return new Promise((resolve, reject) => {
            // npm prefix returns the closest parent directory to contain a package.json file
            if (config.cwd)
                process.chdir(plop.renderString(config.cwd, answers));
            
            var cmd = plop.renderString(config.command, answers);
            var execProcess = exec(cmd, (err, stdout) => {
                if (err) {
                    return reject(err);
                }

                resolve(cmd);
            });
            execProcess.stdout.pipe(process.stdout);
        });
    });
};

function getAppRootFolder(path) {
    return new Promise((resolve, reject) => {
        // npm prefix returns the closest parent directory to contain a package.json file
        exec(`cd ${path} && npm prefix`, (err, stdout) => {
            if (err) {
                return reject(err);
            }

            resolve(stdout.toString().trim());
        });
    });
}
