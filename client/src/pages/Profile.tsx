import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/BattlePage';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h4 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333', background: 'white' }}>
          Coming soon! Battle Log:
        </h4>
        <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', background: 'white' }}>
          Check out your previous battles, re-run matches, and track how your favorite legends stack up to others!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2
          className="col-12 col-md-10 bg-dark text-light p-3 mb-5"
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>
      {!userParam && (
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{
            border: '1px dotted #1a1a1a',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <ThoughtForm />
        </div>
      )}
    </div>
  );
};

export default Profile;
