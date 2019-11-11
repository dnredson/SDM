module.exports.cadastro = function (application, req, res){
	res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){

	
	var dadosForm = req.body;
	if(dadosForm){
		console.log("Dados form");
	}else {
		console.log("Sem Dados form");
	}
	

	req.assert('name', 'Nome não pode ser vazio').notEmpty();
	req.assert('user', 'Usuário não pode ser vazio').notEmpty();
	req.assert('password', 'Senha não pode ser vazio').notEmpty();
	req.assert('role', 'Casa não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}

	var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.inserirUsuario(dadosForm);

}