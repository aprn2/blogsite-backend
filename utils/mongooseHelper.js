function isBadDataError(err) {
	return(
		err.name === 'ValidationError' ||
		// from mongoose
		err.name === 'CastError' ||
		err.code === 11000
	);
}
export {isBadDataError};
