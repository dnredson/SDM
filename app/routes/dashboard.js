module.exports = function(application){
	application.get('/dash', function(req, res){
		application.app.controllers.dashboard.dash(application, req, res);
	});
}
