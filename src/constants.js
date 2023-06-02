export const LOGIN_STATUS = {
	PENDING: 'pending',
	NOT_LOGGED_IN: 'notLoggedIn',
	IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
	AUTH_MISSING: 'auth-missing',
	AUTH_INSUFFICIENT: 'auth-insufficient',
	REQUIRED_USERNAME: 'required-username',
	REQUIRED_TASK: 'required-task',
	TASK_MISSING: 'noSuchId', // Someone was inconsistent!
};

export const CLIENT = {
	NETWORK_ERROR: 'networkError',
	NO_SESSION: 'noSession',
	UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
	// The [] below uses the variable value as the key
	[CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
	// Here we use 'dog' to simulate a bad password
	[SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
	[SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
	[SERVER.REQUIRED_TASK]: 'Please enter the task to do',
	default: 'Something went wrong.  Please try again',
};

export const ACTIONS = {
	LOG_IN: 'logIn',
	LOG_OUT: 'logOut',
	START_LOADING_JOBS: 'startLoadingJobs',
	REPLACE_JOBS: 'replaceJobs',
	REPORT_ERROR: 'reportError',
	TOGGLE_JOB: 'toggleJob',
	DELETE_JOB: 'deleteJob',
	ADD_JOB: 'addJob',
};

export function handleError(err) {
	return MESSAGES[err.error] || MESSAGES.default;
}