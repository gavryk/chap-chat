import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	const token = req.cookies?.access_token?.replace(/Bearer\s?/, '');
	if (token) {
		try {
			const decoded = jwt.verify(token, 'secret_id');
			req.userId = decoded._id;
			next();
		} catch (error) {
			console.log(err);
			return res.status(403).json({
				message: 'No Access!',
			});
		}
	} else {
		return res.status(403).json({
			message: 'No Access!',
		});
	}
};
