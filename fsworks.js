const vscode = require('vscode');
const fs = require('fs');


const filesList = function(){
    return letFindFiles("**/*.sol", "**/{node_modules,interfaces,mocks,solmate,*test*,*forge*}/**");
}


async function letFindFiles(searchFor, except) {
	const files = await vscode.workspace.findFiles(searchFor, except);
	let _uris = new Array();
	files.forEach(uri => {
		_uris.push(uri.path)
	});
	return _uris;
}

module.exports = {
    filesList
}