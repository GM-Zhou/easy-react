import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import esbuild from 'rollup-plugin-esbuild';
// import typescript from '@rollup/plugin-typescript';
import nodeExternals from 'rollup-plugin-node-externals';
/**
 * rollup base plugins
 * @param {Object} config
 * @param {import('@rollup/plugin-typescript').RollupTypescriptOptions} config.typescript
 * @param {import('@rollup/plugin-replace').RollupReplaceOptions} config.alias
 * @return {Array}
 */
export const basePlugins = (config = {}) => {
  const { alias = { __DEV__: true } } = config;
  return [replace(alias), nodeExternals(), resolve(), commonjs(), esbuild({ target: 'es6', minify: false })];
};
