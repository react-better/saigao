/*
 * File: main.js
 * Desc: 描述
 * File Created: 2019-08-02 13:45:13
 * Author: chenghao at <hao.cheng@karakal.com.cn>
 * ------
 * Copyright 2019 - present, karakal
 */
import downloadPro from './download';
const fs = require('fs-extra');
const commander = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const pk = require('../package.json');
require('babel-polyfill');

let projectName;
const program = new commander.Command(pk.name)
    .allowUnknownOption()
    .description('init react-admin project')
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action((name) => {
        projectName = name;
    })
    .version(pk.version)
    .option('--js', 'download js template')
    .option('--tiny', 'download tiny template')
    .on('--help', function () {
        console.log('');
        example();
    })
    .parse(process.argv);

if (typeof projectName === 'undefined') {
    console.log(chalk.red('Please specify the project directory:'));
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
    console.log();
    example();
    console.log(`Run ${chalk.cyan(`${pk.name} --help`)} to see all options.`);
    process.exit(1);
}

checkExist().then(() => {
    downloadPro(projectName, pk.version, chooseTemplate(program));
});

function chooseTemplate(program) {
    const temps = {
        js: 'template',
        tiny: 'template-tiny',
    };
    const keys = Object.keys(temps);
    let template = null;
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (program[key]) {
            template = temps[key];
            break;
        }
    }
    return template;
}

function example() {
    console.log('For example:');
    console.log(`  ${chalk.cyan(pk.name)} ${chalk.green('my-react-admin')}`);
    console.log();
}

async function checkExist() {
    const exist = fs.existsSync(projectName);
    if (exist) {
        const prompt = inquirer.prompt([
            {
                type: 'confirm',
                name: 'inject',
                message: 'The project directory already exists.Do you want to inject?',
            },
        ]);
        const answer = await prompt;
        // console.log(answer);
        if (!answer.inject) {
            console.log(chalk.red('The project directory already exists.Please rename!'));
            process.exit(1);
        }
    }
    return true;
}
