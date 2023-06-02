const uuid = require('uuid').v4;

const sessions = {};

//sessions controls and updates
function addSession(username) {
	const sid = uuid();
	sessions[sid] = {
		username,
	};
	return sid;
}

function checkSession(sid) {
	if (sessions[sid]) {
		return getSessionUser(sid);
	}
	return '';
}

function getSessionUser(sid) {
	return sessions[sid]?.username;
}

function deleteSession(sid) {
	delete sessions[sid];
}

module.exports = {
	addSession,
	deleteSession,
	getSessionUser,
	checkSession,
};