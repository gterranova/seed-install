// -----------------------------------------------------------
// version 1.00
// -----------------------------------------------------------
"use strict";

var debugging = false;

var fs = require('fs');
var cp = require('child_process');
var path = require('path');

var appPath = './src/app';
var assetsPath = './src/assets';
var fontsPath = './src/fonts';

var webAppPath = './{{ angular-folder }}/src/app';
var webAssetsPath = './{{ angular-folder }}/src/assets';
var webFontsPath = './{{ angular-folder }}/src/fonts';

var nativescriptAppPath = './{{ nativescript-folder }}/src/app/';
var nativescriptAssetsPath = './{{ nativescript-folder }}/src/assets/';
var nativescriptFontsPath = './{{ nativescript-folder }}/src/fonts/';

// Root SymLink Code for Windows
if (process.argv.length > 2) {
    if (process.argv[2] === 'symlink') {
        createRootSymLink();
        console.log("Created Symlink");
    }
    return 0;
}


// console.log("Installing NativeScript support files...");
// cp.execSync('npm install', {cwd: 'nativescript'});

console.log("Configuring...");

// remove previous symlinks if they exist
try {
    if (fs.existsSync(resolve(webAppPath))) {
        fs.unlinkSync(resolve(webAppPath));
    }
    if (fs.existsSync(resolve(webFontsPath))) {
        fs.unlinkSync(resolve(webFontsPath));
    }
    if (fs.existsSync(resolve(webAssetsPath))) {
        fs.unlinkSync(resolve(webAssetsPath));
    }
    if (fs.existsSync(resolve(nativescriptAppPath))) {
        fs.unlinkSync(resolve(nativescriptAppPath));
    }
    if (fs.existsSync(resolve(nativescriptFontsPath))) {
        fs.unlinkSync(resolve(nativescriptFontsPath));
    }
    if (fs.existsSync(resolve(nativescriptAssetsPath))) {
        fs.unlinkSync(resolve(nativescriptAssetsPath));
    }
} catch (err) {}

// We need to create a symlink
try {
    createSymLink();
} catch (err) {
    if (debugging) {
        console.log("Symlink error: ", err);
    }
    // Failed, and doesnt exist which means they weren't running root; so lets try to get root
    err.code === 'EEXIST' ? console.log("A symlink already exists.") : AttemptRootSymlink();
}

// Might silent fail on OSX, so we have to see if it exists
// if (!fs.existsSync(resolve(nativescriptComponentsPath))) {
//     AttemptRootSymlink();
// }

displayFinalHelp();

if (!fs.existsSync(resolve(webAppPath))) {
    console.log("We were unable to create a symlink  - from -");
    console.log("  ", resolve(appPath), "    - to - ");
    console.log("  ", resolve(webAppPath));
    console.log("If you don't create this symlink, you will have to manually copy the code each time you change it.");
}

if (!fs.existsSync(resolve(nativescriptAppPath))) {
    console.log("We were unable to create a symlink  - from -");
    console.log("  ", resolve(appPath), "    - to - ");
    console.log("  ", resolve(nativescriptAppPath));
    console.log("If you don't create this symlink, you will have to manually copy the code each time you change it.");
}

return 0;

/**
 * This will attempt to run the install script as root to make a symlink
 *
 */
function AttemptRootSymlink() {

    if (process.platform === 'win32') {
      var curPath = resolve("./");
      if (debugging) {
          console.log("RootSymlink Base path is", curPath);
      }
      cp.execSync("powershell -Command \"Start-Process 'node' -ArgumentList '"+curPath+"/install.js symlink' -verb runas\"");
    } else {
      console.log("To automatically create a SymLink between your web app and NativeScript, we need root for a second.");
      cp.execSync("sudo "+process.argv[0] + " " + process.argv[1] +" symlink");
    }
}

/**
 * Create the symlink when running as root
 */
