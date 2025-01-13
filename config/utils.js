import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));

export const getPkgPath = (pkgName, isDist = false) => {
  if (isDist) return join(dir, '../dist/node_modules', pkgName);
  return join(dir, '../packages', pkgName);
};

export const getPkgJSON = (pkgName) => {
  const pkgJSONPath = `${getPkgPath(pkgName)}/package.json`;
  try {
    return JSON.parse(readFileSync(pkgJSONPath, 'utf-8'));
  } catch (error) {
    throw new Error(`${pkgName} package not found`);
  }
};

export const getProcessArgs = () => {
  const args = process.argv.slice(2);
  const result = {};
  args.forEach((arg) => {
    if (arg.includes('=')) {
      const [key, value] = arg.split('=');
      result[key] = value;
    } else {
      result[arg] = true;
    }
  });
  return {
    pkg: result.pkg,
    NODE_ENV: result.NODE_ENV
  };
};
