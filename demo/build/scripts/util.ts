///<reference path="../typings/index.d.ts"/>

import { resolve, normalize, basename, dirname, extname, posix } from 'path';
import * as merge from 'webpack-merge'
import config from '../config';
import html = require('html-webpack-plugin')
import glob = require('glob');
import ora = require('ora');
import fs = require('fs')
import path = require('path');

export const spinner = ora({
    text: '正在构建',
    spinner: {
        interval: 40,
        frames: ['⠋ ⠴', '⠙ ⠦', '⠹ ⠧', '⠼ ⠹', '⠴ ⠋', '⠦ ⠙', '⠧ ⠼']
    }
})

let utils = {
    isDev: process.env.NODE_ENV == 'development',
    root(dir: string, ...dirs) {
        return resolve(__dirname, '../../', dir, ...dirs)
    },
    /**
     * 根据glob 生成入口对象
     * @param globPath glob表达式，可以是确切路径
     * @param bool  默认为true 是否以匹配的文件名作为入口名，false的话会取其所在文件夹的命名
     */
    getEntryByGlob(globPath: string, bool = true) {
        let path = utils.root(normalize(globPath))
        let entries = {};
        let isGlob = glob.hasMagic(globPath);
        glob.sync(path).forEach(entry => {
            let dirs = dirname(entry).split('/');
            let leastdir = dirs[dirs.length - 1];
            let fileName = basename(entry);
            let ext = extname(entry)
            let name = fileName.replace(ext, '');
            if (!isGlob || bool) {
                entries[name] = entry;
            } else {
                entries[leastdir] = entry;
            }
        });
        return entries;
    },
    getTemplates(entry, config?: Function) {
        let templates = [];
        for (let i in entry) {
            let name = i;
            templates.push(
                new html(merge({
                    template: utils.root('src/template.html'),
                    inject: true,
                    minify: false,
                    cache: true,
                    chunks: [name, `runtimechunk~${name}`],
                    isDev: utils.isDev
                }, config(i) || {}))
            )
        }
        return templates
    },
    assetsPath(_path) {
        const assetsSubDirectory = config.subDirectory
        return posix.join(assetsSubDirectory, _path)
    },
    generateController(year, platform, name, entrance, dirpath) {
        let template = utils.getControllerTemplate(year, platform, name, entrance)
        dirpath = utils.root(dirpath);
        // 生成父级文件夹
        utils.mkdir(dirpath);
        dirpath += `/${name}.js`;
        //已经存在controller则不再生成，避免覆盖
        if (fs.existsSync(dirpath)) return
        // 不存在则生成
        fs.writeFile(dirpath, template, (err) => {
            if (err) {
                console.log(err);
                return err;
            }
        })
    },
    getControllerTemplate(year, platform, name, entrance) {
        let template = ''
        for (let n in entrance) {
            template +=
                `const dirname_${n} = '/${year}/${platform}/views/${name}/${n}.ejs';
`
        }
        template += 'module.exports = {'
        for (let n in entrance) {
            template +=
                `
${n}: async (ctx, next) => {
    ctx.body = await ctx.render(dirname_${n}, {
        cdn: ctx.state.cdn
    })
},`
        }
        template += `}`;
        return template
    },
    mkdir(dirpath, dirname?) {
        //判断是否是第一次调用  
        if (typeof dirname === "undefined") {
            if (fs.existsSync(dirpath)) {
                return;
            } else {
                utils.mkdir(dirpath, path.dirname(dirpath));
            }
        } else {
            //判断第二个参数是否正常，避免调用时传入错误参数  
            if (dirname !== path.dirname(dirpath)) {
                utils.mkdir(dirpath);
                return;
            }
            if (fs.existsSync(dirname)) {
                fs.mkdirSync(dirpath)
            } else {
                utils.mkdir(dirname, path.dirname(dirname));
                fs.mkdirSync(dirpath);
            }
        }
    }
}

export default utils;