function createRootSymLink() {
    var li1 = process.argv[1].lastIndexOf('\\'), li2 = process.argv[1].lastIndexOf('/');
    if (li2 > li1) { li1 = li2; }
    var AppPath = process.argv[1].substring(0,li1);
    var p1 = resolve(AppPath + "/" + nativescriptAppPath);
    var p2 = resolve(AppPath + "/" + webAppPath);
    if (debugging) {
        console.log("Path: ", p1, p2);
    }
    fs.symlinkSync(p2, p1, 'junction');
    fs.symlinkSync(resolve(AppPath + "/" + appPath), resolve(AppPath + "/" + webAppPath), 'junction');
    fs.symlinkSync(resolve(AppPath + "/" + fontsPath), resolve(AppPath + "/" + webFontsPath), 'junction');
    fs.symlinkSync(resolve(AppPath + "/" + assetsPath), resolve(AppPath + "/" + webAssetsPath), 'junction');

    fs.symlinkSync(resolve(AppPath + "/" + appPath), resolve(AppPath + "/" + nativescriptAppPath), 'junction');
    fs.symlinkSync(resolve(AppPath + "/" + fontsPath), resolve(AppPath + "/" + nativescriptFontsPath), 'junction');
    fs.symlinkSync(resolve(AppPath + "/" + assetsPath), resolve(AppPath + "/" + nativescriptAssetsPath), 'junction');
}

/**
 * Create Symlink
 */
function createSymLink() {
    if (debugging) {
        console.log("Attempting to Symlink", appPath, nativescriptAppPath);
    }
    fs.symlinkSync(resolve(appPath), resolve(webAppPath), 'junction');
    fs.symlinkSync(resolve(fontsPath), resolve(webFontsPath), 'junction');
    fs.symlinkSync(resolve(assetsPath), resolve(webAssetsPath), 'junction');

    fs.symlinkSync(resolve(appPath), resolve(nativescriptAppPath), 'junction');
    fs.symlinkSync(resolve(fontsPath), resolve(nativescriptFontsPath), 'junction');
    fs.symlinkSync(resolve(assetsPath), resolve(nativescriptAssetsPath), 'junction');
}

/**
 * Display final help screen!
 */
function displayFinalHelp()
{
    console.log("------------------------ Angular Seed Advanced is Now Ready ----------------------------");
    console.log("");
    console.log("Run your web app with:");
    console.log("  npm start");
    console.log("");
    console.log("Run your Mobile app via NativeScript with:");
    console.log("  iOS:     npm run start.ios");
    console.log("  Android: npm run start.android");
    console.log("");
    console.log("Run your Desktop app via Electron with:");
    console.log("  Mac:     npm run start.desktop");
    console.log("  Windows: npm run start.desktop.windows");
    console.log("");
    console.log("-----------------------------------------------------------------------------------------");
    console.log("");
}

function splitPath(v) {
    var x;
    if (v.indexOf('/') !== -1) {
        x = v.split('/');
    } else {
        x = v.split("\\");
    }
    return x;
}

function resolve(v) {
    var cwdPath = splitPath(process.argv[1]);
    // Kill the Script name
    cwdPath.length = cwdPath.length - 1;

    var resolvePath = splitPath(v);

    // Eliminate a trailing slash/backslash
    if (cwdPath[cwdPath.length-1] === "") { cwdPath.pop(); }

    if (v[0] === '/' || v[0] === "\\") { cwdPath = []; }
    for (var i=0;i<resolvePath.length;i++) {
        if (resolvePath[i] === '.' || resolvePath[i] === "") { continue; }
        if (resolvePath[i] === '..') { cwdPath.pop(); }
        else { cwdPath.push(resolvePath[i]); }
    }
    if (process.platform === 'win32') {
        var winResult = cwdPath.join("\\");
        if (winResult[winResult.length-1] === "\\") { winResult = winResult.substring(0, winResult.length - 1); }
        return winResult;
    } else {
        var result = cwdPath.join('/');
        if (result[0] !== '/') { result = '/' + result; }
        if (result[result.length-1] === '/') { result = result.substring(0, result.length - 1); }
        return result;
    }

}
