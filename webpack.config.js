const path = require('path');

module.exports = {
    entry: './src/Gamecontroller.js',
    output: {
    filename: 'Gamecontroller.js',
    path: path.resolve(__dirname, 'dist'),
    },
};