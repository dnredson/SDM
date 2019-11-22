
const mongoose = require('mongoose');
mongoose.connect("mongodb://52.67.251.146:27017/dashboard").then(
    ()=> console.log('connected to db')
).catch(
    (err)=> console.error(err)
);

var Schema = mongoose.Schema;
 var UserData = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	role: { type: String, required: true }
	},{collection:'users'});

	var UserData = mongoose.model('UserData',UserData);

module.exports.cadastro = function (application, req, res){
	res.render('cadastro', {validacao: {}, dadosForm: {}});
}


module.exports.users = function (application, req, res){

	
	UserData.find()  
 .then(function(doc) { 
	 console.log(doc);
	res.render('users',{users: {doc}});
 }); 

	
}

module.exports.cadastrar = function(application, req, res){
	
	var dadosForm = req.body;
	var user = new UserData ({
	name : dadosForm.name,
	username : dadosForm.username,
	password : dadosForm.password,
	role : dadosForm.role
	});
	
	
	req.assert('name', 'Nome não pode ser vazio').notEmpty();
	req.assert('username', 'Usuário não pode ser vazio').notEmpty();
	req.assert('password', 'Senha não pode ser vazio').notEmpty();
	req.assert('role', 'Casa não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}else{
		
		user.save(function(err, user) {
			if (err) {
				console.log(err);
				res.send(400, 'Bad Request');
			}
	
			res.redirect('/users');
		});
	}
}