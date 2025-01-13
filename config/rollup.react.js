import path from 'path';
import { defineConfig } from 'rollup';
import generatePackageJson from 'rollup-plugin-generate-package-json';

import { basePlugins } from './plugins.js';
import { getPkgJSON, getPkgPath } from './utils.js';

const pkg = 'react';
const pkgJSON = getPkgJSON(pkg);
const { module } = pkgJSON;
const pkgPath = getPkgPath(pkg);
const pkgDistPath = getPkgPath(pkg, true);

export default defineConfig([
  {
    input: path.join(pkgPath, module),
    output: {
      file: path.join(pkgDistPath, 'index.js'),
      format: 'esm'
    },
    plugins: [
      ...basePlugins(),
      generatePackageJson({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        baseContents: ({ name, description, version }) => {
          return {
            name,
            description,
            version,
            main: 'index.js',
            module: 'index.js'
          };
        }
      })
    ]
  },
  {
    input: path.join(pkgPath, 'src/jsx.ts'),
    output: [
      {
        file: path.join(pkgDistPath, 'jsx-runtime.js'),
        format: 'esm'
      },
      {
        file: path.join(pkgDistPath, 'jsx-dev-runtime.js'),
        format: 'esm'
      }
    ],
    plugins: basePlugins()
  }
]);
