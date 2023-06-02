import { useState } from 'react';


function LoginForm({ onLogin }) {
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');

	function onChange(e) {
		setUsername(e.target.value);
		setError('');
	}

	function onSubmit(e) {
		e.preventDefault();
		onLogin(username);
	}

	return (
		<div className="login">
			<h1>Login to track your application status</h1>
			<form className="login-form" action="#/login" onSubmit={onSubmit}>
				<label>
					<span>Username:</span>
					<input className="login-username" value={username}
					       onChange={onChange} placeholder='your username'/>
				</label>
				<button className="login-button" type="submit">Login</button>
			</form>
			{error && <p className='error-message'>{error}</p>}
		</div>
	);

}

export default LoginForm;