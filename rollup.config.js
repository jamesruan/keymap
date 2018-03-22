import babel from 'rollup-plugin-babel';

export default {
    input: 'main.js',
    output: {
        file: 'main.esm.js',
        format: 'es',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
    ],
}
