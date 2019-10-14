/*
 * File: download.js
 * Desc: 下载模板操作
 * File Created: 2019-08-04 00:04:21
 * Author: chenghao
 * ------
 * Copyright 2019 - present, karakal
 */
const fs = require('fs-extra');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path');
const inquirer = require('inquirer');
const figlet = require('figlet');

/**
 * download pro
 * @param {*} projectName
 * @param {*} version
 * @param {*} template
 */
function download(projectName, version, template) {
    const exist = fs.existsSync(projectName);
    if (exist) {
        console.log(chalk.red('The project directory already exists.Please rename!'));
        process.exit(1);
    }
    makeDesc().then(answer => {
        downloadPro(projectName, answer, version, template);
    });
}
/**
 * download git pro
 * @param {*} projectName
 * @param {*} version
 * @param {*} template
 */
function downloadPro(projectName, answer, version, template) {
    const spinner = ora('Downloading react-admin...');
    spinner.start();
    // cli path
    const ownPath = path.dirname(require.resolve(path.join(__dirname, '..', 'package.json')));
    // create app path
    const appPath = path.resolve(projectName);
    // copy template to projectName path
    fs.copySync(path.join(ownPath, template || 'template-ts'), appPath);

    // change package.json
    const appPackage = require(path.join(appPath, 'package.json'));
    appPackage.name = projectName;
    appPackage.description = answer.desc;
    fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2));

    spinner.succeed(chalk.green('Download react-admin successfully!'));

    console.log();
    console.log(chalk.yellow('  Last Step: '));
    console.log('  cd ' + projectName);
    console.log('  yarn');
    console.log('  yarn start');

    console.log('╔═.' + chalk.red('♥') + '. ═════════════════════════════════════╗');
    console.log(
        chalk.hex('#07575B')(
            figlet.textSync('react-admin', {
                font: 'Slant',
            })
        )
    );
    console.log(' https://github.com/yezihaohao/react-admin');
    console.log(' happy coding~~~');
    console.log('╚══════.' + chalk.red('♥') + '. ════════════════════════════════╝');
    process.exit(1);
}

/**
 * make input questions
 */
function makeDesc() {
    return inquirer.prompt({
        type: 'input',
        name: 'desc',
        message: 'Please enter your project description：',
    });
}

export default download;
