import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';

export default [
    {
        input: 'src/imid.ts',
        output: {
            file: 'dist/imid.js',
            name: 'setImid',
            format: 'iife',
        },
        plugins: [
            typescript(),
        ],
    },
    {
        input: 'src/imid.ts',
        output: {
            file: 'dist/imid.min.js',
            name: 'setImid',
            format: 'iife',
        },
        plugins: [
            typescript(),
            terser(),
        ]
    },
];