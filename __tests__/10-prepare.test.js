import path from 'path';
import { getEntryPointPath } from './helpers/utils.js';

test('entry point', async () => {
  const codePath = path.join(__dirname, '..', 'code');
  const entryPointPath = await getEntryPointPath(codePath);

  const entryPointModule = await import(entryPointPath);
  expect(typeof entryPointModule.default).toEqual('function');
});
