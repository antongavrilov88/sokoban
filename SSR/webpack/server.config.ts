import path from 'path'
import {Configuration} from 'webpack'
import nodeExternals from 'webpack-node-externals'
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin'

import {IS_DEV, DIST_DIR, SRC_DIR} from './env'
import {fileLoader} from './loaders/file'
import {cssLoader} from './loaders/css'
import {jsLoader} from './loaders/js'
import {getCommonConfig} from './common.config'
import {merge} from 'webpack-merge'

export const config: Configuration = merge(getCommonConfig('server'), {
    target: 'node',
    node: {__dirname: false},
    entry: path.join(SRC_DIR, 'server'),
    module: {
        rules: [fileLoader.server, cssLoader.server, jsLoader.server],
    },
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: DIST_DIR
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})],
    },

    performance: {
        hints: IS_DEV ? false : 'warning',
    },

    externals: [nodeExternals({allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i]})],

    optimization: {nodeEnv: false}
})