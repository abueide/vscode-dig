# VSCode Dig

VSCode Dig is an extension that allows you to easily run dig's program analysis (https://github.com/unsat/dig) on your project's source files.

## Features

`ctrl + alt + a`, `dig` command -> runs dig on the currently open source file

`digInstall` command -> pulls the latest dig docker image

## Requirements

You must have a working docker installation that vscode's shell can access. This means your user must be a part of the docker group, or you must be running vscode as administrator/root.

You can find instructions on how to install docker for your platform here: https://docs.docker.com/get-docker/

You can install the plugin from the VSCode Marketplace here: https://marketplace.visualstudio.com/items?itemName=abueide.digvscode

## Extension Settings

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

None

## Release Notes

### 1.0.0

Initial Release

### 1.0.2

Fixes filepath issues when running using powershell on windows
