import { useEffect, useState } from 'react';

import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchJobs,
  fetchUpdateJob,
  fetchDeleteJob,
  fetchAddJob,
} from './services';

import LoginForm from './LoginForm';
import Jobs from './Jobs';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddJobForm from './AddJobForm';

function App() {

  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING);
  const [ isJobPending, setIsJobPending ] = useState(false);
  const [ jobs, setJobs ] = useState({});
  const [ lastAddedJobId, setLastAddedJobId ] = useState();

  function onLogin( username ) {
    setIsJobPending(true);
    fetchLogin(username)
      .then( (fetchedJobs) => {
        setError('');
        setJobs( fetchedJobs );
        setIsJobPending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch( err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setJobs({});
    setLastAddedJobId('');
    fetchLogout()
      .catch( err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onRefresh() {
    setError('');
    setIsJobPending(true);
    fetchJobs()
      .then( (jobs) => {
        setJobs(jobs);
        setLastAddedJobId('');
        setIsJobPending(false);
      })
      .catch( (err) => {
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
        setError(err?.error || 'ERROR');
      });
  }

  function onDeleteJob(id) {
    setError('');
    setIsJobPending(true);
    fetchDeleteJob(id)
      .then( () => {
        return fetchJobs();
      })
      .then( (jobs) => {
        setJobs(jobs);
        setIsJobPending(false);
      })
      .catch( (err) => {
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
        setError(err?.error || 'ERROR');
      });
  }

  function onToggleJob(id) {
    fetchUpdateJob(id, { reject: !jobs[id].reject } )
      .then( job => {
        setJobs({
          ...jobs,
          [id]: job,
        });
        setLastAddedJobId('');
      })
      .catch( (err) => {
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
        setError(err?.error || 'ERROR');
      });
  }

  function onEditName(id, newStep) {
    fetchUpdateJob(id, { nextStep: newStep  })
      .then( job => {
        setJobs({
          ...jobs,
          [id]: job,
        });
        setLastAddedJobId('');
      })
      .catch( err => {
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
        setError(err?.error || 'ERROR');
      });
  }

  function onAddJob(jobName, dueDate, stepName) {
    fetchAddJob(jobName, dueDate, stepName)
      .then( (job) => {
        setJobs({
          ...jobs,
          [job.id]: job,
        });
        setLastAddedJobId(job.id);
      })
      .catch( (err) => {
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
        setError(err?.error || 'ERROR');
      });

  }

  function checkForSession() {
    fetchSession()
      .then( (session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchJobs();
      })
      .catch( (err) => {
        if( err?.error === SERVER.AUTH_MISSING ) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .then( (jobs) => {
        setJobs(jobs);
      })
      .catch( (err) => {
        if( err?.error === CLIENT.NO_SESSION ) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });

  }

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <div className="App">
      <main className="">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login-waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <div className="welcome">
              <span>Welcome, {username}</span>
              <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            </div>
            <Jobs
              isJobPending={isJobPending}
              jobs={jobs}
              lastAddedJobId={lastAddedJobId}
              onDeleteJob={onDeleteJob}
              onToggleJob={onToggleJob}
              onEditName={onEditName}
              onRefresh={onRefresh}
            />
            <AddJobForm onAddJob={onAddJob}/>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;