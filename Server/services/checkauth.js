const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = function checkAuthenticated (req, res, next) {
	if (!req.header("Authorization")) {
		return res.status(401)
			.send({ message: 'Please make sure that you have authorization header'});
	}

	let token = req.header('Authorization').split(' ')[1];
	let payload = jwt.decode(token, 'secret');

	if (payload.exp <= moment().unix()) {
		return res.status(401)
			.send({ message: 'Token has expired'});
	}
  
	req.user = payload.sub;
	next();
};
