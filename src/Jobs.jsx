import Loading from './Loading';
import JobItem from './JobItem';

function Jobs({
	               jobs,
	               isJobPending,
	               lastAddedJobId,
	               onDeleteJob,
	               onToggleJob,
	               onEditName,
	               onRefresh,
               }) {
	const SHOW = {
		PENDING: 'pending',
		EMPTY: 'empty',
		JOBS: 'jobs',
	};

	let show;
	if(isJobPending) {
		show = SHOW.PENDING;
	} else if (!Object.keys(jobs).length) {
		show = SHOW.EMPTY;
	} else {
		show = SHOW.JOBS;
	}

	// The `Object.values(jobs).map()` below returns
	// an array of JSX elements
	return (
		<div className="content">
			{ show === SHOW.PENDING && <Loading className="jobs__waiting">Loading Jobs...</Loading> }
			{ show === SHOW.EMPTY && (
				<p>No Job Items yet, add one!</p>
			)}
			{ show === SHOW.JOBS && (
				<ul className="jobs">
					{ Object.values(jobs).map( job => (
						<li className="job" key={job.id}>
							<JobItem
								job={job}
								isLastAdded={lastAddedJobId===job.id}
								onDeleteJob={onDeleteJob}
								onToggleJob={onToggleJob}
								onEditName={onEditName}
								onRefresh={onRefresh}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Jobs;