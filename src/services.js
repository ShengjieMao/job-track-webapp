export function fetchLogin(username) {
	return fetch('/api/session', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json'
		}),
		body: JSON.stringify({ username }),
	})
		.catch( () => Promise.reject({ error: 'networkError' }) )
		.then( response => {
			if (response.ok) {
				return response.json();
			}
			return response.json()
				.then( err => Promise.reject(err) );
		});
}

export function fetchLogout() {
	return fetch('/api/session', {
		method: 'DELETE',
	})
		.catch( () => Promise.reject({ error: 'network-error' }) )
		.then( response => {
			if (response.ok) {
				return response.json();
			}
			return response.json()
				.then( err => Promise.reject(err) );
		});
}

export function fetchSession() {
	return fetch('/api/session', {
		method: 'GET',
	})
		.catch( () => Promise.reject({ error: 'network-error' }) )
		.then( response => {
			if (response.ok) {
				return response.json();
			}
			return response.json()
				.then( err => Promise.reject(err) );
		});
}

export function fetchJobs(applicant) {
	if (applicant) {
		return fetch(`/api/jobs/${applicant}`, {
			method: 'GET',
		})
			.catch( () => Promise.reject({ error: 'network-error' }))
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				return response.json()
					.then((err) => Promise.reject(err));
			});
	}
	else {
		return fetch('/api/jobs', {
			method: 'GET',
		})
			.catch((err) => Promise.reject({ error: 'network-error' }))
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				return response.json()
					.then((err) => Promise.reject(err));
			});
	}
}

export function fetchAddJob(jobName, nextStepDue, nextStep) {
	return fetch('/api/jobs', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify( { jobName, nextStepDue, nextStep } ),
	})
		.catch( () => Promise.reject({ error: 'networkError' }) )
		.then( response => {
			if (response.ok) {
				return response.json();
			}
			return response.json()
				.then( err => Promise.reject(err) );
		});
}

export function fetchUpdateJob(id, job) {
	return fetch(`/api/jobs/${id}`, {
		method: 'PATCH',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify( job ),
	})
		.catch( () => Promise.reject({ error: 'network-error' }) )
		.then( response => {
			if (response.ok) {
				return response.json();
			}
			return response.json()
				.then( err => Promise.reject(err) );
		});
}

export function fetchDeleteJob(id) {
	return fetch(`/api/jobs/${id}`, {
		method: 'DELETE',
	})
		.catch( () => Promise.reject({ error: 'network-error' }) )
		.then( response => {
			if (response.ok) {
				return response.json();
			}
			return response.json()
				.then( err => Promise.reject(err) );
		});
}