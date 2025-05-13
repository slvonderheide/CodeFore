import Auth from '../../utils/auth';
import SimulateMatchup from '../PlayersPage/SimulateMatchup';
import './index.css'; // Ensure you have the CSS file for styling



const MainLogin = () => {
  return (
    <div className="main-login-wrapper">  {/* This wrapper should have a transparent background */}
      <div className="login-container simulator">
        {/* <h3>MJ vs Lebron? Larry Bird vs Magic? Countless epic battles await! Who you got?</h3> */}

      {Auth.loggedIn() ? (
        <>
        <SimulateMatchup />
        </>
      ) : (
        <p>
          {/* Slow down buddy, please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link> before playing. */}
        </p>
      )}

    </div>
  </div>
  );
};

export default MainLogin;
