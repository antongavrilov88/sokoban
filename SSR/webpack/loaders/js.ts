export const jsLoader = {
    client: {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'}
    },
    server: {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, /webWorkers/],
        use: {loader: 'babel-loader'}
    }
}
