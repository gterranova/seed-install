const path = require('path');
const fs = require('fs');
const moduleEditor = require('ng-module-editor');

const moduleWildcards = ['*.module.ts', '*.module.tns.ts', '!*-routing.module.*', '!material.module.*']

module.exports = function (plop, config) {

    plop.setDefaultInclude({ actionTypes: true });

    plop.setActionType('addImport', function (answers, config, plop) {
        return addNgModuleMetadata('imports', answers, config, plop)
    });

    plop.setActionType('addDeclaration', function (answers, config, plop) {
        return addNgModuleMetadata('declarations', answers, config, plop)
    });

    plop.setActionType('addExport', function (answers, config, plop) {
        return addNgModuleMetadata('exports', answers, config, plop)
    });

    plop.setActionType('addProvider', function (answers, config, plop) {
        return addNgModuleMetadata('providers', answers, config, plop)
    });

    plop.setActionType('addEntryComponent', function (answers, config, plop) {
        return addNgModuleMetadata('entryComponents', answers, config, plop)
    });
}

function addNgModuleMetadata(metadataField, answers, config, plop) {
    return new Promise((resolve, reject) => {
        // npm prefix returns the closest parent directory to contain a package.json file
        let symbolName = plop.renderString(config.symbolName, answers);
        let importPath = plop.renderString(config.importPath, answers);
        let wildcards = config.moduleWildcards||moduleWildcards;
        if (config.ngModulePaths) {
            if (!Array.isArray(config.ngModulePaths)) {
                config.ngModulePaths = [config.ngModulePaths];
            }
        } else {
            config.ngModulePaths = [path.dirname(importPath)];
        }
        let existingModules = [];
        for (let m of config.ngModulePaths) {
            m = path.resolve(plop.renderString(m, answers));
            console.log(m, fs.statSync(m).isFile());
            try {
                if (!fs.lstatSync(m).isFile()) {
                    existingModules = [...existingModules, ...moduleEditor.findModules(m, wildcards)]
                } else {
                    existingModules.push(m);
                }    
            } catch(err) { console.log(err); }
        }
        if (existingModules.length == 0) {
            resolve('No modules found.');
        } else {
            try {
                existingModules.map( m => {
                    moduleEditor.addSymbolToNgModule( 
                        plop.renderString(m, answers),
                        metadataField, 
                        symbolName, importPath); 
                });
            } catch (err) {
                return reject(err);
            }
            resolve(existingModules.join(', '));    
        }
    });
}
