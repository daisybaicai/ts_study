module.exports = {
  devtool: 'cheap-module-eval-source-map'
}
/*
 1. cheap会忽略文件的列信息，大部分情况我们调试并不关心列信息，而且就算 sourcemap 没有列，有些浏览器引擎（例如 v8） 也会给出列信息，
 所以我们使用 cheap 模式可以大幅提高 souremap 生成的效率。
 2. module 定位到我们的ts源码，而不是转义后的js
 3.使用 eval 方式可大幅提高持续构建效率，重编译
*/