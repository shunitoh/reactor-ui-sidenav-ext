var path = require('path');

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: path.join(__dirname, './src/index.js'),
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.join(__dirname, './dist'),
    // 出力ファイル名
    filename: 'index.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/}
    ]
  },
  // ソースマップを有効にする
  devtool: 'source-map'
};
