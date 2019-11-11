/*importa crypto */
var crypto = require("crypto");

function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(connection){


	connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){

			usuario.password = crypto.createHash("md5").update(usuario.password).digest("hex");
			collection.insert(usuario);

			mongoclient.close();
		});
	});
}


UsuariosDAO.prototype.find = function(){

usuario="dener";
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){
		
			collection.find(usuario).toArray(function(err, result){
				
				console.log(usuario);
				console.log(result);
				console.log(err);
				if(result[0] != undefined){
					
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;
				
				}

				if(req.session.autorizado){
					res.redirect("jogo");
				} else {
					res.render("index", {validacao: {}});
				}

			}	);
			mongoclient.close();
		});
	}); 
}


UsuariosDAO.prototype.auth = function(usuario, req, res){

	
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){
			usuario.password = crypto.createHash("md5").update(usuario.password).digest("hex");
			collection.find(usuario).toArray(function(err, result){
				
				console.log(usuario);
				console.log(result);
				console.log(err);
				if(result[0] != undefined){
					
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;
				
				}

				if(req.session.autorizado){
					res.redirect("jogo");
				} else {
					res.render("index", {validacao: {}});
				}

			}	);
			mongoclient.close();
		});
	}); 
}



module.exports = function(){
	return UsuariosDAO;
}
