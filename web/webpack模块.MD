# webpack模块

## Nodejs模块
### 规范
>CommonJs

### 实现

```
Module.wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};

Module.wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];
```
> Node在解析模块时，将模块代码包装成一个函数

```
console.log(require.cache);
module.exports = 'test';

(function (exports, require, module, __filename, __dirname) {
    console.log(require.cache);
    module.exports = 'test';
});
```

## webpack模块
### 规范
>基本遵循CommonJs

```
function __webpack_require__(moduleId) {
    // 1.首先会检查模块缓存
    if(installedModules[moduleId]) {
        return installedModules[moduleId].exports;
    }
    
    // 2. 缓存不存在时，创建并缓存一个新的模块对象，类似Node中的new Module操作
    var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {},
        children: []
    };

    // 3. 执行模块，类似于Node中的：
    // result = compiledWrapper.call(this.exports, this.exports, require, this, filename, dirname);
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    module.l = true;

    // 4. 返回该module的输出
    return module.exports;
}
```

### 模块暂存

>前端环境无法像node端，同步等待文件模块的寻址、解析、编译和执行，需要异步获取模块，那么就必须在打包时，将模块暂存起来等待导入和缓存

- 当我们已经获取了模块内容后（但模块还未执行），我们就将其暂存在modules对象中，键就是webpack的moduleId；等到需要使用__webpack_require__引用模块时，发现缓存中没有，则从modules对象中取出暂存的模块并执行。

>一个module chunk
```
(window.webpackJsonp = window.webpackJsonp || [])
    .push([
        [0],
        {
            R8ub: function (o, n, s) {
                "use strict";
                s.r(n);
                console.log({ a: 1 })
            }
        },
        [
            ["R8ub", 1]
        ]
    ]);
```

- 第一个元素是一个数组，["0"]表示该js文件所包含的所有chunk的id（可以粗略理解为，webpack中module组成chunk，chunk又组成file）；
- 第二个元素是一个对象，键是各个模块的id，值则是一个被function包装后的模块；
- 第三个元素也是一个数组，其又是由多个数组组成。
