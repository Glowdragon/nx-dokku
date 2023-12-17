import { DeployExecutorOptions } from "./schema"

export default async function runExecutor(options: DeployExecutorOptions) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "The executor has been renamed from 'deploy' to 'deploy-src'. Please use the new name.\n" +
      "If you encounter problems with JS/TS projects, consider checking 'deploy-dist'."
  )
  return { success: false }
}
