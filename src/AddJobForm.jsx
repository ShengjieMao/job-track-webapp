import { useState } from 'react';

function AddJobForm({ onAddJob }) {

	const [ job, setJob ] = useState('');
	const [ nextStepDue, setNextStepDue ] = useState('');
	const [ nextStep, setNextStep ] = useState('');

	function onSubmit(e) {
		e.preventDefault();
		setJob('');
		setNextStep('');
		setNextStepDue('');
		onAddJob(job, nextStepDue, nextStep);
	}

	function onTyping(e) {
		setJob(e.target.value);
	}

	return (
		<form className="add__form" action="#/add" onSubmit={onSubmit}>
			<input className="add__job" value={job} onChange={onTyping} placeholder="your new application"/>
			<input type="date" value={nextStepDue} onChange={(e) => { setNextStepDue(e.target.value) }}
			       placeholder='next step time'/>
			<input value={nextStep} onChange={(e) => { setNextStep(e.target.value) }}
			       placeholder='next step is'/>
			<button type="submit" className="add__button">Add</button>
		</form>
	);
}

export default AddJobForm;