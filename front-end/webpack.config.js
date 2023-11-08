const path = require('path');

module.exports = {
  entry: './src/index.js', // O ponto de entrada do seu aplicativo
  output: {
    path: path.resolve(__dirname, 'dist'), // O diretório de saída para os arquivos bundle
    filename: 'bundle.js' // O nome do arquivo bundle
  }
};
