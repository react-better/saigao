/*
 * File: main.js
 * Desc: 描述
 * File Created: 2019-08-02 13:45:13
 * Author: chenghao at <hao.cheng@karakal.com.cn>
 * ------
 * Copyright 2019 - present, karakal
 */
import downloadPro from './download';
const commander = require('commander');
const chalk = require('chalk');
const pk = require('../package.json');

let projectName;
const program = new commander.Command(pk.name)
    .allowUnknownOption()
    .description('init react-admin project')
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
        projectName = name;
    })
    .version(pk.version)
    .on('--help', function() {
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

downloadPro(projectName, pk.version);

function example() {
    console.log('For example:');
    console.log(`  ${chalk.cyan(pk.name)} ${chalk.green('my-react-admin')}`);
    console.log();
}
