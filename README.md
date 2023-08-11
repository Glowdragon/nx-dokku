# Nx Dokku

Deploy your Nx projects to Dokku with ease using this plugin. With a simple configuration, you can deploy your application directly to your Dokku server via `nx deploy`

## 📦 Installation

For `npm` users:

```shell
npm install @glowdragon/nx-dokku --save-dev
```

For `yarn` users:

```shell
yarn add @glowdragon/nx-dokku --dev
```

## ⚒️ Executors

After installation, you'll need to configure the deploy executor in the project's `project.json`

The plugin provides two executors:

| Executor                           | Description                                                           |
|------------------------------------|-----------------------------------------------------------------------|
| `@glowdragon/nx-dokku:deploy-dist` | Deploy your pre-built application to Dokku                            |
| `@glowdragon/nx-dokku:deploy-src`  | Let Dokku build and serve the application after deploying the project |

### Recommendations

| Project Type | Recommended   | Note                                                                                                   |
|--------------|---------------|--------------------------------------------------------------------------------------------------------|
| JVM          | `deploy-src`  | Preferred for less configuration (no need for a Dockerfile)                                            |
| Node         | `deploy-dist` | You can enable `generatePackageJson` in the build options to produce a project-specific `package.json` |

## 🔧 Configuration of executor `deploy-dist`

Deploy your pre-built application by pushing the distributable directory to Dokku.
To achieve this without tracking build files in your main repository, a local repository will be generated within the distributable directory.

### Options

| Option        | Description                                      | Default  |
|---------------|--------------------------------------------------|----------|
| `host`        | The host of your Dokku server                    | None     |
| `app`         | The name of your Dokku application               | None     |
| `path`        | The path to the distributable directory          | None     |
| `dokkuBranch` | The deploy branch to push to on the Dokku server | `master` |

#### Example

```json
{
  "projects": {
    "your-nx-project": {
      "architect": {
        "build": {
          "builder": "your-builder:build",
          "options": {
            "outputPath": "dist/apps/your-nx-project",
            "main": "apps/your-nx-project/src/main.ts",
            "assets": ["apps/your-nx-project/src/Procfile"]
          }
        },
        "deploy": {
          "executor": "@glowdragon/nx-dokku:deploy-dist",
          "options": {
            "host": "your-dokku-host.com",
            "app": "your-dokku-app",
            "path": "dist/apps/your-nx-project"
          }
        }
      }
    }
  }
}
```

## 🔧 Configuration of executor `deploy-src`

Let Dokku build and serve the application after deploying the project source.

**Note:** It's not recommended to use this executor for JS/TS projects due to the absence of a `package.json` in the project directory. Should you find a simple solution, I would be grateful for your support.

### Options

| Option        | Description                                      | Default  |
|---------------|--------------------------------------------------|----------|
| `host`        | The host of your Dokku server                    | None     |
| `app`         | The name of your Dokku application               | None     |
| `localBranch` | The local branch to deploy                       | `main`   |
| `dokkuBranch` | The deploy branch to push to on the Dokku server | `master` |

#### Example

```json
{
  "projects": {
    "your-nx-project": {
      "architect": {
        "deploy": {
          "executor": "@glowdragon/nx-dokku:deploy-src",
          "options": {
            "host": "your-dokku-host.com",
            "app": "your-dokku-app",
            "localBranch": "main"
          }
        }
      }
    }
  }
}
```

### Dokku Configuration

When opting for the `deploy-src` executor, the build directory of the Dokku app should align with the path to the project directory. Configure the build directory by running the following command on the Dokku server:

```shell
dokku builder:set <dokkuAppName> build-dir apps/<nxProjectName>
```

## 🔐 Authentication

Ensure you've set up SSH key authentication with your Dokku host.

## 🚀 Usage

To deploy your Nx application to Dokku, navigate to the root directory of your Nx workspace and run:

```shell
nx deploy <nxProjectName>
```

To unleash the true potential of Nx, use `nx run affected -t deploy` in your CI/CD pipeline:

## 🤝 Support & Contributions

Encountered issues or have improvement suggestions? Please [raise an issue](https://github.com/Glowdragon/nx-dokku/issues/new).

Contributions are welcome! To help improve Nx Dokku, consider submitting a pull request.
