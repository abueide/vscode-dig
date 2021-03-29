// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let digOut = vscode.window.createOutputChannel("dig");

	let disposable = vscode.commands.registerCommand('com.abueide.digvscode.digInstall', () => {
		digOut.show();
		const { spawn } = require('child_process');
		const child = spawn('docker', ['pull', 'unsatx/dig:latest']);

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

	disposable = vscode.commands.registerCommand('com.abueide.digvscode.dig', () => {
		digOut.show();
		let currentFilePath: string = '';
		if (vscode.window.activeTextEditor !== undefined) {
			currentFilePath = vscode.window.activeTextEditor.document.fileName;
		}
		else {
			vscode.window.showErrorMessage('File not selected');
			return;
		}

		digOut.appendLine(currentFilePath);

		const { spawn } = require('child_process');
		const child = spawn('docker', ['run', '-v', `${currentFilePath}:${currentFilePath}`, 'unsatx/dig:latest', '/bin/bash', '-c', `sage -python -O dig.py ${currentFilePath} -log 3`]);

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
