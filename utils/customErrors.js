class BadInputDataError extends Error {
	constructor(message) {
		super(message);
		this.name = 'BadInputDataError'
	}
}

class DBConnectionError extends Error {
	constructor(message) {
		super(message);
		this.name = 'DBConnectionError'
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = 'NotFoundError'
	}
}

class InternalServerError extends Error {
	constructor(message) {
		super(message);
		this.name = 'InternalServerError'
	}
}
class UnauthorizedAccessError extends Error {
	constructor(message) {
		super(message);
		this.name = 'UnauthorizedAccessError'
	}
}

export {BadInputDataError, DBConnectionError, NotFoundError, InternalServerError, UnauthorizedAccessError};
