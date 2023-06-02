import {useState} from 'react';

function JobItem({
	                  job,
	                  isLastAdded,
	                  onDeleteJob,
	                  onToggleJob,
										onEditName,
										onRefresh,
                  }) {
	const isRejectClass = job.reject ? "job__text--reject" : "";
	const isAddedClass = isLastAdded ? "job__text--added" : "";
	const [ jobEdit, setJobEdit ] = useState(null);
	const [ editText, setEditText ] = useState('');
	let today = new Date().toISOString().slice(0, 10);

	function calculateDiff(startDate, endDate) {
		const diff = new Date(endDate) - new Date(startDate);
		return diff / (1000 * 60 * 60 * 24);
	}


	return (
		<>
			<div>
				<label className="job__list">
					<input
						className="job__toggle"
						data-id={job.id}
						type="checkbox"
						checked={job.reject}
						onChange={ (e) => {
							const id = e.target.dataset.id;
							onToggleJob(id);
						}}
					/>
					<div className="job__detail">
						<span data-id={job.id}
						      className={`job-toggle job-text ${ isRejectClass } ${isAddedClass}`}>
						{job.jobName}
					</span>


						<span data-id={job.id}
						      className={`job-nextStepDue ${isAddedClass}`}>
				{" Due Date: " + job.nextStepDue}
			</span>

						{job.id === jobEdit ? (
							<input className='edit-input'
							       type="text"
							       onChange={(e) => setEditText(e.target.value)}
							/>
						) : (
							<span data-id={job.id} className={`job-nextStepName ${isAddedClass}`}>
					{" Next action: " + job.nextStep}
				</span>)}

						<>
							{calculateDiff(today, job.nextStepDue) < 10 ? (
								<span> Should prioritize this one </span>
							) : (
								<span>{" Finish within " + calculateDiff(today, job.nextStepDue) + " Days"}</span>
							)}
						</>
					</div>

				</label>
			</div>


			<div className="job-actions">
				{job.id === jobEdit ? (
					<>
						<button data-id={job.id}
						        className="job-edit_submit"
						        onClick={(e) => {
											e.preventDefault();
											onEditName(job.id, editText);
											onRefresh();
										}}>Update
						</button>
						<button data-id={job.id}
						        className="job-edit_cancel"
						        onClick={(e) => {
											e.preventDefault(); onRefresh();
										}}>Cancel
						</button>
					</>
				) : (
					<>
						<button className='job-edit' onClick={() => setJobEdit(job.id)}>Edit</button>
						<button data-id={job.id}
						        className="job-delete"
						        onClick={(e) => {
											const id = e.target.dataset.id;
							        onDeleteJob(id);
										}}>&#10060;</button>
					</>
				)}
			</div>
		</>
	);
}

export default JobItem;