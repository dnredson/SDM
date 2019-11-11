module.exports = function(application){
	application.get('/matopiba', function(req, res){
		application.app.controllers.dashboard.matopiba(application, req, res);
	});
}