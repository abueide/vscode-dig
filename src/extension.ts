// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('hello world!!!')



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('com.abueide.digvscode.install', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		let currentFilePath: string = '';
		if (vscode.window.activeTextEditor !== undefined) {
			currentFilePath = vscode.window.activeTextEditor.document.fileName;
		}
		else {
			vscode.window.showErrorMessage('File not selected');
			return;
		}
		vscode.window.showInformationMessage(currentFilePath);

		// var spawn = require('child_process').spawn,
		// ls = spawn(`docker run -v ${currentFilePath}:${currentFilePath} -it abueide/dig:latest /bin/bash -c \'sage -python -O dig.py ${currentFilePath} -log 3\'`);
		var spawn = require('child_process').spawn,
			ls = spawn(`docker -version`);

		ls.stdout.on('data', function (data: { toString: () => string; }) {
			vscode.window.showInformationMessage('stdout: ' + data.toString());
		});

		ls.stderr.on('data', function (data: { toString: () => string; }) {
			vscode.window.showErrorMessage('stderr: ' + data.toString());
		});

		ls.on('exit', function (code: { toString: () => string; }) {
			vscode.window.showErrorMessage('child process exited with code ' + code.toString());
		});
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('com.abueide.digvscode.dig', () => {
		let currentFilePath: string = '';
		console.log('hello world!!!')
		if (vscode.window.activeTextEditor !== undefined) {
			currentFilePath = vscode.window.activeTextEditor.document.fileName;
		}
		else {
			vscode.window.showErrorMessage('File not selected');
			return;
		}

		let digOut = vscode.window.createOutputChannel("dig");
		digOut.appendLine(currentFilePath);

		// var spawn = require('child_process').spawn,
		// ls = spawn(``);
		const { spawn } = require('child_process');
		// const child = spawn('docker', [`run -v ${currentFilePath}:${currentFilePath} -it abueide/dig:latest /bin/bash -c \'sage -python -O dig.py ${currentFilePath} -log 3\'`]);
		// const child = spawn('docker', ['run', '-v', `${currentFilePath}:${currentFilePath}`, 'abueide/dig:latest', '/bin/bash', '-c', `\'sage -python -O dig.py ${currentFilePath} -log 3\'`]);
		const child = spawn('docker', ['run', '-v', `${currentFilePath}:${currentFilePath}`, 'abueide/dig:latest', '/bin/bash', '-c', `sage -python -O dig.py ${currentFilePath} -log 3`]);

		// use child.stdout.setEncoding('utf8'); if you want text chunks
		child.stdout.setEncoding('utf8');

		child.stderr.setEncoding('utf8');

		
		child.stdout.on('data', (chunk: string) => {
			// data from standard output is here as buffers
			digOut.append(chunk);
		});

child.stderr.on('data', (chunk: string) => {
			digOut.append(chunk);
		});

		

		child.on('close', (exitCode: string) => {
			digOut.appendLine(`child process exited with code ${exitCode}`);
		});

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
