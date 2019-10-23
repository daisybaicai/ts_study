const  { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}

// 每次成功构建之后，清空目录，之后为了避免缓存，会在文件后加入哈希，
// 多次构建之后，就会产生很多无用的文件，通过这个插件可以帮我们清空目录。