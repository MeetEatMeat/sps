const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
// const fs = require('fs');

// const dbmain = function(){
// 	try {
// 		createTables()
// 	} catch (error) {
// 		console.log("dbmain error: ", error)
// 	}
// }

function createTables(){
	let result
    db.serialize(() => {
		
		// let sql = "CREATE TABLE contracts (name TEXT, type TEXT NOT NULL, baseContracts TEXT)";
		// // let res = db.exec(sql);
		// db.run(sql,[],function(result) {
		// 	console.log("created table Contracts: ", result);
		// });

		// sql = "CREATE TABLE functions (name TEXT, iscontructor BOOLEAN NOT NULL,  contracts_id INTEGER REFERENCES contracts)";
		// // res = db.exec(sql)
		// db.run(sql,[],function(result) {
		// 	console.log("created table Functions: ", result);
		// });

        // sql = "CREATE TABLE stateVars (name TEXT, contracts_id INTEGER REFERENCES contracts)";
		// // res = db.exec(sql);
		// db.run(sql,[],function(result) {
		// 	console.log("created table Statevars: ", result);
		// });

        // sql = "CREATE TABLE events (name TEXT, contracts_id INTEGER REFERENCES contracts)";
		// // res = db.exec(sql);
		// db.run(sql,[],function(result) {
		// 	console.log("created table Events: ", result);
		// });

        // sql = "CREATE TABLE modifiers (name TEXT, contracts_id INTEGER REFERENCES contracts)";
		// // res = db.exec(sql);
		// db.run(sql,[],function(result) {
		// 	console.log("created table Modifiers: ", result);
		// });

        // sql = "CREATE TABLE errors (name TEXT, contracts_id INTEGER REFERENCES contracts)";
		// // res = db.exec(sql);
		// db.run(sql,[],function(result) {
		// 	console.log("created table Errors: ", result);
		// });

		const sql = "\
		CREATE TABLE variable_visibility (\
    		id INT AUTO_INCREMENT PRIMARY KEY,\
    		visibility_name VARCHAR(255) NOT NULL\
		);\
		INSERT INTO variable_visibility (visibility_name) VALUES\
    		('public'),\
    		('internal'),\
    		('private');\
		CREATE TABLE function_visibility (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			visibility_name VARCHAR(255) NOT NULL\
		);\
		INSERT INTO function_visibility (visibility_name) VALUES\
			('public'),\
			('internal'),\
			('external'),\
			('view'),\
			('pure'),\
			('private');\
		CREATE TABLE mutability (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			mutability_name VARCHAR(255) NOT NULL\
		);\
		INSERT INTO mutability (mutability_name) VALUES\
    		('constant'),\
    		('immutable'),\
    		('mutable');\
		CREATE TABLE additiontypes (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			additiontype VARCHAR(255) NOT NULL\
		);\
		INSERT INTO additiontypes (additiontype) VALUES\
    		('event'),\
    		('error'),\
    		('modifier');\
		CREATE TABLE datatypes (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			datatype VARCHAR(255) NOT NULL,\
		);\
		INSERT INTO datatypes (datatype) VALUES\
			('int'),\
			('uint'),\
			('bytes'),\
			('string'),\
			('address payable'),\
			('address'),\
			('bool'),\
			('interface'),\
			('custom');\
		CREATE TABLE memorytypes (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			memorytype VARCHAR(255) NOT NULL\
		);\
		INSERT INTO memorytypes (memorytype) VALUES\
			('storage'),\
			('memory'),\
			('calldata');\
		CREATE TABLE contracts (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			name VARCHAR(255) NOT NULL,\
			type VARCHAR(255) NOT NULL,\
			inherit TEXT\
		);\
		CREATE TABLE functions (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			name VARCHAR(255) NOT NULL,\
			ispayable BOOLEAN NOT NULL,\
			isoverride BOOLEAN NOT NULL,\
			isvirtual BOOLEAN NOT NULL,\
			input TEXT,\
			output TEXT,\
			FOREIGN KEY (contracts_id) REFERENCES contracts (id),\
			FOREIGN KEY (function_visibility_id) REFERENCES function_visibility (id)\
		);\
		CREATE TABLE storageVariables (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			name VARCHAR(255) NOT NULL,\
			typedimension INT POSITIVE,\
			FOREIGN KEY (variable_visibility_id) REFERENCES variable_visibility (id),\
			FOREIGN KEY (mutability_id) REFERENCES mutability (id),\
			FOREIGN KEY (datatypes_id) REFERENCES datatypes (id),\
			FOREIGN KEY (memorytypes_id) REFERENCES memorytypes (id),\
			FOREIGN KEY (contracts_id) REFERENCES contracts (id)\
		);\
		CREATE TABLE additions (\
			id INT AUTO_INCREMENT PRIMARY KEY,\
			name VARCHAR(255) NOT NULL,\
			input TEXT,\
			FOREIGN KEY (contracts_id) REFERENCES contracts (id),\
			FOREIGN KEY (additiontypes_id) REFERENCES additiontypes (id)\
		);"
		db.run(sql,[],function(err) {
			if (err) {
				console.log("SQL Error: ", err)
				result = err
			}
			result = true
		});
	});
	return result
}



module.exports = {
	createTables
}