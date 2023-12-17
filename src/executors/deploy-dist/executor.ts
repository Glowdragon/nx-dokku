import { DeployDistExecutorOptions } from "./schema"
import { execSync } from "child_process"

export default async function runExecutor(options: DeployDistExecutorOptions) {
  const host = options.host
  const app = options.app
  const path = options.path
  const dokkuBranch = options.dokkuBranch || "master"

  const newRepoBranch = "main"

  function executeCommand(command: string) {
    console.log(`Executing command: ${command} (in ${path})`)
    execSync(command, {
      stdio: "inherit",
      cwd: process.cwd() + "/" + path,
    })
  }

  executeCommand(`git init -b ${newRepoBranch}`)

  try {
    executeCommand(`git add *`)
  } catch (e) {
    console.warn("\x1b[33m%s\x1b[0m", "There is nothing to add. Did you forget to build?")
  }

  try {
    executeCommand(`git commit -m "deploy"`)
  } catch (e) {
    console.warn("\x1b[33m%s\x1b[0m", "There is nothing to commit. Did you forget to build?")
  }

  executeCommand(`git push dokku@${host}:${app} ${newRepoBranch}:${dokkuBranch} --force`)

  return { success: true }
}
