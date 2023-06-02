const uuid = require('uuid').v4;

function makeJobList() {
	const id1 = uuid();
	const id2 = uuid();

	const jobList = {};
	const jobs = {
		[id1]: {
			id: id1,
			jobName: 'Amazon - SDE intern',
			reject: false,
			nextStepDue: '2023-08-01',
			nextStep: 'Online assessment',
		},
		[id2]: {
			id: id2,
			jobName: 'Apple - ML co-op',
			reject: true,
			nextStepDue: '2023-04-30',
			nextStep: 'Not consider',
		},
	};

	jobList.contains = function contains(id) {
		return !!jobs[id];
	};

	jobList.getJobs = function getJobs() {
		return jobs;
	};

	jobList.addJob = function addJob(jobName, nextStepDue, nextStep) {
		const id = uuid();
		jobs[id] = {
			id,
			jobName,
			reject: false,
			nextStepDue,
			nextStep,
		};
		return id;
	};

	jobList.getJob = function getJob(id) {
		return jobs[id];
	};

	jobList.updateJob = function updateJob(id, job) {
		jobs[id].reject = job.reject ?? jobs[id].reject;
		jobs[id].jobName = job.jobName || jobs[id].jobName;
		jobs[id].nextStepDue = job.nextStepDue || jobs[id].nextStepDue;
		jobs[id].nextStep = job.nextStep || jobs[id].nextStep;
	};


	jobList.deleteJob = function deleteJob(id) {
		delete jobs[id];
	};

	sortDate(jobs, 'nextStepDue');

	return jobList;
}

function sortDate(date,p) {
	for (let i = 0; i < date.length - 1; i++) {
		for (let j = 0; j < date.length - 1; j++) {
			console.log(Date.parse(date[j][p]));
			if (Date.parse(date[j][p]) > Date.parse(date[j+1][p])) {
				let temp = date[j];
				date[j] = date[j+1];
				date[j+1] = temp;
			}
		}
	}
}

module.exports = {
	makeJobList,
};