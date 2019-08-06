import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser'

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/main.js',
        output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**', // only transpile our source code
            }),
        ],
    },
    // UMD Production
    {
        input: 'src/main.js',
        output: {
            file: pkg.pro,
            format: 'umd',
            indent: false,
        },
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**',
            }),
            terser({
                compress: {
                    pure_getters: true,
                    warnings: false,
                },
            }),
        ],
    },
];
