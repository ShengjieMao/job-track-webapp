const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const jobs = require('./jobs');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	res.json({ username });
});

app.post('/api/session', (req, res) => {
	const { username } = req.body;

	if(!users.isValid(username) || !users) {
		res.status(400).json({ error: 'required-username' });
		return;
	}

	if(username === 'dog') {
		res.status(403).json({ error: 'auth-insufficient' });
		return;
	}

	const sid = sessions.addSession(username);
	const existingUserData = users.getUserData(username);

	if(!existingUserData) {
		users.addUserData(username, jobs.makeJobList());
	}

	res.cookie('sid', sid);
	res.json(users.getUserData(username).getJobs());
});

app.delete('/api/session', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';

	if(sid) {
		res.clearCookie('sid');
	}

	if(username) {
		// Delete the session, but not the user data
		sessions.deleteSession(sid);
	}

	res.json({ username });
});

// Jobs
app.get('/api/jobs', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	res.json(users.getUserData(username).getJobs());
});

app.post('/api/jobs', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	const { jobName, nextStepDue } = req.body;
	if(!jobName || !nextStepDue) {
		res.status(400).json({ error: 'required-info' });
		return;
	}
	const jobList = users.getUserData(username);
	const id = jobList.addJob(jobName, nextStepDue);
	res.json(jobList.getJob(id));
});

app.get('/api/jobs/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	const jobList = users.getUserData(username);
	const { id } = req.params;
	if(!jobList.contains(id)) {
		res.status(404).json({ error: `noSuchId`, message: `No job with id ${id}` });
		return;
	}
	res.json(jobList.getJob(id));
});

app.put('/api/jobs/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	const jobList = users.getUserData(username);
	const { id } = req.params;
	const { jobName, reject=false, nextStepDue, nextStep } = req.body;
	if(!jobName) {
		res.status(400).json({ error: 'required-job' });
		return;
	}
	if(!jobList.contains(id)) {
		res.status(404).json({ error: `noSuchId`, message: `No job with id ${id}` });
		return;
	}
	jobList.updateJob(id, { jobName, reject, nextStepDue, nextStep });
	res.json(jobList.getJob(id));
});

app.patch('/api/jobs/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	const { id } = req.params;
	const { jobName, reject, nextStepDue, nextStep } = req.body;
	const jobList = users.getUserData(username);
	if(!jobList.contains(id)) {
		res.status(404).json({ error: `noSuchId`, message: `No job with id ${id}` });
		return;
	}
	jobList.updateJob(id, { jobName, reject, nextStepDue, nextStep });
	res.json(jobList.getJob(id));
});

app.delete('/api/jobs/:id', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	const { id } = req.params;
	const jobList = users.getUserData(username);
	const exists = jobList.contains(id);
	if(exists) {
		jobList.deleteJob(id);
	}
	res.json({ message: exists ? `job ${id} deleted` : `job ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));