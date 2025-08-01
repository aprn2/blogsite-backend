import dotenv from 'dotenv';
dotenv.config();

function handleError(e, res) {
	console.log('name: ', e.name);
	console.log('message: ', e.message);
	console.log('code: ', e.code);
	if(process.env.ERROR_STACK) {
		console.log('stack', e.stack);
	}
	if(e.name === 'ValidationError' || e.name === 'BadInputDataError' || e.name === 'CastError' || e.code === 11000) {
		return res.status(400).json({message: 'bad data'});
	}
	if(e.name === 'NotFoundError') {
		return res.status(404).json({message: 'resource not found'});
	}
	if(e.name === 'UnauthorizedAccessError') {
		return res.status(401).json({message: 'unauthorised access'});
	}
	return res.status(500).json({message: 'internal server error'});
}

export default handleError;
