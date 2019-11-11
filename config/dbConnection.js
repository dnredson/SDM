/* importar o mongodb */
var mongo = require('mongodb');

var connMongoDB = function(){
	console.log('Entrou na função de conexão');
	var db = new mongo.Db(
		'users',
		new mongo.Server(
			'18.231.198.85', //string contendo o endereço do servidor
			27017, //porta de conexão
			{}
		),
		{}
	);

	return db;
}

module.exports = function(){
	return connMongoDB;
}