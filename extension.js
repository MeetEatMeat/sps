const vscode = require('vscode');
const parser = require('@solidity-parser/parser');
const fs = require('fs');
const {filesList} = require('./fsworks')
const dbworks = require('./dbworks.js')

// let initSqlJs = require("./sql-wasm.js");
// let filebuffer = fs.readFileSync("/path/to/sample.sqlite");

// initSqlJs().then(function (SQL) {
//   // Create a new database with our existing sample.sqlite file
//   const db = new SQL.Database(filebuffer);
// });
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
// const db = new sqlite3.Database('./projectdb.sqlite');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	dbworks.createTables()

	console.log('Congratulations, your extension "sps" is now active!');
	
	let disposable = vscode.commands.registerCommand('sps.scrutinize', function () {
		const project = []
		fs.readdirSync

		vscode.workspace.workspaceFolders.map(folder => {
			console.log(folder.uri)
			project.push(folder.name)
		})

    	console.log(project.join(', '))
		
		const _files = []
		console.log("activate(), filesList length: ", filesList.length);
		// filesList.arguments(files => {
			// files.forEach(file => {
			// 	_files.push(file)
			// })

			// console.log("activate(), file: ", file);
			// let content

			// try {
			// 	content = fs.readFileSync(file).toString('utf-8')
			// } 
			// catch (e) {
			// 	if (e.code === 'EISDIR') {
			// 		console.error(`Skipping directory ${file}`)
			// 	} else throw e;
			// }
			
			// try {
				
			// 	// const ast = parser.parse(content, { loc: true, tolerant: true, range: true })
			// 	// const contractName = getContractName(ast)
			// 	// fillDBwithContracts(contractName);
			// 	// fillDBwithFunctions(ast, contractName);
				
			// 	// let drop = ["DROP TABLE IF EXISTS _compositeOrderLine", "DROP TABLE IF EXISTS _compositeOrder", "DROP TABLE IF EXISTS _deliveryAddress", "DROP TABLE IF EXISTS _orderLine", "DROP TABLE IF EXISTS _order", "DROP TABLE IF EXISTS _customer", "DROP TABLE IF EXISTS _user"]
			// 	// let createCustomer = ["CREATE TABLE _customer (id TEXT PRIMARY KEY, name TEXT, balance NUMERIC, regdate TEXT, isActive INTEGER, picture BLOB, document TEXT)"]
			// 	// let createUser = ["CREATE TABLE _user (id TEXT PRIMARY KEY, userId TEXT, password TEXT, email TEXT)"]
			// 	// let createOrder = ["CREATE TABLE _order (id TEXT PRIMARY KEY, orderNo TEXT, customerId TEXT  REFERENCES _customer)"]
				

			// 	// console.log(ast)
			// 	// ast.children[4].subNodes[4].body.statements[0].initialValue
			// 	// let globVarsTable = []
			// 	// let globVars = getGlobalVariables(ast);
			// 		// console.log("Found global vars: ", globVars)
			// 	// let isFound = checkGlobalVariablesSet(ast, globVars)
			// 	// console.log("Global vars found: ", isFound)
				
			// } catch (e) {
			// 	console.error(e)
			// }
		// }).then(function(){
		// 	_files.forEach(_file => {
		// 		console.log("File: ", _file)
		// 	})
		// }).finally(function(){
		// 	_files.forEach(_file => {
		// 		console.log("File: ", _file)
		// 	})
		// })
		


		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from SolidityProjectSecurity!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {
	// db.close();
}



// function fillDBwithContracts(name){
// 	const query = "SELECT rowid AS id, name FROM contracts WHERE name='"+ name +"'"
// 	db.serialize(() => {
				
// 		const stmt = db.prepare("INSERT INTO contracts VALUES (?)");
// 		stmt.run(name);
// 		stmt.finalize();
	
// 		db.each(query, (err, row) => {
// 			console.log("Contracts table log: ", row.id + ": " + row.name);
// 		});
// 		// db.each("SELECT * FROM contracts", (err, row) => {
// 		// 	console.log("Contracts table log: ", row.name);
// 		// });
// 	});
// }

// function fillDBwithFunctions(ast, contractName){
// 	const funcsArray = getFunctions(ast);
// 	const funcNames = []
// 	funcsArray.map(funcItem => {
// 		funcNames.push(funcItem)
// 		console.log("fillDBwithFunctions, funcItem: ", funcItem)
// 	})

// 	// const query = "SELECT rowid AS id, name FROM functions WHERE contract_id='" + contractName + "'"
// 	const query = "SELECT rowid AS id, name, contracts_id FROM functions WHERE contracts_id='" + contractName + "'"
// 	// const query = "SELECT rowid AS id, name, contracts_id FROM functions WHERE contracts_id='ERC20Token1'"
// 	console.log(query)
// 	db.serialize(() => {
				
// 		const stmt = db.prepare("INSERT INTO functions VALUES (?, ?)");

// 		funcsArray.forEach(func => {
// 			stmt.run(func, contractName);
// 		});

// 		stmt.finalize();

	
// 		db.each(query, (err, row) => {
// 			// console.log("Functions table log: ", row.id + ": " + row.name + ": " + row.contracts_id);
// 			console.log("Functions table log: ", row.id + ": " + row.name + ": " + row.contracts_id);
// 		});
// 	});
// }

function getFunctions(ast){
	const _funcs = []
	parser.visit(ast, {
		ContractDefinition(contract){
			contract.subNodes.map(node => {
				parser.visit(node, {
					FunctionDefinition(f){
						const fname = f.name
						if(!f.isConstructor){
							_funcs.push(fname);
						}
					}
				})
			})
		}
	})

	return _funcs
}



function getContractName(ast){
	let _name;
	parser.visit(ast, {
		ContractDefinition(contract){
			_name = contract.name;
		}
	})
	return _name;
}

function getGlobalVariables(ast){
	const result = [];
	parser.visit(ast, {
		StateVariableDeclaration(stVar){
			for(let v of stVar.variables){
				result.push(v.name);
			}
		}
	})
	return result;
}

function getConstructor(ast){
	let n;
	parser.visit(ast, {
		ContractDefinition(c){
			c.subNodes.map(node => {
				parser.visit(node, {
					FunctionDefinition(f){
						if(f.isConstructor){
							console.log("Constructor: ", node);
							n = node;
						}
					}
				})
			})
		}
	})
	return n;
}

function checkGlobalVariablesSet(ast, variablesList){
	let result;
	console.log("We inside checkGlobalVariablesSet")
	const constructor = getConstructor(ast)
	console.log("checkGlobalVariablesSet, constructor: ", constructor)
	parser.visit(constructor, {
		FunctionDefinition(f){
			console.log("We inside FunctionDefinition")
			f.body.statements.forEach(s => {
				console.log("Constructor statement: ", s.type)
				if(s.type === 'ExpressionStatement'){
					parser.visit(s, {
						ExpressionStatement(e){
							if(e.expression.type === 'BinaryOperation'){
								parser.visit(e.expression, {
									BinaryOperation(b){
										console.log("Binary operation", b)
										if(b.operator === '='){
											console.log("Binary operator === '='")
											parser.visit(b.left, {
												Identifier(id){
													console.log("b.left: ", id.name)
													if(variablesList.includes(id.name)){
														console.log("Constructor set s%", id.name);
														result = true;
													}
												}
											})
										}
									}
								})
							}
						}
					})
				}
			});
		}
	})
	if (result){
		return true;
	} else {
		return false;
	}
}

module.exports = {
	activate,
	deactivate
}
