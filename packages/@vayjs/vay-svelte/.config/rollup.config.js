/** @format */

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import external from 'rollup-plugin-peer-deps-external';
import svelte from 'rollup-plugin-svelte';
import pkg from '../package.json' with { type: 'json' };

const bundle = (config) => ({ input: './src/index.ts', external: (id) => !/^[./]/.test(id), ...config });

export default [
    bundle({
        plugins: [external(), commonjs(), svelte(), resolve(), esbuild(), cleanup({ extensions: ['ts'] })],
        output: [
            { file: pkg.main, format: 'cjs', sourcemap: true },
            { file: pkg.module, format: 'es', sourcemap: true },
        ],
    }),
    bundle({
        output: { file: pkg.types, format: 'es' },
        plugins: [external(), resolve(), commonjs(), cleanup({ extensions: ['.ts'] }), dts()],
    }),
];
