import { DeployExecutorOptions } from './schema';
import { execSync } from 'child_process';

export default async function runExecutor(options: DeployExecutorOptions) {
  const host = options.host;
  const app = options.app;
  const localBranch = options.localBranch || 'main';
  const dokkuBranch = options.dokkuBranch || 'master';

  const command = `git push dokku@${host}:${app} ${localBranch}:${dokkuBranch} --force`;
  console.log('Executing command: ' + command);
  execSync(command, { stdio: 'inherit' });

  return { success: true };
}
