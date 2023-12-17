<h1 align="center">Nx Dokku</h1>

Deploy your Nx projects to Dokku with ease using this plugin. With a simple configuration, you can deploy your application directly to your Dokku server via `nx deploy`

## Contents

- 📦 [Installation](#-installation)
- 🚀 [Usage](#-usage)
- 🛠️ [Troubleshooting](#%EF%B8%8F-troubleshooting)
- 🤝 [Support](#-support)

## 📦 Installation

### Prerequisites

Make sure you have the following:

- An existing Nx workspace
- A buildable project set up within this workspace

### Step 1: Install the plugin

NPM:

```shell
npm install nx-dokku --save-dev
```

Yarn:

```shell
yarn add nx-dokku --dev
```

### Step 2: Choose an executor

Add a new target called `deploy` in your project's `project.json` file and configure one of the following executors:

|               | Executor      | Description                                 |
|---------------|---------------|---------------------------------------------|
| a             | `deploy-dist` | Deploy your pre-built application to Dokku  |
| b             | `deploy-src`  | Let Dokku build and deploy your application |

### Step 3a: Configure executor `deploy-dist`

Deploy your pre-built application by pushing the distributable directory to Dokku.
To achieve this without tracking build files in your main repository, a local repository will be generated within the distributable directory.

#### Options

| Option        | Description                                      | Default  |
|---------------|--------------------------------------------------|----------|
| `host`        | The host of your Dokku server                    | None     |
| `app`         | The name of your Dokku application               | None     |
| `path`        | The path to the distributable directory          | None     |
| `dokkuBranch` | The deploy branch to push to on the Dokku server | `master` |

<details>
<summary>Example</summary>

```json
{
  "deploy": {
    "executor": "nx-dokku:deploy-dist",
    "options": {
      "host": "server.example.com",
      "app": "my-dokku-app",
      "path": "dist/apps/my-app"
    }
  }
}
```

</details>

### Step 3b: Configure executor `deploy-src`

Let Dokku build and serve the application after deploying the project source.

**Note:** It's not recommended to use this executor for JS/TS projects due to the absence of a `package.json` in the project directory.

#### Options

| Option        | Description                                      | Default  |
|---------------|--------------------------------------------------|----------|
| `host`        | The host of your Dokku server                    | None     |
| `app`         | The name of your Dokku application               | None     |
| `localBranch` | The local branch to deploy                       | `main`   |
| `dokkuBranch` | The deploy branch to push to on the Dokku server | `master` |

<details>
<summary>Example</summary>

```json
{
  "deploy": {
    "executor": "nx-dokku:deploy-src",
    "options": {
      "host": "server.example.com",
      "app": "my-dokku-app",
      "localBranch": "main"
    }
  }
}
```

</details>

#### Dokku Configuration

When opting for the `deploy-src` executor, the build directory of the Dokku app should align with the path to the project directory. Configure the build directory by running the following command on the Dokku server:

```shell
dokku builder:set my-dokku-app build-dir apps/my-app
```

## 🚀 Usage

To deploy your application, run:

```shell
nx deploy my-app
```

⭐ **Tip**: To unleash the true potential of Nx, use `nx run affected -t deploy` in your CI/CD pipeline.

## 🛠️ Troubleshooting

### Host key verification failed

Ensure you've set up SSH key authentication with your Dokku host. Read more about it [here](https://dokku.com/docs/deployment/user-management/#ssh-keys).

## 🤝 Support

Encountered an issue or have suggestions for improvements?
Feel free to [raise an issue](https://github.com/danielkreitsch/nx-dokku/issues/new).

Contributions are welcome!
