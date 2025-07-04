import chalk from 'chalk';
import { readdirSync, type Stats, statSync, writeFileSync } from 'node:fs';
import { join, parse, type ParsedPath } from 'node:path';
import * as process from 'node:process';

/**
 * Script that creates the index.ts file in the `src/` directory.
 */
function main(): void {
  const exports = [
    '// exports will be generated automatically using: pnpm run generate:index',
    `export { default as defaultTheme } from './theme';`,
  ];
  const srcDir = 'src';
  let dir: ParsedPath;
  let indexFilePath: string;
  let stat: Stats;

  // get utils
  for (const item of readdirSync(srcDir)) {
    stat = statSync(join(srcDir, item));

    // if it is not a directory, move on
    if (!stat.isDirectory()) {
      continue;
    }

    dir = parse(item);

    exports.push(`export * from './${dir.name}';`);
  }

  indexFilePath = join(srcDir, 'index.ts');

  // write to index file
  writeFileSync(indexFilePath, `${exports.join('\n')}\n`, 'utf-8');

  console.log(`${chalk.yellow('[INFO]')}: generated indexes to "./src/index.ts"`);

  process.exit(0);
}

main();
