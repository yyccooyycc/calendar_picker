const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', 
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js', 
    clean: true, 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], 
          },
        },
      },
      {
        test: /\.(scss|css)$/, 
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader', 
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, 
        type: 'asset/resource', 
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', 
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), 
    },
    compress: true, 
    port: 3000, 
    hot: true, 
    open: true, 
  },
};

