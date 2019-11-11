module.exports = function(application){
	application.get('/guaspari', function(req, res){
		application.app.controllers.dashboard.guaspari(application, req, res);
	});
}