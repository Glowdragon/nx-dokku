# Nx Dokku

Deploy your Nx projects to Dokku with ease using this plugin. With a simple configuration, you can deploy your application directly to your Dokku server via `nx deploy`.

## Installation

To add the plugin to your Nx workspace, run:

```shell
npm install @glowdragon/nx-dokku --save-dev
```

or if you use **yarn**:

```shell
yarn add @glowdragon/nx-dokku --dev
```

## Configuration

After installation, you'll need to configure the deploy executor in the project's `project.json`.

| Option        | Description                                       | Default  |
|---------------|---------------------------------------------------|----------|
| `host`        | The host of your Dokku server.                    | None     |
| `app`         | The name of your Dokku application.               | None     |
| `localBranch` | The local branch to deploy.                       | `main`   |
| `dokkuBranch` | The deploy branch to push to on the Dokku server. | `master` |

### Example

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "deploy": {
          "executor": "@glowdragon/nx-dokku:deploy",
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

## Usage

To deploy your Nx application to Dokku, navigate to the root directory of your Nx workspace and run:

```shell
nx deploy <your-project-name>
```

This will push your project code to the configured Dokku host and deploy the application.

## Requirements

### Authentication

Ensure you've set up SSH key authentication with your Dokku host.

### Build directory

The build directory should align with the path to the project directory. Configure the build directory by running the following command on the Dokku server:

```shell
dokku builder:set build-dir apps/<your-project-name>
```

## Support & Contributions

Encountered issues or have improvement suggestions? Please [raise an issue](https://github.com/Glowdragon/nx-dokku/issues/new).

Contributions are welcome! To help improve Nx Dokku, consider submitting a pull request.
