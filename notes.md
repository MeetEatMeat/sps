// parser.visit(ast, {
				// 	ContractDefinition(contract){
						// const name = contract.name;
						// let bases = contract.baseContracts.map(spec => {
						// 	return spec.baseName.namePath;
						// }).join(', ');

						// console.log("Contract name: ", name)
						// console.log("Contract %s is has base contract: %s", name, bases)
						// console.log("Contract %s is containing subNodes: %s", name, contract.subNodes.values.toString())
						// console.log("Contract %s is kind: %s", name, contract.kind)
						// console.log("Contract %s has type: %s", name, contract.type)
						// if(contract.name === 'ERC20Token'){
						// 	console.log("ERC20Token contract found")
						// 	parser.visit(contract, {

						// 		FunctionDefinition(_func){
						// 			if(_func.name === 'mint'){
						// 				console.log("mint function found")
						// 				for(let s of _func.body.statements){
						// 					console.log("Statement: ", s)
						// 					if(s.type === 'VariableDeclarationStatement'){
						// 						parser.visit(s,{

						// 							VariableDeclaration(v){

						// 								console.log('Contract %s, function %s, variable %s', contract.name, _func.name, v.name)
						// 							}
						// 						})
						// 					}
						// 					if(s.type === 'ExpressionStatement'){
						// 						parser.visit(s,{

						// 							ExpressionStatement(e){

						// 								console.log("Statement type: ", e.type)
						// 								console.log("Expression: ", e.expression)

						// 								parser.visit(e.expression, {
						// 									FunctionCall(fc){
						// 										console.log("Function call visited")
						// 										console.log("Function call type: ", fc.type)
						// 										console.log("FC Expression type: ", fc.expression.type)

						// 										parser.visit(fc.expression, {

						// 											Identifier(I){
						// 												console.log("Identifire name: ", I.name)
						// 											}
						// 										})
						// 									}
						// 								})
						// 							}
						// 						})
						// 					}
											
						// 				}
						// 			}
						// 		}
						// 	})
						// }
					// },
				// })