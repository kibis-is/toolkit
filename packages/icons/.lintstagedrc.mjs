import { resolve } from 'node:path';

export default (() => {
  const packageName = 'icons';

  return {
    '**/*.{js,json,ts}': (filenames) => [
      `sh -c 'pnpm -F @kibisis/${packageName} run generate:index && git add ${resolve(process.cwd(), 'packages', packageName, 'src', 'index.ts')}'`,
      `prettier --write ${filenames.join(' ')}`,
    ],
  };
})();
