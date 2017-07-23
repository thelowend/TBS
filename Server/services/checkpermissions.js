module.exports = function checkAllowed (req, res, next) {
	//TODO Verificar usuario que tenga permisos sobre el request que viene.
	next();
};
